import os

class Config:
    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", 8000))
    DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")
