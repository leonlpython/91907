from flask import render_template
from __main__ import app,socketio
import src.getdata as get
from flask_socketio import emit
from typing import Any
#Serve Webpages
@app.route('/')
def serve()->render_template:
    return render_template("index.html")

@socketio.on("join_booked")
def update_data(data:Any)->None:
    "Updates data in website"
    "Args: data: Any: Data not used here"
    response = get.get_data(lastname = "Test",firstname = "Test")
    data = []

    for i in response.data:
        data.append((i["date"],i["period"]))
    
    emit('update_booked',{"data":data})
