from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate
from .blueprints.user import user_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Disponibilizamos para cualquier origen
    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)

    # Blueprints
    app.register_blueprint(user_blueprint)

    @app.route("/")
    def root():
        return {"status": "ok", "message": "Api de Flask minimalista"}, 200

    return app
