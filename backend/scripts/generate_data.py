import os
import sqlite3
import uuid
import random
from datetime import datetime, timezone
from faker import Faker
import faker_commerce
import sys

# 📌 Validar que exista la carpeta migrations en la raíz del proyecto
if not os.path.exists("migrations"):
    print("❌ Error: La carpeta 'migrations/' no existe en la raíz del proyecto\n💡 Hint: Ejecuta pipenv run setup primero")
    sys.exit(1)

fake = Faker()
fake.add_provider(faker_commerce.Provider)


conn = sqlite3.connect("./instance/app.db")
cursor = conn.cursor()

# 📌 Crear tablas
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

cursor.executemany(
    "INSERT INTO users (id, name, email, created_at) VALUES (?, ?, ?, ?)",
    users
)

orders = []
for user in users:
    user_id = user[0]
    for _ in range(random.randint(1, 5)):
        orders.append((
            str(uuid.uuid4()),
            user_id,
            fake.ecommerce_name(),
            random.randint(1, 500),
            fake.date_time_between(start_date="-2y", end_date="now", tzinfo=timezone.utc).isoformat()

        ))

cursor.executemany(
    "INSERT INTO orders (id, user_id, product_name, amount, created_at) VALUES (?, ?, ?, ?, ?)",
    orders
)

conn.commit()
conn.close()

print("✅ Usuarios y Órdenes eliminados")
print(f"👤 {len(users)} usuarios generados")
print(f"📦 {len(orders)} órdenes generados")
print("📂 Base de datos: ./instance/app.db")
