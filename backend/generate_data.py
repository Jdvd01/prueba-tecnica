import os
import sqlite3
import uuid
import random
from datetime import datetime, timezone
from faker import Faker
import faker_commerce

fake = Faker()
fake.add_provider(faker_commerce.Provider)

db_path = os.path.join("instance", "app.db")

os.makedirs("instance", exist_ok=True)

conn = sqlite3.connect("./instance/app.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)
""")

cursor.execute("DELETE FROM orders")
cursor.execute("DELETE FROM users")

users = [
    (
        str(uuid.uuid4()),
        fake.name(),
        fake.unique.email(),
        datetime.now(timezone.utc).isoformat()
    )
    for _ in range(20)
]

cursor.executemany("INSERT INTO users (id, name, email, created_at) VALUES (?, ?, ?, ?)", users)

orders = []
for user in users:
    user_id = user[0]
    for _ in range(random.randint(1, 5)):
        orders.append((
            str(uuid.uuid4()),           
            user_id,                     
            fake.ecommerce_name(),   
            round(random.uniform(10, 500), 2),  
            datetime.now(timezone.utc).isoformat()
        ))

cursor.executemany("INSERT INTO orders (id, user_id, product_name, amount, created_at) VALUES (?, ?, ?, ?, ?)", orders)

conn.commit()
conn.close()

print(f"Usuarios y Ordenes eliminadas ✅")
print(f"{len(users)} usuarios y {len(orders)} órdenes insertadas en users.db ✅")
