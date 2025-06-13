from flask import send_from_directory,render_template, jsonify
from __main__ import app
import src.getdata as get

    
@app.route('/')
def serve():
    return render_template("index.html")

@app.route('/calender')
def serve_book():
    response = get.get_data(lastname = "Test",firstname = "Test")
    data = []
    for i in response.data:
        data.append((i["date"],i["period"]))
    
    return render_template('calender.html', data = data)

@app.route("/signin")
def signin():
    return send_from_directory(app.static_folder, 'signin.html')

