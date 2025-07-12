from __main__ import db
from typing import List,Any
def get_data(**indexes: List[str]) -> Any:
    """
    Gets data from database
    Args:List[str]: Column names of database 
    """
    response = db.table("info").select("*",count="exact").match({str(idx):val for idx,val in indexes.items()}).execute()
    return response
