//required imports 
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
let app = express();

//returning the date values parsed in JSON
app.get('/datevalues/:dateParam',function(request,response){
    let dateParam = request.params.dateParam;
    let momentDate = moment(dateParam);
    let isItUnix = false;
    if(!isNaN(dateParam)){
        isItUnix = true;
        var unixToNormal = new Date(dateParam * 1000);
        console.log(unixToNormal + "this is unix");
        response.json({"unix":dateParam,"natural": unixToNormal});
    }
    if(momentDate.isValid() && isNaN(dateParam)){
        
        let unixFromNormal = new Date(dateParam).getTime() / 1000;
        response.json({"unix":unixFromNormal,"natural":dateParam})
        
    }
    else{
        response.write("Please enter a valid date");
    }
    console.log("thi is the date parameter:" + dateParam);

    response.send(console.log("this is the datevalues directory"));
});

//server listening on port 3000
app.listen(3000,function(){
    console.log("server working");
})