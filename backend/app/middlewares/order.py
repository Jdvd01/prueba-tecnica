from typing import Dict, Optional, Tuple

from app.middlewares.user import  user_by_id

def validate_order_data(data: Dict) -> Optional[Tuple[Dict, int]]:
    CAMPOS_OBLIGATORIOS = [
        ("user_id", "El campo user_id es obligatorio"),
        ("product_name", "Ingrese un product_name válido"),
        ("amount", "Ingrese un amount válido"),
    ]

    for field_name, error_message in CAMPOS_OBLIGATORIOS:
        value = data.get(field_name)
        
        is_missing_or_empty = (
            value is None or 
            (isinstance(value, str) and not value.strip())
        )
        
        if is_missing_or_empty:
            return {"error": error_message}, 400

    if(data["amount"] < 0):
        return {"error": "Ingrese un amount válido, mayor a 0"}, 400

    user = user_by_id(data["user_id"])
    return user