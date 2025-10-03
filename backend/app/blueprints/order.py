from flask import Blueprint, request, jsonify
from app.controllers.order import create_order, list_all_orders, serialize_orders
from app.middlewares.order import validate_order_data
from app.models.user import User
from app.middlewares.general import format_data

order_blueprint = Blueprint("order", __name__, url_prefix="/orders")

@order_blueprint.route("/", methods=["POST"])
def post_order():
    data = request.get_json() or {}

    formated_data = format_data(data)

    user_or_error = validate_order_data(formated_data)

    if not isinstance(user_or_error, User):
        return jsonify(user_or_error[0]), user_or_error[1]

    order = create_order(formated_data)
    return jsonify({
        "order": order.serialize(include_user=True)
    }), 201

@order_blueprint.route("/", methods=["GET"])
def get_order_by_id():
    orders = list_all_orders()
    return jsonify({"orders": serialize_orders(orders, include_user=True)}), 200