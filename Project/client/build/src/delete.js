const { domains } = require("googleapis/build/src/apis/domains");
const { testing } = require("googleapis/build/src/apis/testing");

function clickFunction(clicked_id){
    
    let idVal = String(clicked_id).split("-")
    let times = document.getElementById(`show-times-${idVal[idVal.length-1]}`);
    let text = times.innerText;
    const [,date,,period] = text.split(" ");
    const [year,month,day] = date.split("-");
    
    dateRange = new Date(parseInt(year),parseInt(month),parseInt(day));

    let data = {
        firstname: "Test",
        lastname: "Test",
        period:parseInt(period),
        date: dateRange
        };
    
        
    console.log(data);
    fetch("http://127.0.0.1:5000/del", {
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