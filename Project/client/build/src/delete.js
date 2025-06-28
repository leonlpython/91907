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

socket.on("ins",(data) =>{
    appendBookings(data["data"][0],data["data"][1],parseInt(data["count"])-1);
    removeTimes(data["data"][1]);
}); 

function removeTimes(delPeriod){
    /*Removes childButton from parent class*/
    const childButton = document.getElementById(`btn-${delPeriod-1}`);
    /*Checks whether bookings and childButton are both undefined*/
    if (bookings && childButton) {
        bookings.removeChild(childButton);
    }
}

socket.on("update_del",(data) =>{
    let showBooked = document.getElementById("show-bookings-container");
    const showTime = document.getElementById(`ButtonContainer-${parseInt(data["id"])}`);
    /*If bookings and showtime is not undefined then remove showtime*/
    if (bookings && showTime) {
        dummyDate = sessionStorage.getItem("dummyDate")
        replaceText = `Please confirm the deletion for the booking: Date: ${dummyDate} Period: ${data["data"][1]}`
        confirmBtns(replaceText).then(result =>{
            if(result == true){
                showBooked.removeChild(showTime);
                createBtns(dummyDate,data)
                onclickBtn(dummyDate);
                socket.emit("update_db",{"data":data})
            }})
        .catch(error =>{
            console.log(error)
        }).finally(() =>{
            //Pass
            });
    }
})