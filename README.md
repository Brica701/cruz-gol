Markdown
# ⚽ Cruz-Gol (2026)

**Cruz-Gol** es una plataforma web completa e interactiva para la gestión de porras, quinielas y apuestas deportivas entre usuarios. Incluye actualización de partidos mediante API externa, comunicación en tiempo real y persistencia de datos en PostgreSQL.

---

## 📋 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Requisitos Previos](#-requisitos-previos)
4. [Guía de Instalación y Puesta en Marcha (Para Forks)](#-guía-de-instalación-y-puesta-en-marcha-para-forks)
5. [Creación del Usuario Administrador Inicial](#-creación-del-usuario-administrador-inicial)
6. [Funcionamiento de la Base de Datos](#-funcionamiento-de-la-base-de-datos)
7. [Estructura del Proyecto](#-estructura-del-proyecto)

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
* **Base de Datos:** PostgreSQL (con la librería `pg` / soporte para Neon DB)
* **Tiempo Real:** Socket.io
* **Frontend:** EJS (Embedded JavaScript Templates), CSS3, JavaScript (ES6+)
* **Gestión de Entorno:** `dotenv`

---

## 💻 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu equipo:
* **Node.js** (versión 18.x o superior) -> [Descargar Node.js](https://nodejs.org/)
* **Git** -> [Descargar Git](https://git-scm.com/)
* Una instancia de **PostgreSQL** accesible mediante URL de conexión (puedes usar un proveedor gratuito como [Neon.tech](https://neon.tech/)).

---

## ⚙️ Guía de Instalación y Puesta en Marcha (Para Forks)

Si has hecho un fork de este repositorio y quieres ponerlo a funcionar con tu propia base de datos, sigue estos **4 pasos**:

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

👑 Creación del Usuario Administrador Inicial
Como la base de datos se crea vacía en tu primer arranque, necesitarás un usuario con privilegios de administrador para poder acceder a la plataforma, gestionar la aplicación y dar de alta a nuevos usuarios.

Para crear tu cuenta de administrador, conéctate a tu base de datos PostgreSQL (puedes usar la consola de comandos de tu proveedor como Neon, pgAdmin, DBeaver o el terminal) y ejecuta la siguiente sentencia SQL:

SQL
INSERT INTO usuarios (nombre, password, rol, creditos) 
VALUES ('admin', 'tu_contraseña_segura', 'admin', 1000);
(Asegúrate de cambiar 'admin' y 'tu_contraseña_segura' por el nombre de usuario y contraseña que desees utilizar para iniciar sesión).

Una vez insertado, ya podrás iniciar sesión en http://localhost:3000 con esas credenciales y acceder al panel de administración.

🗄️ Funcionamiento de la Base de Datos
No necesitas ejecutar esquemas complejos de forma manual. Gracias al script de auto-migración incluido en el código (db.js), la primera vez que arranques el servidor se validará y estructurará toda la base de datos por ti.

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
