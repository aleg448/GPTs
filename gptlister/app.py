from flask import Flask, render_template

app = Flask(__name__)

app.config['SERVER_NAME'] = 'gptlister.com'

@app.route('/')
def home():
    return render_template('index.html', content_type='home')

@app.route('/', subdomain='pleistos')
def about():
    return render_template('index.html', content_type='about')

if __name__ == "__main__":
    app.run(debug=True)
