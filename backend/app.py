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
        imgPath = str(id) + '.png'
        return send_from_directory(directory=app.config['IMG_FOLDER'], path=imgPath)

    # the upload functionality
    if request.method == 'POST':
        if "Img" not in request.files:
            return {"Error": 'File Not Found'}, 404

        imageFile = request.files["Img"]
        imgId = str(processing.counter.imgId)
        fullPath = os.path.join(IMG_FOLDER, imgId + '.png')
        imageFile.save(fullPath)

        image = Image(imgId, fullPath)
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
        data = request.get_json()
        f_image = processing.db.fft_images[str(data['fid'])]  # first image
        s_image = processing.db.fft_images[str(data['sid'])]  # second image

        if data['mode']:  # crop magnitude or phase
            if data['flag']:  # 1st mag, 2nd phase
                processing.construct_image(f_image.magnitude, s_image.angle,
                                cropMag=data['magFirstCrop'], cropPhase=data['phaseSecondCrop'])
            else:  # 1st phase, 2nd mag
                processing.construct_image(s_image.magnitude, f_image.angle,
                                cropMag=data['magSecondCrop'], cropPhase=data['phaseFirstCrop'])
        else:  # crop from the orginal image
            fcroped_image = f_image.crop_2d(data['firstCrop'])
            f_mag, f_angle = processing.magnitude_angle(fcroped_image)

            scroped_image = s_image.crop_2d(data['secondCrop'])
            s_mag, s_angle = processing.magnitude_angle(scroped_image)
            
            if data['flag']:  # 1st mag, 2nd phase
                processing.construct_image(f_mag, s_angle, 0)
            else:  # 1st phase, 2nd mag
                processing.construct_image(s_mag, f_angle, 0)

        # processing.crop_2d_img(
        #     0, [0,1, 0, 0, 1], data['x'], data['y'], data['width'], data['height'])
        return {"mag_img_url": "http://127.0.0.1:5000/api/img?img=result"}


@app.route('/api/construct', methods=['GET', 'POST'])
def construct():
    # if request.method == 'GET':
    #     if len(processing.db.magnitude) == 0 or len(processing.db.angle) == 0:
    #         return {"Error": "No magnitude or phase found!"}, 404
    #     magId = str(request.args.get('magId'))
    #     phaseId = str(request.args.get('phaseId'))
    #     mag = processing.db.magnitude['mag'+str(magId)]
    #     phase = processing.db.angle['angle'+str(phaseId)]
    #     processing.construct_image(mag, phase,1)

    return {'result_url': 'http://127.0.0.1:5000/api/img?img=result'}
