let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");


const times = document.querySelectorAll(".book-btn");
let bookings = document.getElementById("button-content");
const periods = [1,2,3];
let time = document.getElementsByClassName("selected")[0];
let value = sessionStorage.getItem("chosenDate");


let date = new Date();

let year = date.getFullYear();
let month = date.getMonth();

function createBtns(value){
    let activeTimes = sessionStorage.getItem("activeTimes");
    
    const days = {"Mon":1,"Tue":2,"Wed":3,"Thu":4,"Fri":5,"Sat":6,"Sun":7}
    const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
    var parts =value.split(' ');

    const curr = months[parts[1]]
    let month = curr.toString()
    if (months[parts[1]]+1 < 10){
        month ="0"+curr
    }
    let stringDate = parts[3]+"-"+month+"-"+parts[2];
    let isActive = false;
    let sessionTimes = [];
    const dummy = activeTimes.split(",");
    let arr = [];
    for (let j = 0;j<dummy.length;j++){
        if(j%2 == 0){
            arr.push(dummy[j].slice(6,16));
        }else{    
            arr.push(dummy[j][1]);
            sessionTimes.push(arr);
            arr = [];
        }
    }
    bookings.replaceChildren();
    
    for(let i = 0;i<3;i++){
        for(let idx = 0;idx < sessionTimes.length;idx++){
            if (sessionTimes[idx][0] == stringDate && parseInt(sessionTimes[idx][1]) == i+1){
                isActive = true;
            }
        }
        if (isActive == false){
            var btn = document.createElement("button");
            btn.className = "book-btn";
            btn.id = `btn-${i}`;
            btn.textContent = `Period ${periods[i]}`;

            btn.style.height = '150px';
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
            btn.style.margin = "0";
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



function displayCalendar() {
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
    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      div.classList.add("current-date");
    }
  }
}

function displaySelected() {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => {
    day.addEventListener("click", (e) => {
        let selectedDate = e.target.dataset.date;
        selected.innerHTML = `Selected Date : ${selectedDate}`;
        sessionStorage.setItem("chosenDate", selectedDate);
        createBtns(selectedDate);
        onclickBtn(selectedDate);
        return selectedDate;
    });
  });
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

//module.exports = displaySelected;  








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
            col.style.color = "rgba(0, 0, 0, 0.65)";
            col.style.transform="translateY(0px)";
        })
        col.addEventListener("click", function(e) {
            counter ++;
            const days = {"Mon":1,"Tue":2,"Wed":3,"Thu":4,"Fri":5,"Sat":6,"Sun":7}
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
                    date:value
                    };
                fetch("http://127.0.0.1:5000/receive", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({data})
                })
                .then(response => response.text())
                .then(result => {
                    console.log("Server says:", result);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }
        });
    }
}


/*

/*
<!-- HTML !-->

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
*/
