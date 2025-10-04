import os
import subprocess

def run(cmd):
    print(f"➡️ {cmd}")
    subprocess.run(cmd, shell=True, check=True)

if __name__ == "__main__":
    if not os.path.exists("migrations"):
        run("pipenv run flask db init")
    else:
        print("✅ migrations/ ya existe, se omite flask db init")

    run('pipenv run flask db migrate -m "auto migration"')
    run("pipenv run flask db upgrade")

    print("🎉 Migraciones aplicadas correctamente")
