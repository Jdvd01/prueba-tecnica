from flask import Blueprint, request, jsonify
from app.controllers.user import list_users, create_user
from app.middlewares.user import user_by_id, validate_user_data
from app.models.user import User

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

@user_blueprint.route("/<uuid:user_id>/orders", methods=["GET"])
def get_user_orders(user_id):
    user_or_error = user_by_id(user_id)

    if isinstance(user_or_error, User):
        return jsonify(user_or_error[0]), user_or_error[1]

    return jsonify({"user": user_or_error}), 200