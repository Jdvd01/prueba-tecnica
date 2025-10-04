# Gestión de Usuarios y Órdenes de Compra

Esta es una aplicación que permite gestionar usuarios y sus respectivas órdenes de compra. Consta de un backend desarrollado con Flask, que utiliza SQLite como base de datos, y un frontend para la interacción del usuario. Se incluye un script para generar datos de prueba.

## Pasos Iniciales

1.  **Clona el repositorio:**

    ```bash
    git clone <repository_url>
    cd prueba-tecnica
    ```

2.  **Configuración de Variables de Entorno (.env):**
    Tanto el frontend como el backend requieren archivos `.env` para su configuración. Crea los siguientes archivos en los directorios correspondientes:

    - **Para el Backend (`./backend/.env`):**

      ```
      HOST=localhost
      PORT=8000
      DEBUG=True
      SECRET_KEY=supersecretkey
      SQLALCHEMY_DATABASE_URI=sqlite:///instance/app.db
      ```

      Asegúrate de reemplazar `supersecretkey` con una clave secreta fuerte y única.

    - **Para el Frontend (`./frontend/.env`):**

      ```
      VITE_API_URL=http://localhost:8000
      ```

      Este archivo configura la URL base para las llamadas a la API del backend. Asegúrate de que coincida con la configuración de `HOST` y `PORT` del backend. Si el frontend utiliza un nombre de variable diferente para la URL de la API (por ejemplo, `VITE_APP_API_URL`), ajusta el nombre de la variable en consecuencia.

## Instalación y Ejecución del Frontend

Para configurar y ejecutar la parte del frontend, sigue estos pasos:

1.  **Navega al directorio del frontend:**

    ```bash
    cd frontend
    ```

2.  **Instala las dependencias de Node.js:**

    ```bash
    npm install
    ```

3.  **Inicia la aplicación frontend:**

    ```bash
    npm run dev
    ```

    La aplicación del frontend se ejecutará típicamente en `http://localhost:5173` (o el puerto configurado por defecto por Vite).

## Dependencias del Frontend

El frontend del proyecto se basa en los siguientes paquetes de Node.js, listados en `frontend/package.json`:

- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-dialog`
- `@radix-ui/react-label`
- `@radix-ui/react-separator`
- `@radix-ui/react-slot`
- `@reduxjs/toolkit`
- `@tailwindcss/vite`
- `axios`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `next-themes`
- `react`
- `react-dom`
- `react-redux`
- `react-router`
- `sonner`
- `tailwind-merge`

Estas dependencias se instalarán automáticamente al ejecutar `npm install`.

## Instalación y Ejecución del Backend

Para configurar y ejecutar la parte del backend, sigue estos pasos:

1.  **Navega al directorio del backend:**

    ```bash
    cd backend
    ```

2.  **Crea y activa un entorno virtual (recomendado):**
    Puedes usar `venv` (incorporado en Python) o `pipenv`.

    - **Opción para `venv`:**

      ```bash
      python -m venv venv
      source venv/bin/activate
      ```

    - **Opción para `pipenv`:**
      ```bash
      pip install pipenv
      pipenv install
      pipenv shell
      ```

3.  **Instala las dependencias:**

    - **Si usaste `venv`:**
      ```bash
      pip install -r requirements.txt
      ```
    - **Si usaste `pipenv`:**
      Las dependencias ya se habrán instalado con `pipenv install` en el paso anterior.

4.  **Ejecuta la aplicación Flask:**

    - **Si usaste `venv`:**
      ```bash
      python server.py
      ```
    - **Si usaste `pipenv`:**
      ```bash
      pipenv run start
      ```
      La aplicación se ejecutará típicamente en `http://localhost:8000`.

## Dependencias del Backend

El backend del proyecto se basa en los siguientes paquetes de Python, listados en `backend/requirements.txt`:

- `alembic`
- `blinker`
- `click`
- `Faker`
- `faker-commerce`
- `Flask`
- `flask-cors`
- `Flask-Migrate`
- `Flask-SQLAlchemy`
- `greenlet`
- `itsdangerous`
- `Jinja2`
- `Mako`
- `MarkupSafe`
- `python-dotenv`
- `SQLAlchemy`
- `typing_extensions`
- `tzdata`
- `Werkzeug`

Estas dependencias se instalarán automáticamente al ejecutar `pip install -r requirements.txt`.

## Notas Adicionales para la Generación de Datos de Prueba

El script `backend/generate_data.py` se utiliza para poblar la base de datos con usuarios y pedidos de ejemplo.

- Para generar datos de prueba, asegúrate de que tu entorno virtual esté activo y ejecuta:
  ```bash
  python generate_data.py
  ```
- **Advertencia:** La ejecución de este script **eliminará todos los datos existentes** en las tablas `users` y `orders` antes de insertar nuevos datos de prueba. Úsalo con precaución en un entorno de producción o si tienes datos valiosos.
- El script crea 20 usuarios de prueba y un número aleatorio de pedidos (1 a 5) para cada usuario.
