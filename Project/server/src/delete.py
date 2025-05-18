from insertdata import to_dict
from flask import request
from __main__ import app,db
@app.route("/delete", methods = ["GET","POST"])
def del_vals():
    if request.method =="POST":
        json = request.get_json()
        r_val = to_dict(json)
        print(r_val)
        return r_val
    else:
        raise "No deleted data"