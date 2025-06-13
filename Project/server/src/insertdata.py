import datetime
from flask import request,render_template
from __main__ import app,db
import src.getdata as get

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
            for i in list(json["data"].values()):
                print(i)
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


@app.route('/receive', methods = ["GET","POST"])
def insert_data():
    if request.method =="POST":
        json = request.get_json()
        r_val = to_dict(json)
        print("==============")
        data = get.get_data(lastname = "Test",firstname = "Test",date = r_val["date"])



        
        
        """for i,cnt in data:
            if cnt > 1:
                return render_template('index.html', value=value)
        """
        try:
            response = db.table("info").insert(r_val).execute()
            return "Inserted data!"
        except:
            raise Exception("Failed to excecute data")
        return "Coud not insert data!"

        #print(get.get_data(lastname = "Test",firstname = "Test",date = r_val["date"]), "BITENOTAD PETHLAS")
        



"""
def insert_data():
    if request.method =="POST":
        json = request.get_json()
        r_val = to_dict(json)
        
        
        #print(get.get_data(lastname = "Test",firstname = "Test",date = r_val["date"]), "BITENOTAD PETHLAS")
        try:
            response = db.table("info").insert(r_val).execute()
            emit("add_booked",{"insert_data":r_val,"booked_count":60})
        except:
            raise Exception("Failed to excecute data")
        return r_val
    else:
        raise Exception("No data")
"""
    