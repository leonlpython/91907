/* Declare Global variables */
let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");
const times = document.querySelectorAll(".book-btn");
let bookings = document.getElementById("button-content");
const periods = [1,2,3];
let time = document.getElementsByClassName("selected")[0];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();


function createBtns(selectDate, data){ 
    /* Create buttons on selected date 
    Args:
        selectDate: Date to create buttons upon
        data: data queried from table
    */
    const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}

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
            btn.style.borderRadius= ".25rem";
            btn.style.boxShadow = "rgba(0, 0, 0, 0.02) 0 1px 3px 0";
            btn.style.boxSizing = "border-box";
            btn.style.color = "rgba(0, 0, 0, 0.85)";
            btn.style.cursor = "pointer";
            btn.style.display = "inline-flex";
            btn.style.fontFamily =`system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif`;
            btn.style.fontSize= "16px";
            btn.style.fontWeight = "600";
            btn.style.justifyContent = "center";
            btn.style.lineHeight = "1.25";
            btn.style.margin = "10px";
            btn.style.minHeight = "3rem";
            btn.style.padding = "calc(.875rem - 1px) calc(1.5rem - 1px)";
            btn.style.textDecoration ="none";
            btn.style.transition = "all 250ms";
            btn.style.userSelect = "none";
            btn.style.touchAction = "manipulation";
            btn.style.verticalAlign = "baseline";
            btn.style.width = "auto";
            bookings.appendChild(btn);
        }
        isActive = false;
    }
}


function removeTimes(delPeriod){
    /*Removes childButton from parent class*/
    const childButton = document.getElementById(`btn-${delPeriod-1}`);
    /*Checks whether bookings and childButton are both undefined*/
    if (bookings && childButton) {
        bookings.removeChild(childButton);
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
            let data = {
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


function onclickBtn(selDate){
    let counter = 0;

    const periods = [1,2,3];
    let time = document.getElementsByClassName("selected")[0];

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
            col.style.boxShadow = "rgba(0, 0, 0, 0.1) 0 4px 12px";
            col.style.color = "black";
            col.style.transform="translateY(0px)";
        })
        col.addEventListener("click", function(e) {
            counter ++;
            const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
            const today = new Date();
            var parts =selDate.split(' ');
            var mydate = new Date( parseInt(parts[3]),months[parts[1]]-1, parseInt(parts[2])); 
            if(today.getTime()>mydate.getTime()){
                alert("Select a date that's in the present");
            } else if(counter >1){
                alert("You cannot select a time more than once");
            }else{
                //id: 10, <-- Come back to this later
                let data = {
                    firstname: "Test",
                    lastname: "Test",
                    period:periods[e.target.id[e.target.id.length-1]],
                    date:mydate
                    };
                socket.emit('times', {
                    'data':data
                });
                
            }
        });
    }
}

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
