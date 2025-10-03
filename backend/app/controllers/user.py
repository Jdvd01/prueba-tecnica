from app.models.user import User
from app.extensions import db
from app.middlewares.user import serialize_users
from app.middlewares.general import validate_pagination

def list_users(page, per_page):
    page, per_page = validate_pagination(page, per_page)

    users_query = User.query.paginate(page=page, per_page=per_page, error_out=False)

    if not users_query.items and users_query.total > 0:
        page = users_query.pages
        users_query = User.query.paginate(page=page, per_page=per_page, error_out=False)

    users_with_pagination = {
        "page": users_query.page,
        "per_page": users_query.per_page,
        "total": users_query.total,
        "pages": users_query.pages,
        "users": serialize_users(users_query.items)
    }

    return users_with_pagination

def create_user(data):
    user = User(name=data["name"], email=data["email"])
    db.session.add(user)
    db.session.commit()
    return user.serialize()
