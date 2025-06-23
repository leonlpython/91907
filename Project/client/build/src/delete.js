function getdatePeriod(clicked_id){

    /*Gets date and period. Triggers an emit event.*/
    let idVal = String(clicked_id).split("-")
    let times = document.getElementById(`show-times-${idVal[idVal.length-1]}`);
    let text = times.innerText;

    const [,date,,period] = text.split(" ");
    const [year,month,day] = date.split("-");
    const months = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}
    dateRange = new String (months[parseInt(month)]+" "+parseInt(day)+" "+parseInt(year));

    /* Use "test" user */
    let data = {
        firstname: "Test",
        lastname: "Test",
        period:parseInt(period),
        date: dateRange
        };
    socket.emit("del",
        {"data":data,
        "id":idVal[idVal.length-1]
    });
}