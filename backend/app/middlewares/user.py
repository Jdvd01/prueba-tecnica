from typing import Dict, Optional, Tuple
from app.utils.email_regex import EMAIL_REGEX
from app.types.pagination import PaginationLimits

def validate_user_data(data: Dict) -> Optional[Tuple[Dict, int]]:
    name = data.get("name")
    if not name or not str(data["name"]).strip():
        return {"error": "Name is required"}, 400
    
    email = data.get("email")
    if not email or not EMAIL_REGEX.match(email):
        return {"error": "Valid email is required"}, 400

    return None

def serialize_users(user_list):
    serialized_users = [user.serialize() for user in user_list]
    return serialized_users