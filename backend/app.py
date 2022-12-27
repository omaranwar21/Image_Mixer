from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path

import processing

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
        print(imgPath)
        return send_from_directory(directory=app.config['IMG_FOLDER'], path=imgPath)

    # the upload functionality
    if request.method == 'POST':
        if "Img" not in request.files:
            return {"Error": 'File Not Found'}, 404

        image = request.files["Img"]
        imgId = str(processing.counter.imgId)
        fullPath = os.path.join(IMG_FOLDER, imgId + '.png')
        image.save(fullPath)
        processing.resize_image(fullPath)
        return {"mag_img_url": "http://127.0.0.1:5000/api/img?img="+imgId, "imgId": imgId}, 200


@app.route('/api/combImg', methods=['GET'])
def combImgs():
    imgId = str(request.args.get('imgId'))
    fullPath = os.path.join(IMG_FOLDER, imgId + '.png')
    processing.plot_magnitude_phase(fullPath)
    processing.counter.imgId += 1
    return {"mag_img_url": "http://127.0.0.1:5000/api/img?img=mag"+imgId,
            "phase_img_url": "http://127.0.0.1:5000/api/img?img=phase"+imgId}, 200


@app.route('/api/select', methods=['GET', 'POST'])
def select():
    if request.method == 'POST':
        data = request.get_json()
        return {'data': data}
