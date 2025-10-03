from app.models.order import Order
from app.extensions import db

def list_all_orders():
    orders = Order.query.all()
    return orders

def serialize_orders(orders_list, include_user=False):
    serialized_orders = [order.serialize(include_user=include_user) for order in orders_list]
    return serialized_orders

def create_order(data):
    order = Order(
        user_id=data["user_id"],
        product_name=data["product_name"],
        amount=data["amount"]
    )
    db.session.add(order)
    db.session.commit()
    return order
