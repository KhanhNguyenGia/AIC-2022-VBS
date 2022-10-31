from crypt import methods
import os
from urllib import request

from flask import Flask, request, render_template


def create_app(test_config=None):
    # Create and configure the app
    INSTANCE_PATH = '/mnt/01D8D8D4752A1C30/VBS'
    app = Flask(__name__,
                instance_relative_config=True,
                instance_path=INSTANCE_PATH,
                template_folder='../templates')
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    #  A simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, Tien!'

    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/', methods=['POST'])
    def search_post():
        text = request.form['text']
        return text

    return app
