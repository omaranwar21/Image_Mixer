from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path


import processing
from image import *
from fft_image import *

IMG_FOLDER = '.\\files\images'

app = Flask(__name__)
app.config['IMG_FOLDER'] = IMG_FOLDER
CORS(app)


@app.route('/api/img', methods=['GET', 'POST'])
def img():
    # get the image
    if request.method == 'GET':
        id = request.args.get('img')
        if "result" in id:
            return send_from_directory(directory=app.config['IMG_FOLDER'], path='result.png')
        if "gray" in id:
            return send_from_directory(directory=app.config['IMG_FOLDER'], path='gray.png')
        imgPath = str(id) + '.png'
        return send_from_directory(directory=app.config['IMG_FOLDER'], path=imgPath)

    # the upload functionality
    if request.method == 'POST':
        if "Img" not in request.files:
            return {"Error": 'File Not Found'}, 404

        flag = 1

        imageFile = request.files["Img"]
        imgId = str(processing.counter.imgId)
        fullPath = os.path.join(IMG_FOLDER, imgId + '.png')
        imageFile.save(fullPath)

        gray = request.args.get('gray')
        if gray:
            flag = 0
        image = Image(imgId, fullPath, flag=flag)
        cv2.imwrite(fullPath, image.image)

        # processing.resize_image(fullPath)
        return {"img_url": "http://127.0.0.1:5000/api/img?img="+imgId, "imgId": imgId}, 200


@app.route('/api/combImg', methods=['GET'])
def combImgs():
    imgId = str(request.args.get('imgId'))
    fullPath = os.path.join(IMG_FOLDER, imgId + '.png')
    fft_image = FFT_Image(counter.imgId, fullPath, flag=0)
    fft_image.fourier_2D()
    processing.db.fft_images[imgId] = fft_image

    counter.imgId += 1
    return {"mag_img_url": "http://127.0.0.1:5000/api/img?img=mag"+imgId,
            "phase_img_url": "http://127.0.0.1:5000/api/img?img=phase"+imgId}, 200


@app.route('/api/select', methods=['GET', 'POST'])
def select():
    if request.method == 'POST':
        processing.counter.resultId += 1
        data = request.get_json()

        if len(processing.db.fft_images) == 0:
            return {"Error": "No data found!"}, 404
        if data['fid'] == None or data['sid'] == None:
            return {"Error": "Bad request!"}, 400

        f_image = processing.db.fft_images[str(data['fid'])]  # first image
        s_image = processing.db.fft_images[str(data['sid'])]  # second image

        if data['mode']:  # crop from the orginal image
            fcroped_image = f_image.crop_2d(data['firstCrop'])
            f_mag, f_angle = processing.magnitude_angle(fcroped_image)

            scroped_image = s_image.crop_2d(data['secondCrop'])
            s_mag, s_angle = processing.magnitude_angle(scroped_image)

            if data['flag']:  # 1st mag, 2nd phase
                processing.construct_image(f_mag, s_angle, 0)
            else:  # 1st phase, 2nd mag
                processing.construct_image(s_mag, f_angle, 0)
        else:  # crop magnitude or phase
            if data['flag']:  # 1st mag, 2nd phase
                processing.construct_image(f_image.magnitude, s_image.angle,
                                           cropMag=data['magFirstCrop'], cropPhase=data['phaseSecondCrop'])
            else:  # 1st phase, 2nd mag
                processing.construct_image(s_image.magnitude, f_image.angle,
                                           cropMag=data['magSecondCrop'], cropPhase=data['phaseFirstCrop'])

        # processing.crop_2d_img(
        #     0, [0,1, 0, 0, 1], data['x'], data['y'], data['width'], data['height'])
        return {"result_url": "http://127.0.0.1:5000/api/img?img=result"+str(processing.counter.resultId), "data": data}


@app.route('/api/gray', methods=['GET', 'POST'])
def construct():
    if request.method == 'GET':
        processing.counter.resultId += 1
        if len(processing.db.fft_images) == 0:
            return {"Error": "No data found!"}, 404

        imgId = str(request.args.get('imgId'))
        print(imgId)
        image = processing.db.fft_images[imgId]
        grayImage = image.image
        cv2.imwrite('../backend/files/images/gray.png', grayImage)

    return {'gray_url': 'http://127.0.0.1:5000/api/img?img=gray'+str(processing.counter.resultId)}
