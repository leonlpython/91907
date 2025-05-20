
const times = document.querySelectorAll(".book-btn");
let bookings = document.getElementById("button-content");
const periods = [1,2,3];
const time = document.getElementsByClassName("selected")[0];

for (let i = 0; i < 3;i++){
    let btn = document.createElement("button");
    btn.className = "book-btn";
    btn.id = `btn-${i}`;
    btn.textContent = `Period ${periods[i]}`;
    bookings.appendChild(btn);
}

var buttons = document.querySelectorAll(".book-btn");
for (let col of buttons){
    col.addEventListener("click", function(e) {
        const days = {"Mon":1,"Tue":2,"Wed":3,"Thu":4,"Fri":5,"Sat":6,"Sun":7}
        const months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
        const value = sessionStorage.getItem("chosenDate");
        const today = new Date();
        
        var parts =value.split(' ');
        var mydate = new Date( parseInt(parts[3]),months[parts[1]]-1, parseInt(parts[2])); 

        if(today.getTime()>mydate.getTime()){
            alert("Select a date that's in the present")
        }
        else{
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

