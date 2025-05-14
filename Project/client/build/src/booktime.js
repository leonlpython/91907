
const times = document.querySelectorAll(".book-btn");
let bookings = document.getElementById("button-content");
const periods = ["Period 1", "Period 2", "Period 3"];
const time = document.getElementsByClassName("selected")[0];

for (let i = 0; i < 3;i++){
    let btn = document.createElement("button");
    btn.className = "book-btn";
    btn.id = `btn-${i}`;
    btn.textContent = periods[i];
    bookings.appendChild(btn);
}

var buttons = document.querySelectorAll(".book-btn");
for (let col of buttons){
    col.addEventListener("click", function(e) {
        const value = sessionStorage.getItem("chosenDate");
        alert(`You have selected ${periods[e.target.id[e.target.id.length-1]]} at ${value}`);
        $.ajax({
            url: '/process',
            type: 'POST',
            data: { 'data': value },
            success: function(response) {
                document.getElementById('output').innerHTML = response;
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    });
}

