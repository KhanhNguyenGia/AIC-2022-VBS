from crypt import methods
import os
import json
from urllib import response

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from load import *
from search_engine import *
from utils import *

INSTANCE_PATH = '/mnt/01D8D8D4752A1C30/VBS'

global device, model, preprocess, db

device, model, preprocess = init()
db = create_database()

app = Flask(__name__, instance_relative_config=True,
            instance_path=INSTANCE_PATH,
            template_folder='./templates')

CORS(app)


@app.route('/', methods=['POST'])
def search():
    search_query = request.get_data().decode("utf-8")

    text_feature = encode_text(search_query, device, model)
    search_result = get_result(text_feature, db) 
    data = get_image_path(search_result)
    res = jsonify(data)

    print(res)

    return res
    
@app.route('/<video_name>/')
def get_keyframe_list(video_name):
    KEYFRAMES_PATH = '../../KeyFrames/'
    keyframe_fol = os.path.join(KEYFRAMES_PATH, video_name)
    data = []
    for keyframe in os.listdir(keyframe_fol):
        data.append(os.path.join(keyframe_fol, keyframe)[6:])

    data = sorted(data)
    
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)