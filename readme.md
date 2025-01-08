# Microservicio Ollama

Este proyecto implementa un **microservicio** en Node.js/Express para conectarse con Ollama.  
Permite manejar distintos **modelos** (`llama3.1`, `gemma2`, `llama2`) para generar y procesar respuestas específicas.

## **Contenido**

1. [Características](#características)
2. [Requisitos](#requisitos)
3. [Instalación](#instalación)
4. [Ejecución](#ejecución)
5. [Variables de Entorno](#variables-de-entorno)
6. [Estructura de Carpetas](#estructura-de-carpetas)
7. [Uso de la API](#uso-de-la-api)
8. [Autenticación (API Key)](#autenticación-api-key)
9. [Endpoints](#endpoints)

---

## **Características**

- **Microservicio** basado en Express y Node.js.
- Se conecta con **Ollama** para procesar prompts y generar respuestas en formato JSON.
- Soporta **tres modelos** distintos: `llama3.21`, `gemma2`, `llama2`.
- Cuenta con **endpoints** para extraer información específica:
  - Géneros (`/generos`)
  - Temas Principales (`/tprincipales`)
  - Autores (`/autores`)
  - Lecturas previas (`/lprevias`)
  - Cantidad de hojas (`/cantidad`)
  - Ambientación (`/ambientacion`)

Consulta la documentación detallada de endpoints en [ENDPOINTS.md](./ENDPOINTS.md).

---

## **Requisitos**

- **Node.js** versión \>= 14.
- **npm** para manejar dependencias.
- **Ollama** corriendo localmente, si es que apuntas a `localhost:11434` (o especifica tu host).

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ANGELLH2000/Microservicio_Ollama.git
   cd Microservicio_Ollama

   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

## **Ejecución**

- Modo Desarrollo:

  ```bash
  npm run dev
  ```

Por defecto, el microservicio se ejecuta en el puerto definido en process.env.PORT o en 3000.

## **Variables de Entorno**

Dentro del archivo .env puedes definir (ejemplo):

  ```bash
  PORT=3000
  API_KEY=TU_API_KEY_AQUI
  ```
- PORT: Puerto donde corre el servidor (p.ej. 3000).
- API_KEY: Clave para autenticación (se envía en el header x-api-key).

Agrega .env a tu .gitignore para no subir claves sensibles.

## **Estructura del Proyecto**

```bash
Microservicio_Ollama/
├─ .env.example         # Ejemplo de variables de entorno (opcional)
├─ README.md            # Documentación principal (este archivo, por ejemplo)
├─ package.json
├─ src/
│  ├─ app.js            # Configuración principal de Express
│  ├─ index.js          # Punto de entrada para iniciar el servidor
│  ├─ controllers/
│  │  └─ ollamaController.js  # Lógica de controladores
│  ├─ routes/
│  │  └─ ollama.routes.js     # Definición de rutas con modelos
│  ├─ services/
│  │  └─ ollamaManager.js     # Clase que maneja la comunicación con Ollama
│  └─ utils/
│     └─ helpers.js           # Funciones auxiliares (consolidar_data, etc.)
└─ ...
```
- **controllers/**: Contiene la lógica de cada endpoint.
- **routes/**: Maneja las rutas Express.
- **services/**: Lógica de negocio o conexión a servicios externos (Ollama).
- **utils/**: Helper functions o utilidades varias.

## **Uso de la API**

La aplicación define tres rutas base para cada modelo:

1. `/api/ollama3.1`
2. `/api/gemma2`
3. `/api/llama2`

Dentro de cada ruta base, encontrarás los endpoints:

* `POST /generos`
* `POST /tprincipales`
* `POST /autores`
* `POST /lprevias`
* `POST /cantidad`
* `POST /ambientacion`

## **Autenticación (API Key)** ##
Para acceder a los endpoints, envía la cabecera (header) `x-api-key` con la `API_KEY` definida en tu `.env`.

Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/api/ollama3.21/generos \
     -H "Content-Type: application/json" \
     -H "x-api-key: TU_API_KEY_AQUI" \
     -d '{"entrada":"Busco un libro de misterio"}'
```
Si no incluyes la key o es incorrecta, obtendrás `401 Unauthorized`.

## **Endpoints** ##
A continuación, se describen los principales endpoints. En cada caso, la URL base puede ser:
- http://localhost:3000/api/ollama3.1
- http://localhost:3000/api/gemma2
- http://localhost:3000/api/llama2

dependiendo del modelo que quieras usar.

## 1. Generos ##
**POST `/generos`**

- **Descripción:** Devuelve géneros literarios recomendados o mencionados en el texto de entrada.
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "Me encantan las historias de fantasía con dragones"
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["fantasía"],
        "payload": "generos",
        "cantidad": 1,
        "status": "ok",
        "model":"llama3.1"
    }
    ```
## 2. Temas Principales ##
**POST `/tprincipales`**

- **Descripción:** Extrae los temas principales que se mencionan o solicitan en la entrada.
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "Busco una novela que trate la amistad y la traición"
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["amistad", "traición"],
        "payload": "temas_principales",
        "cantidad": 2,
        "status": "ok",
        "model":"llama3.1"
    }
    ```
## 3. Autores ##
**POST `/autores`**

- **Descripción:** Identifica si en el texto se pide o sugiere algún autor específico.
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "¿Tienes algún libro de Gabriel García Márquez?"
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["Gabriel García Márquez"],
        "payload": "autores",
        "cantidad": 1,
        "status": "ok",
        "model":"llama3.1"
    }
    ```
## 4. Lecturas Previas ##
**POST `/lprevias`**

- **Descripción:** Detecta si en entrada se mencionan libros ya leídos o recomendados.
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "Ya leí Crimen y castigo y busco algo similar    "
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["Crimen y castigo"],
        "payload": "lecturas_previas",
        "cantidad": 1,
        "status": "ok",
        "model":"llama3.1"
    }
    ```
## 5. Cantidad de Hojas ##
**POST `/cantidad`**

- **Descripción:** Indica si se pide o recomienda un número de páginas/hojas para el libro.
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "Quiero un libro corto, de unas 200 páginas máximo"
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["200"],
        "payload": "cantidad",
        "cantidad": 1,          
        "status": "ok",
        "model":"llama3.1"
    }
    ```
## 6. Ambientación ##
**POST `/ambientacion`**

- **Descripción:** Indica si se habla o pide una ambientación específica (época, lugar, etc.).
- Cuerpo (Request Body):

    ```json
    {
        "entrada": "Quiero una novela ambientada en la época medieval."
    }
    ```
- Ejemplo de Respuesta:
    ```json
    {
        "data": ["época medieval"],
        "payload": "cantidad",
        "cantidad": 1,          
        "status": "ok",
        "model":"llama3.1"
    }
    ```
---
Códigos de Error Comunes
- **400 Bad Request**
    
    Cuando falta la propiedad entrada en el body.

- **401 Unauthorized**

    Cuando no se envía la API Key o es incorrecta.

- **500 Internal Server Error**

    Error interno, por ejemplo si Ollama no responde o ocurre un problema de parseo.
---