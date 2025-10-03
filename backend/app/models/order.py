import uuid
from datetime import datetime, timezone
from ..extensions import db

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    user = db.relationship("User", back_populates="orders")

    def __repr__(self) -> str:
        return f"<Order id={self.id}>"

    def serialize(self, include_user=False):
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "product_name": self.product_name,
            "amount": self.amount,
            "created_at": self.created_at.isoformat()
        }
        if include_user:
            data["user"] = self.user.serialize()
        return data
