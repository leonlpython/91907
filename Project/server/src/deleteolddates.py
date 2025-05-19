from __main__ import app,db
from datetime import date

def delete_old_dates():
    today = date.today
    
    response = (db.table("info")
        .delete()
        .gte("date", "2023-01-01")
        .lte("date", "2023-12-31")
        .execute())