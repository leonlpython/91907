from flask import send_from_directory
from __main__ import app

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'calender.html')
