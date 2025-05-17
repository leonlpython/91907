
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
        const value = sessionStorage.getItem("chosenDate");
        alert(`You have selected Period ${periods[e.target.id[e.target.id.length-1]]} at ${value}`);
        

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


    });
}

