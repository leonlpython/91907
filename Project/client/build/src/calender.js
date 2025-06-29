/* Declare Global variables */
let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");
let bookings = document.getElementById("button-content");
const periods = [1,2,3];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();


function createBtns(selectDate, data){ 
    /* Create buttons on selected date 
    Args:
        selectDate: Date to create buttons upon
        data: data queried from table
    */  
    const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
    let dummyDate = sessionStorage.setItem("dummyDate",selectDate);
    var activeTimes = data["data"];
    var parts =selectDate.split(' ');
    var curr = months[parts[1]]
    let month = curr.toString()

    /*Condition to put data in accepted format*/
    if (months[parts[1]]+1 < 10){
        month ="0"+curr
    }

    let isActive = false;
    var sessionTimes = [];
    /*Formats data into array*/
    for(let j = 0; j < activeTimes.length;j++){
        if(activeTimes in sessionTimes){
            continue
        }else{
            sessionTimes.push(data["data"][j][1])
        }
    }
    /*Removes set Child class content*/
    bookings.replaceChildren();

    for(let i = 0;i<3;i++){
        /*Conditions to check if there are avaliable periods*/
        if (sessionTimes.length != 0){
            if (sessionTimes.includes(i+1) == true){
                isActive = true;
            }
        }
        if(isActive == false){
            let btn = document.createElement("button");
            btn.className = "book-btn";
            btn.id = `btn-${i}`;
            btn.textContent = `Period ${periods[i]}`;
            /*Button Styling*/
            btn.style.height = '150px';
            btn.style.maxWidth = "600px";
            btn.style.alignItems = "center";
            btn.style.backgroundColor = "#FFFFFF";
            btn.style.border = "2px solid rgba(0,0,0,0.1)";
            btn.style.borderRadius= "1rem";
            btn.style.boxShadow = "rgba(0, 0, 0, 0.25) 0 4px 12px";
            btn.style.boxSizing = "border-box";
            btn.style.color = "rgba(0, 0, 0, 0.85)";
            btn.style.cursor = "pointer";
            btn.style.display = "inline-flex";
            btn.style.fontFamily =`Roboto`;
            btn.style.fontSize= "16px";
            btn.style.fontWeight = "bold";
            btn.style.justifyContent = "center";
            btn.style.lineHeight = "1.25";
            btn.style.margin = "10px";
            btn.style.minHeight = "3rem";
            btn.style.fontFamily = "Circular,-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif";
            btn.style.padding = "calc(.875rem - 1px) calc(1.5rem - 1px)";
            btn.style.textDecoration ="none";
            btn.style.transition = "all 250ms";
            btn.style.userSelect = "none";
            btn.style.touchAction = "manipulation";
            btn.style.verticalAlign = "baseline";
            btn.style.width = "clamp(10px,100vw,200rem)";

            /*Media Queries */

            if (window.matchMedia("(max-width: 620px)").matches) {
                btn.style.maxWidth = "150px";
                btn.style.width="30vw";
            }

            bookings.appendChild(btn);
        }
        isActive = false;
    }
}

function displayCalendar() {
    /*
    Displays calender
    */
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay(); //4
    const numberOfDays = lastDay.getDate(); //31
    let formattedDate = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });
    display.innerHTML = `${formattedDate}`;
    if (window.matchMedia("(max-width: 620px)").matches) {
        display.style.fontSize = "5vw";
    }

    for (let x = 1; x <= firstDayIndex; x++) {
        const div = document.createElement("div");
        div.innerHTML += "";
        days.appendChild(div);
    }

    for (let i = 1; i <= numberOfDays; i++) {
        let div = document.createElement("div");
        let currentDate = new Date(year, month, i);
        div.dataset.date = currentDate.toDateString();
        div.innerHTML += i;
        days.appendChild(div);
    if (currentDate.getFullYear() === new Date().getFullYear() && 
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getDate() === new Date().getDate()) {
        div.classList.add("current-date");
        }
    }
}

function displaySelected() {
    /*Displays Selected date */
    const dayElements = document.querySelectorAll(".days div");
    dayElements.forEach((day) => {
        day.addEventListener("click", (e) => {
            let selectedDate = e.target.dataset.date;
            selected.innerHTML = `Selected Date : ${selectedDate}`;
            selected.style.fontWeight = "bold";
            data = {
                firstname: "Test",
                lastname: "Test",
                period:1,
                date:selectedDate
            };
            socket.emit("update_display",{"data":data})
            socket.on("display_calender",(data) =>{
                createBtns(selectedDate,data);
                onclickBtn(selectedDate);
            });
            return selectedDate;
        });
    });
}


