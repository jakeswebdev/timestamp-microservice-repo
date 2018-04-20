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

//declaring the directory in which we request a date and return the date values parsed in JSON
app.get('/datevalues/:dateParam',function(request,response){
    let jsonObj = {};
    let dateParam = request.params.dateParam;
    let momentDate = moment(dateParam);

    if(!isNaN(dateParam)){
        let momentUnix = moment.unix(dateParam).utc();
        let momentMonth = momentUnix.month();
        let momentDay = momentUnix.date();
        let momentYear = momentUnix.year(); 
        console.log(momentUnix);
        let month = monthNames[momentMonth];
        let dateStr = month + " " + momentDay + ", " + momentYear;
        console.log(dateStr);
        jsonObj = {"unix":Number(dateParam),"natural": dateStr };
    }
    else if(momentDate.isValid() && isNaN(dateParam)){
        let unixFromNormal = new Date(dateParam).getTime() / 1000;
        jsonObj = {"unix":unixFromNormal,"natural":dateParam};
    }
    else{
        jsonObj = {"unix":null,"natural":null};
    }

    response.json(jsonObj);
});
//server listening on port 3000
app.listen(3000,function(){
    console.log("server working");
})