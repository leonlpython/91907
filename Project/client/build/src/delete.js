const { domains } = require("googleapis/build/src/apis/domains");
const { testing } = require("googleapis/build/src/apis/testing");

function clickFunction(clicked_id){
    
    let idVal = String(clicked_id).split("-")
    let times = document.getElementById(`show-times-${idVal[idVal.length-1]}`);
    let text = times.innerText;
    const [,date,,period] = text.split(" ");
    const [year,month,day] = date.split("-");
    const months = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}
    dateRange = new String ("bummer "+months[parseInt(month)]+" "+parseInt(day)+" "+parseInt(year));

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