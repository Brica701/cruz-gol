Markdown
# ⚽ Cruz-Gol (2026)

**Cruz-Gol** es una plataforma web completa e interactiva para la gestión de porras, quinielas y apuestas deportivas entre usuarios. Incluye actualización de partidos mediante API externa, comunicación en tiempo real y persistencia de datos en PostgreSQL. Está completamente preparada para ser desplegada en la nube (como **Render**), evitando depender únicamente del entorno local.

---

## 📋 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Tecnologías Utilizadas](#-technologies-utilizadas)
3. [Requisitos Previos](#-requisitos-previos)
4. [Guía de Instalación y Puesta en Marcha (Entorno Local)](#-guía-de-instalación-y-puesta-en-marcha-entorno-local)
5. [Despliegue en la Nube (Render)](#-despliegue-en-la-nube-render)
6. [Primer Inicio y Creación del Usuario Administrador](#-primer-inicio-y-creación-del-usuario-administrador)
7. [Funcionamiento de la Base de Datos](#-funcionamiento-de-la-base-de-datos)
8. [Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🚀 Características Principales

* **Sistema de Usuarios y Roles:** Autenticación de usuarios, asignación de créditos/puntos, cambio de contraseña obligatorio y panel de administración.
* **Apuestas y Pronósticos:** Interfaz para apostar créditos/puntos en los partidos disponibles.
* **Chat en Tiempo Real:** Integración con **Socket.io** para la interacción en vivo entre usuarios, con detección y bloqueo de usuarios baneados.
* **Sincronización de Partidos:** Conexión programada con API externa de fútbol para mantener calendarios y marcadores actualizados.
* **Auto-Inicialización de la BD:** La aplicación crea automáticamente la estructura de la base de datos y sus tablas al arrancar por primera vez.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** PostgreSQL (con la librería `pg` / soporte para Neon DB o Render Postgres)
* **Tiempo Real:** Socket.io
* **Frontend:** EJS (Embedded JavaScript Templates), CSS3, JavaScript (ES6+)
* **Gestión de Entorno:** `dotenv`
* **Despliegue:** Preparado para **Render**

---

## 💻 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu equipo:
* **Node.js** (versión 18.x o superior) -> [Descargar Node.js](https://nodejs.org/)
* **Git** -> [Descargar Git](https://git-scm.com/)
* Una instancia de **PostgreSQL** accesible mediante URL de conexión (puedes usar un proveedor gratuito como [Neon.tech](https://neon.tech/)).

---

## ⚙️ Guía de Instalación y Puesta en Marcha (Entorno Local)

Si has hecho un fork de este repositorio y quieres probarlo en tu máquina local, sigue estos **4 pasos**:

### 1️⃣ Clonar el repositorio
Abre tu terminal y clona el proyecto en tu máquina local:
```bash
git clone [https://github.com/TU_USUARIO/cruz-gol.git](https://github.com/TU_USUARIO/cruz-gol.git)
cd cruz-gol
2️⃣ Instalar las dependencias
Ejecuta el comando para descargar todos los paquetes necesarios del proyecto (express, pg, socket.io, dotenv, etc.):

Bash
npm install
3️⃣ Configurar el archivo de Variables de Entorno (.env)
Crea un archivo llamado exactamente .env en la carpeta raíz del proyecto (exactamente al mismo nivel que el archivo package.json).

Abre ese archivo .env y añade tu propia cadena de conexión a PostgreSQL de esta manera:

Fragmento de código
DATABASE_URL=postgresql://usuario:contraseña@host-de-tu-bd:5432/nombre_bd?sslmode=require
⚠️ Nota importante: El archivo .env está protegido por el archivo .gitignore, por lo que tus credenciales de base de datos nunca se subirán a GitHub ni se harán públicas.

4️⃣ Iniciar la aplicación
Arranca el servidor en modo desarrollo (con recarga automática mediante Nodemon):

Bash
npm run dev
(O si prefieres el modo producción normal: npm start)

¡Listo! Abre tu navegador y entra en: http://localhost:3000. Al arrancar, la aplicación se conectará a tu base de datos y creará automáticamente todas las tablas necesarias (usuarios, partidos, apuestas, anuncios y chat_mensajes).

☁️ Despliegue en la Nube (Render)
El proyecto está totalmente adaptado para funcionar en la nube y olvidarte de tenerlo ejecutándose en local. Para subirlo a Render:

Sube tu repositorio (o tu fork) a tu cuenta de GitHub.

Entra en tu panel de Render y haz clic en New + -> Web Service.

Conecta tu repositorio de GitHub de Cruz-Gol.

Configura los siguientes parámetros del servicio:

Build Command: npm install

Start Command: npm start

En la sección de Environment Variables (Variables de entorno), añade:

DATABASE_URL: La URL de conexión de tu base de datos PostgreSQL en la nube (por ejemplo, la de Neon o la propia base de datos PostgreSQL interna de Render).

Haz clic en Create Web Service. Render compilará tu aplicación y te asignará una URL pública en línea 24/7.

👑 Primer Inicio y Creación del Usuario Administrador
Como la base de datos se crea vacía en el primer arranque, el sistema no tiene ningún usuario registrado todavía.

Para poder acceder a la plataforma por primera vez, debes crear un usuario con rol de administrador directamente en tu base de datos PostgreSQL (puedes usar la consola de tu proveedor como Neon, pgAdmin, DBeaver o la terminal de comandos) ejecutando la siguiente sentencia SQL:

SQL
INSERT INTO usuarios (nombre, password, rol, creditos) 
VALUES ('admin', 'tu_contraseña_segura', 'admin', 1000);
(Cambia 'admin' y 'tu_contraseña_segura' por las credenciales que prefieras).

👥 Gestión y creación del resto de usuarios
Una vez que inicies sesión con tu cuenta de administrador, tendrás acceso exclusivo al Panel de Administración. Desde ese apartado, el administrador será el encargado de ir creando y dando de alta al resto de usuarios que participarán en la plataforma.

🗄️ Funcionamiento de la Base de Datos
No necesitas ejecutar esquemas complejos de forma manual. Gracias al script de auto-migración incluido en el código (db.js), la primera vez que arranques el servidor (tanto en local como en Render) se validará y estructurará toda la base de datos automáticamente por ti.

📂 Estructura del Proyecto
Plaintext
cruz-gol/
├── bin/
│   └── www             # Punto de entrada del servidor HTTP
├── public/             # Estilos CSS, imágenes y scripts cliente
├── routes/             # Enrutadores Express (index, users)
├── views/              # Vistas renderizadas con EJS
├── app.js              # Configuración principal de Express y Socket.io
├── db.js               # Conexión a PostgreSQL y auto-creación de tablas
├── sync.js             # Lógica de sincronización con la API de fútbol
├── .env                # Tus variables privadas (NO se sube a Git)
├── .gitignore          # Reglas para excluir archivos sensibles en Git
└── package.json        # Dependencias y scripts del proyecto
