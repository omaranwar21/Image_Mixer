from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path

from processing import *

IMG_FOLDER = '.\\files\images'

app = Flask(__name__)
app.config['IMG_FOLDER'] = IMG_FOLDER
CORS(app)


@app.route('/api/img', methods=['GET', 'POST'])
def img():
    # get the image
    if request.method == 'GET':
        id = request.args.get('img')
        return send_from_directory(directory=app.config['IMG_FOLDER'], path=img)

    # the upload functionality
    if request.method == 'POST':
        if "file" not in request.files:
            return {"there is an error": 'err'}, 400

        file = request.files["file"]
        imgId = str(counter.imgId)
        fullPath = os.path.join(IMG_FOLDER, imgId + '.jpg')
        file.save(fullPath)
        plot_magnitude_phase(fullPath)
        counter.imgId += 1
        return {'img_id': imgId,"mag_img_url": "http://127.0.0.1:5000/api/img"}, 200


@app.route('/api/select', methods=['GET', 'POST'])
def select():
    if request.method == 'POST':
        data = request.get_json()
        return {'data': data}
