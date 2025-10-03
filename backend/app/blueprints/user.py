from flask import Blueprint, request, jsonify
from app.controllers.user import list_users, create_user
from app.middlewares.user import validate_user_data

user_blueprint = Blueprint("user", __name__, url_prefix="/users")

@user_blueprint.route("/", methods=["GET"])
def get_users():
    # Ejemplo
    # /users?page=2&per_page=5
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)

    return jsonify({
        "users": list_users(page, per_page)
    }), 200

@user_blueprint.route("/", methods=["POST"])
def post_user():
    data = request.get_json() or {}

    error = validate_user_data(data)
    if error:
        return jsonify(error[0]), error[1]

    user = create_user(data)
    return jsonify(user), 201
