from src.insertdata import to_dict
from flask import request
from __main__ import app,db,socketio
from flask_socketio import emit
from dateutil.parser import parse

@socketio.on('del')
def del_data(data): 
    emit("update_del",{"data":[parse(data["data"]["date"]).isoformat(),data["data"]["period"]],"id":int(data["id"])})

@socketio.on("update_db")
def update_del(data):
    try:
        response = (
            db.table("info")
            .delete()
            .eq("firstname",data["data"]["firstname"])
            .eq("lastname",data["data"]["lastname"])
            .eq("period",data["data"]["period"])
            .eq("date",parse(data["data"]["date"]).isoformat())
            .execute()
        )
    except:
        raise Exception("Failed to excecute data")
    return