const { domains } = require("googleapis/build/src/apis/domains");
const { testing } = require("googleapis/build/src/apis/testing");

function clickFunction(clicked_id){
    
    let idVal = String(clicked_id).split("-")
    let times = document.getElementById(`show-times-${idVal[idVal.length-1]}`);
    let text = times.innerText;
    const [,date,,period] = text.split(" ");
    let data = {
        firstname: "Test",
        lastname: "Test",
        period:period,
        date:date
        };
    fetch("http://127.0.0.1:5000/delete", {
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