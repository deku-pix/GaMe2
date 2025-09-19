# Optional Python server for Hugging Face Spaces
# This is only needed if deploying as a Python app instead of Static HTML

from flask import Flask, render_template_string, send_from_directory
import os

app = Flask(__name__)

# Read the HTML file
def get_html_content():
    with open('index.html', 'r') as file:
        return file.read()

# Read the JavaScript file
def get_js_content():
    with open('snake.js', 'r') as file:
        return file.read()

@app.route('/')
def home():
    return get_html_content()

@app.route('/snake.js')
def javascript():
    js_content = get_js_content()
    return app.response_class(js_content, mimetype='application/javascript')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port)