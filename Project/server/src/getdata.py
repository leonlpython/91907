from __main__ import app,db
def get_data(firstname,lastname):
    response = db.table("info").select("*").match({"firstname":firstname,"lastname":lastname}).execute()
    return response
