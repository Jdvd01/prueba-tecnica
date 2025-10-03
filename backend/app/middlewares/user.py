from typing import Dict, Optional, Tuple
from app.utils.email_regex import EMAIL_REGEX
from app.models.user import User

def user_by_id(id: int):
    user = User.query.filter_by(id=str(id)).first()

    if user is None:
        return {"error": "Usuario no encontrado"}, 404
    
    return user.serialize(include_orders=True)

def user_by_email(email: str):
    user = User.query.filter_by(email=email).first()
    return user

def validate_user_data(data: Dict) -> Optional[Tuple[Dict, int]]:
    name = data.get("name")
    if not name or not str(data["name"]).strip():
        return {"error": "El campo nombre es obligatorio"}, 400
    
    email = data.get("email")
    if not email or not EMAIL_REGEX.match(email):
        return {"error": "Ingrese un email valido"}, 400

    user = user_by_email(email)
    if user is not None:
        return {"error": "Ha ocurrido un error al procesar su solicitud. Por favor, revise los datos ingresados."}, 400

    return None

def serialize_users(user_list):
    serialized_users = [user.serialize() for user in user_list]
    return serialized_users