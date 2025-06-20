from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Конфигурация базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'your-secret-key-here'

db = SQLAlchemy(app)

# Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Создаем таблицы в БД (только при первом запуске)
@app.before_first_request
def create_tables():
    db.create_all()

# Главная страница
@app.route('/')
def home():
    return render_template('index.html')

# Страница о нас
@app.route('/about')
def about():
    return render_template('about.html')

# API endpoint для получения данных
@app.route('/api/data')
def get_data():
    data = {
        'message': 'Hello from server!',
        'items': ['Item 1', 'Item 2', 'Item 3'],
        'status': 'success'
    }
    return jsonify(data)

# Регистрация пользователя
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        if User.query.filter_by(username=username).first():
            return 'Username already exists', 400
            
        if User.query.filter_by(email=email).first():
            return 'Email already exists', 400
            
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        
        db.session.add(new_user)
        db.session.commit()
        
        return redirect(url_for('home'))
    
    return render_template('register.html')

# Вход пользователя
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if not user or not user.check_password(password):
            return 'Invalid username or password', 401
            
        # Здесь можно добавить логику сессии/аутентификации
        return redirect(url_for('home'))
    
    return render_template('login.html')

# Обработка 404 ошибки
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)