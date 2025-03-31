const excersises = [
    "Excersise 1",
    "Excersise 2",
    "Excersise 3",
    "Excersise 4",
    "Excersise 5",
    "Excersise 6",
    "Excersise 7",
    "Excersise 8",
    "Excersise 9",
    "Excersise 10",
    "Excersise 11",
    "Excersise 12"
];
const dis = document.getElementById("popup-item");

function disFunction() {
    var inner_text = document.getElementById("")
    if (inner_text.style.display === "none") {
        inner_text.style.display = "block";
      } else {
        inner_text.style.display = "none";
      }
}

const show = () => {
    let popup = ""; 
    for (let i = 0; i < excersises.length; i++) {
        //for (let j = 0; j<5;j++){
            popup +=
            `<button onclick="disFunction()" class = "grid-items" style = "width: 33%;
  padding: 5% 5%;
  text-align: center;
  margin: 10;
  background-color: lightblue;"> ${excersises[i]} Show or Hide Exsercise</button>`;
        //}
    }
    dis.innerHTML = popup;
}

show();