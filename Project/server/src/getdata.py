from __main__ import app,db
def get_data(**indexes):
    response = db.table("info").select("*",count="exact").match({str(idx):val for idx,val in indexes.items()}).execute()
    return response
