from flask import Flask, render_template

app = Flask(__name__)

# Configure server name for subdomain handling
app.config['SERVER_NAME'] = 'gptlister.com'

@app.route('/')
def home():
    return render_template('index.html', content_type='home')

@app.route('/pleistos')
def about():
    return render_template('index.html', content_type='about')

# Define a WSGI application entry point
def application(environ, start_response):
    return app(environ, start_response)

# Run the app only if this file is executed as the main script
if __name__ == "__main__":
    app.run(debug=False)
