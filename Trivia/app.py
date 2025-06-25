from flask import Flask, render_template, request, redirect, session
from database import init_db, insertar_puntaje, obtener_ranking, registrar_usuario, verificar_usuario
import os

app = Flask(__name__)
app.secret_key = 'clave-super-secreta'

# Inicializar la base de datos al iniciar la app
init_db()

@app.route('/')
def index():
    usuario = session.get('usuario')
    return render_template('index.html', usuario=usuario)


@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']
        password = request.form['password']

        print("🔵 Intentando registrar:", nombre, email, password)

        if registrar_usuario(nombre, email, password):
            session['usuario'] = nombre
            session['email'] = email
            return redirect('/login')
        else:
            return render_template('registro.html', error="El email ya está registrado.")
    return render_template('registro.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nombre = request.form['usuario']
        password = request.form['password']
        usuario = verificar_usuario(nombre)

        if usuario and usuario[3] == password:
            session['usuario'] = usuario[1]
            session['email'] = usuario[2]
            return redirect('/main')
        else:
            return render_template('login.html', error="Credenciales inválidas")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/resultado', methods=['POST'])
def resultado():
    if 'usuario' not in session:
        return redirect('/login')

    nombre = session['usuario']
    puntaje = request.form.get('puntaje')

    if nombre and puntaje:
        insertar_puntaje(nombre, int(puntaje))
    return redirect('/ranking')

@app.route('/ranking')
def ranking():
    puntajes = obtener_ranking()
    return render_template('ranking.html', puntajes=puntajes)

@app.route('/main')
def main():
    if 'usuario' not in session:
        return redirect('/login')
    usuario = session.get('usuario')
    puntajes = obtener_ranking()  # NUEVO: trae lista de (nombre, puntaje, fecha)
    return render_template("main.html", usuario=usuario, puntajes=puntajes)


@app.route('/trivia')
def trivia():
    if 'usuario' not in session:
        return redirect('/')
    usuario = session.get('usuario')
    return render_template('trivia.html', usuario=usuario)

@app.route('/debug_usuarios')
def debug_usuarios():
    from database import obtener_usuarios
    return str(obtener_usuarios())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))

