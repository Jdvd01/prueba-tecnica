from app.types.pagination import PaginationLimits


def validate_pagination(page, per_page):
    if per_page < PaginationLimits.MIN_PAGE.value:
        per_page = PaginationLimits.MIN_PAGE.value
    elif per_page > PaginationLimits.MAX_PER_PAGE.value:
        per_page = PaginationLimits.MAX_PER_PAGE.value

    if page < PaginationLimits.MIN_PAGE.value:
        page = PaginationLimits.MIN_PAGE.value

    return page, per_page

def format_data(data):
    clean_dict = {
        key: value.strip() if isinstance(value, str) else value
        for key, value in data.items()
    }
    
    return clean_dict