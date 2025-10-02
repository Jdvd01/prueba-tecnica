from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route("/")
    def root():
        return {"status": "ok", "message": "Api de Flask minimalista"}, 200

    return app
