import datetime
from flask import request,render_template
from __main__ import socketio,db
import src.getdata as get
from flask_socketio import SocketIO, emit

def to_dict(json):
    if json:
        r_val = {
            "firstname":"",
            "lastname":"",
            "period":0,
            "date":0,
        }
        j = 0
        while j<4:
            for i in list(json.values()):
                r_val[list(r_val)[j]] = str(i)
                j+=1
        
        l,r = 0,0
        date = []
        word = ""
        months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
       
        while r<len(r_val["date"]):
            if r_val["date"][r] == " ":
                l = r
                date.append(word)
                word = ""
            else:
                word += r_val["date"][r]
            r+=1
        date.append(word)

        
        r_val["date"] = datetime.date(int(date[3]),months[date[1]],int(date[2])).isoformat()
        r_val["period"] = int(r_val["period"])
        return r_val
    else:
        raise "No data"


def iso_to_string(date_datetime):
    date_arr = str(date_datetime)[:10].split("-")
    return "-".join(date_arr)

@socketio.on('times')
def insert_data(data):
    
    insert_date = datetime.datetime.fromisoformat(data["data"]["date"])
    res_date = insert_date+datetime.timedelta(days=1)
    response = db.table("info").insert({"firstname":data["data"]["firstname"],"lastname":data["data"]["lastname"],"period":data["data"]["period"],"date":res_date.isoformat()}).execute()
    count = db.table("info").select("*",count = "exact").execute()
    emit('ins',{"data":[iso_to_string(res_date),data["data"]["period"]], "count":str(count.count)})


@socketio.on('update_display')
def get_curr_date(data):
    books = []
    r_val = to_dict(data["data"])
    for i in get.get_data(date = r_val["date"]).data:
        books.append((i["date"],i["period"]))
    emit('display_calender',{"data":books})