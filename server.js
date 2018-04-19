//required imports 
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
let app = express();

let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

//returning the date values parsed in JSON
app.get('/datevalues/:dateParam',function(request,response){
    let dateParam = request.params.dateParam;
    let momentDate = moment(dateParam);
    if(!isNaN(dateParam)){
        let unixToNormal = new Date(dateParam * 1000);
        let month = monthNames[unixToNormal.getMonth() +1];
        let day = unixToNormal.getDate();
        let year = unixToNormal.getFullYear();
        let dateStr = month + " " + day + ", " + year;
        console.log(dateStr);
        response.json({"unix":Number(dateParam),"natural": dateStr });
    }
    if(momentDate.isValid() && isNaN(dateParam)){
        let unixFromNormal = new Date(dateParam).getTime() / 1000;
        response.json({"unix":unixFromNormal,"natural":dateParam})
    }
    else{
        response.json({"unix":null,"natural":null});
    }
});
//server listening on port 3000
app.listen(3000,function(){
    console.log("server working");
})