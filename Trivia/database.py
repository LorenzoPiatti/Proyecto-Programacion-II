import sqlite3
from datetime import datetime

DB_NAME = 'ranking.db'

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()

        # Crear tabla de puntajes
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ranking (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                puntaje INTEGER NOT NULL,
                fecha TEXT NOT NULL
            )
        """)

        # Crear tabla de usuarios
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        """)

        conn.commit()

def insertar_puntaje(nombre, puntaje):
    with sqlite3.connect("ranking.db") as conn:
        cursor = conn.cursor()

        # Verificar si el usuario ya existe
        cursor.execute("SELECT puntaje FROM ranking WHERE nombre = ?", (nombre,))
        resultado = cursor.fetchone()

        if resultado:
            nuevo_puntaje = resultado[0] + puntaje
            cursor.execute("UPDATE ranking SET puntaje = ? WHERE nombre = ?", (nuevo_puntaje, nombre))
        else:
            cursor.execute("INSERT INTO ranking (nombre, puntaje, fecha) VALUES (?, ?, datetime('now'))", (nombre, puntaje))

        conn.commit()


def obtener_ranking():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT nombre, puntaje, fecha FROM ranking ORDER BY puntaje DESC LIMIT 10")
        return cursor.fetchall()

def registrar_usuario(nombre, email, password):
    try:
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", (nombre, email, password))
            conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False

def verificar_usuario(nombre):
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE nombre = ?", (nombre,))
        return cursor.fetchone()
    
def obtener_usuarios():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, nombre, email FROM usuarios")
        return cursor.fetchall()