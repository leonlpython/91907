import datetime
from flask import request
from __main__ import app,db
@app.route('/receive', methods = ["GET","POST"])
def insert_data():

    if request.method =="POST":
        json = request.get_json()
        if json:
            r_val = {
                "firstname":"",
                "lastname":"",
                "period":0,
                "date":0,
            }

            j = 0
            while j<4:
                for i in list(json["data"].values()):
                    r_val[list(r_val)[j]] = str(i)
                    j+=1
            
            l,r = 0,0
            date = []
            word = ""
            months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"June":6,"July":7,"August":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}

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
        
            try:
                response = db.table("info").insert(r_val).execute()
            except Exception as exception:
                raise "Failed to excecute data"
            return r_val
        return "No data"
    
