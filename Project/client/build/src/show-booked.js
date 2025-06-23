function appendBookings(dataDate,dataPeriod,i){
    /*
    Create bookings within show-bookings-container.
    Args:
        dataDate: date of selected button
        dataPeriod: period of selected button
        i: Incrementation counter variable
    */

    /*Declare constant variables*/ 
    const show = document.getElementById("show-bookings-container");
    const buttonContainer = document.createElement("div");
    const showBookings = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");
    /* Set IDs and classnames to constant variables */

    buttonContainer.id = `ButtonContainer-${i}`;
    showBookings.className = "show-bookings";
    showBookings.id = `show-times-${i}`;
    p.textContent = `Date: ${dataDate} Period ${dataPeriod}`
    button.className = "del-btn";
    button.id = `del-times-${i}`;



    /* Style delete buttons */
    button.textContent = "Delete Booking";
    button.style.outline = "none";
    button.style.padding = "13px 23px";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.touchAction = "none";
    button.style.transition = "box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s";
    button.style.userSelect = "none";
    button.style.width = "auto";
    button.style.margin = "0";
    button.style.fontWeight = "600";
    button.style.lineHeight = "20px";
    button.style.display = "inline-block";
    button.style.fontFamily = "Circular,-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#FFFFFF";
    button.style.border = "1px solid #222222";
    button.style.borderRadius = "8px";
    button.style.boxSizing = "border-box";
    button.style.color = "#222222";
    button.style.cursor = "pointer";

    /* Add events to button */
    button.addEventListener("mouseover", function(x){
        button.style.boxShadow = "#222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px";
        button.style.transition = "box-shadow .2s";
    })
    button.addEventListener("mouseout", function(x){
        button.style.boxShadow = "none";
        button.style.transition = "none";
    })
    button.addEventListener("click", function(x){
        getdatePeriod(button.id)
    })
    

    /*Append into subclasses and nesting in show bookings container*/
    showBookings.appendChild(p);
    buttonContainer.appendChild(showBookings);
    buttonContainer.appendChild(button);
    show.appendChild(buttonContainer);
}


/*Receive Socket data */
socket.on('update_booked',(data) => {
    for(let i = 0; i < data["data"].length;i++){
    appendBookings(data["data"][i][0],data["data"][i][1],i)
    }
});

socket.on("ins",(data) =>{
    appendBookings(data["data"][0],data["data"][1],parseInt(data["count"])-1);
    removeTimes(data["data"][1]);
}); 
socket.on("update_del",(data) =>{
    let showBooked = document.getElementById("show-bookings-container");
    const showTime = document.getElementById(`ButtonContainer-${parseInt(data["id"])}`);
    /*If bookings and showtime is not undefined then remove showtime*/
    if (bookings && showTime) {
        showBooked.removeChild(showTime);
    }
})
