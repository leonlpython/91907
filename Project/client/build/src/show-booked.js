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
    p.style.fontWeight = "bold";
    p.style.marginTop = "2%";
    button.className = "del-btn";
    button.id = `del-times-${i}`;



    /* Style delete buttons */
    button.textContent = "Delete Booking";

    button.style.outline = "none";
    button.style.padding = "16px 24px";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.touchAction = "none";
    button.style.transition = "all 300ms cubic-bezier(.23, 1, 0.32, 1)";
    button.style.userSelect = "none";
    button.style.width = "auto";
    button.style.margin = "0";
    button.style.marginTop = "1%";
    button.style.fontWeight = "600";
    button.style.lineHeight = "20px";
    button.style.display = "inline-block";
    button.style.fontFamily = "Circular,-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif";
    button.style.fontSize = "16px";
    button.style.border = "2px solid #EAFFFD";
    button.style.boxShadow = "rgba(0, 0, 0, 0.25) 0 8px 15px"
    button.style.borderRadius = "8px";
    button.style.boxSizing = "border-box";
    button.style.color = "black";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "white";
    /* Add events to button */
    button.addEventListener("mouseover", function(x){
        /*button.style.boxShadow = "#222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px";*/
        button.style.boxShadow = "rgba(0, 0, 0, 0.5) 0 8px 15px"
        button.style.transition = "box-shadow .2s";
    })
    button.addEventListener("mouseout", function(x){
        button.style.boxShadow = "rgba(0, 0, 0, 0.25) 0 8px 15px"
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