async function confirmBtns(changeText){

    let closeModalBtn = document.getElementById('close-modal-btn');
    var modalOverlay = document.getElementById('confirmation-modal-overlay');
    let modalTextContent = document.getElementsByClassName("confirmation-text")[0];
    let openModalBtn = document.getElementById("confirm-booking-time");
    modalTextContent.textContent = changeText;
        modalOverlay.classList.remove('hidden');
        return await new Promise(function(resolve,reject){
            // Close modal when clicking outside the content
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.classList.add("hidden")
                resolve(false);
            }
        }); 
        closeModalBtn.addEventListener('click', function(e){
            modalOverlay.classList.add('hidden');
            resolve(false);
        });
        openModalBtn.addEventListener("click",function(event){
            event.stopPropagation()
            modalOverlay.classList.add('hidden');
            // Removing active event listeners
            openModalBtn.replaceWith(openModalBtn.cloneNode(true));
            resolve(true);
           
        });
    }).then()
}


function onclickBtn(selDate){
    const periods = [1,2,3];
    
    var buttons = document.querySelectorAll(".book-btn");
    for (let col of buttons){
        col.addEventListener("mouseover", function(e){
            col.style.borderColor = "rgba(0, 0, 0, 0.15)";
            col.style.boxShadow = "rgba(0, 0, 0, 0.1) 0 4px 12px";
            col.style.color = "rgba(0, 0, 0, 0.65)";
            col.style.transform="translateY(-1px)";
        })
        col.addEventListener("mouseout",function(e){
            col.style.borderColor = "rgba(0, 0, 0, 0.15)";
            col.style.boxShadow = "rgba(0, 0, 0, 0.5) 0 4px 12px";
            col.style.color = "black";
            col.style.transform="translateY(0px)";
        })
        col.addEventListener("click", function(e) {
            const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
            const today = new Date();
            var parts =selDate.split(' ');
            var mydate = new Date( parseInt(parts[3]),months[parts[1]]-1, parseInt(parts[2])); 

            
            newText = `Please confirm the booking for Date: ${selDate} Period: ${periods[e.target.id[e.target.id.length-1]]}`
            
            if(today.toString().slice(0,15) ==selDate){

                    let todayS = today.getHours()*60*60 + today.getMinutes()*60+today.getSeconds()
                    const periodOneS = 60*60*10 + 55*60
                    const periodTwoS = 60*60* 13 + 20*60
                    const periodThreeS = 60*60* 13 + 35*60
                    if (todayS>periodThreeS){
                        alert("Select a date that's in the present");
                    } else if(todayS >periodTwoS &&(col.id =="btn-1"||col.id =="btn-0")){
                        alert("Select a date that's in the present");
                    } else if(todayS >periodOneS&&col.id =="btn-0"){
                        alert("Select a date that's in the present");
                    } else{
                        confirmBtns(newText).then(result =>{
                    if(result == true){
                    let data = {
                        firstname: "Test",
                        lastname: "Test",
                        period:periods[e.target.id[e.target.id.length-1]],
                        date:mydate
                        };
                    socket.emit('times', {
                        'data':data
                    });
                    // Removing active event listeners
                    col.replaceWith(col.cloneNode(true)); 
                }else{
                    
                }
                }).catch(error =>{
                    console.log(error)
                }).finally(() =>{
                    //Pass
                })

                    }
                } 
            else if((today.getTime()>mydate.getTime()) &&(today.toString().slice(0,15) !=selDate)){
                alert("Select a date that's in the present");
            } else if(bookings.children.length!= 3){
                alert("You cannot select a time more than once per day");
            }else{
                confirmBtns(newText).then(result =>{
                    if(result == true){
                    let data = {
                        firstname: "Test",
                        lastname: "Test",
                        period:periods[e.target.id[e.target.id.length-1]],
                        date:mydate
                        };
                    socket.emit('times', {
                        'data':data
                    });

                    // Removing active event listeners
                    col.replaceWith(col.cloneNode(true)); 
                }
                }).catch(error =>{
                    console.log(error)
                }).finally(() =>{
                    //Pass
                })
            }
        }
    )}
};


// Call the function to display the calendar
displayCalendar();
displaySelected();
previous.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";

  if (month < 0) {
    month = 11;
    year = year - 1;
  }

  month = month - 1;

  date.setMonth(month);
displayCalendar();
displaySelected();
});

next.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";
  if (month > 11) {
    month = 0;
    year = year + 1;
  }

  month = month + 1;
  date.setMonth(month);
    displayCalendar();
    displaySelected();
});