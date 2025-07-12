import datetime
from __main__ import socketio,db
import src.getdata as get
from flask_socketio import emit
from typing import Dict,Any
def to_dict(d:Dict[str,Any]) -> Dict[str,Any]:
    """
    Helper Function to convert d to dict where each value is formatted correctly
    Args: Dict[str,Any] : data to be formatted correctly
    returns data in correct formatting.
    """

    #Checks if the the d is not none.
    if d:
        #Static dictionary to reduce memory
        r_val = {
            "firstname":"",
            "lastname":"",
            "period":0,
            "date":0,
        }
        l=0
        r = 0
        date = []
        word = ""
        months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
        j = 0
        while j<4:
            for i in list(d.values()):
                r_val[list(r_val)[j]] = str(i)
                j+=1
        #Two pointers to extract values
        while r<len(r_val["date"]):
            if r_val["date"][r] == " ":
                l = r
                date.append(word)
                word = ""
            else:
                word += r_val["date"][r]
            r+=1
        date.append(word)
        #change static items
        r_val["date"] = datetime.date(int(date[3]),months[date[1]],int(date[2])).isoformat()
        r_val["period"] = int(r_val["period"])
        return r_val
    else:
        #Raise if no data
        raise Exception("No data")


def iso_to_string(date_datetime:str) -> str:
    """
    Helper function to change convert date_datetime to string and accepted format
    args: date_datetime: datetime object as string datatype
    return date as a string but in accpted format"""
    date_arr = str(date_datetime)[:10].split("-")
    return "-".join(date_arr)

@socketio.on('times')
def insert_data(data: Any) -> None:
    """
    On event times insert_data is triggered
    Args:Any: data to add to db.
    """
    insert_date = datetime.datetime.fromisoformat(data["data"]["date"])
    res_date = insert_date+datetime.timedelta(days=1)
    db.table("info").insert({"firstname":data["data"]["firstname"],"lastname":data["data"]["lastname"],"period":data["data"]["period"],"date":res_date.isoformat()}).execute()
    count = db.table("info").select("*",count = "exact").execute()
    emit('ins',{"data":[iso_to_string(res_date),data["data"]["period"]], "count":str(count.count)})


@socketio.on('update_display')
def get_curr_date(data: Any) -> None:
    "Updates data in website"
    "Args: data: Any: Data from website"
    books = []
    r_val = to_dict(data["data"])
    for i in get.get_data(date = r_val["date"]).data:
        books.append((i["date"],i["period"]))
    emit('display_calender',{"data":books})