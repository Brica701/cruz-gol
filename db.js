const { Pool } = require('pg');

// Cargamos dotenv para leer el archivo .env localmente
try {
    require('dotenv').config();
} catch (e) {}

// Si process.env.DATABASE_URL no está definida, lanzará un aviso claro
if (!process.env.DATABASE_URL) {
    console.error("❌ ¡ALERTA! No se encontró la variable DATABASE_URL. Configura tu archivo .env");
}

const pool = new Pool({
    // Obligatoriamente usa una variable externa. Cero datos expuestos en el código.
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// --- BLOQUE PARA CREAR LAS TABLAS AUTOMÁTICAMENTE ---
const inicializarDB = async () => {
    try {
        console.log("🛠️ Verificando tablas en la base de datos...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                nombre varchar(100) PRIMARY KEY,
                puntos int DEFAULT 0,
                ha_pagado boolean DEFAULT false,
                password varchar(255) NOT NULL,
                creditos int DEFAULT 2000,
                rol text DEFAULT 'user',
                debe_cambiar_pass boolean DEFAULT true
            );

            CREATE TABLE IF NOT EXISTS partidos (
                id varchar(100) PRIMARY KEY,
                equipo_a varchar(100),
                equipo_b varchar(100),
                fecha_partido timestamp with time zone,
                resultado_a int DEFAULT NULL,
                resultado_b int DEFAULT NULL,
                estado text DEFAULT 'abierto'
            );

            CREATE TABLE IF NOT EXISTS apuestas (
                id SERIAL PRIMARY KEY,
                usuario varchar(100) REFERENCES usuarios(nombre) ON DELETE CASCADE,
                id_partido varchar(100) REFERENCES partidos(id) ON DELETE CASCADE,
                goles_a int,
                goles_b int,
                apostado int DEFAULT 0,
                puntos_obtenidos int DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS anuncios (
                id SERIAL PRIMARY KEY,
                titulo varchar(255) NOT NULL,
                mensaje text NOT NULL,
                fecha_creacion timestamp with time zone DEFAULT NOW(),
                importante boolean DEFAULT false
            );

            CREATE TABLE IF NOT EXISTS chat_mensajes (
                id SERIAL PRIMARY KEY,
                usuario varchar(100),
                mensaje text,
                id_partido varchar(100),
                tipo text DEFAULT 'texto',
                fecha timestamp with time zone DEFAULT NOW()
            );

            CREATE INDEX IF NOT EXISTS idx_fecha_chat ON chat_mensajes(fecha);
        `);

        console.log("✅ Servidor conectado a la base de datos. Tablas listas.");
    } catch (err) {
        console.error("❌ Error inicializando tablas:", err.message);
    }
};

inicializarDB();

module.exports = {
    query: (text, params) => pool.query(text, params),
};