from src.insertdata import to_dict
from flask import request
from __main__ import app,db

"""
@app.route("/delete", methods = ["GET","POST"])
def del_vals():
    if request.method =="POST":
        json = request.get_json()
        r_val = to_dict(json)
        print(r_val)
        response = (db.table("info")
            .delete().select("*").match({"id": r_val["id"],"firstname":r_val["firstname"],"lastname":r_val["lastname"],"period":r_val["period"],"date":r_val["date"]})
            .execute()
        )
        return r_val
    else:
        raise No deleted data
        """

@app.route('/del', methods = ["GET","POST"])
def del_data():
    if request.method =="POST":
        json = request.get_json()
        r_val = to_dict(json)
        print(json["data"])
        # Implement POST REQUEST FROM DELETE JS 
        try:
            
            response = (
                db.table("info")
                .delete()
                .eq("firstname",r_val["firstname"])
                .eq("lastname",r_val["lastname"])
                .eq("period",r_val["period"])
                .eq("date",r_val["date"])
                .execute()
            )
        except:
            raise Exception("Failed to excecute data")
        return r_val
    else:
        raise Exception("No data")