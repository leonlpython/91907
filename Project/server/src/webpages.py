from flask import send_from_directory,render_template
from __main__ import app
import src.getdata as g

@app.route('/')
def serve():
    response = g.get_data("Test","Test")
    
    data = []
    for i in response.data:
        data.append((i["date"],i["period"]))

    print(data)
    return render_template('calender.html', data = data)#send_from_directory(app.static_folder, 


@app.route("/signin")
def signin():
    return send_from_directory(app.static_folder, 'signin.html')