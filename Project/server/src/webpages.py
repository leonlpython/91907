from flask import send_from_directory,render_template, jsonify,copy_current_request_context
from __main__ import app,socketio
import src.getdata as get
from flask_socketio import SocketIO,emit
import threading
    
@app.route('/')
def serve():
    return render_template("index.html")

@app.route('/calender')
def serve_book():
    return render_template('calender.html')


@app.route("/signin")
def signin():
    return send_from_directory(app.static_folder, 'signin.html')


@socketio.on("join_booked")
def update_data(d):
    response = get.get_data(lastname = "Test",firstname = "Test")
    data = []

    for i in response.data:
        data.append((i["date"],i["period"]))
    
    emit('update_booked',{"data":data})
