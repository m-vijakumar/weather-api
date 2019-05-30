const express =require("express");
const app =express();
const ejs=require("ejs")
const axios =require("axios");
const cityobj = require("./routers/cities");
console.log(cityobj[1]);
var OAuth = require('oauth');
const request = require('request'); 
const bodyparser =require("body-parser");
const port = process.env.PORT ||5000;
var argv = require('yargs').argv;

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get("/",(req,res)=>{

    res.render("index",{
        city: cityobj
    });
})

app.get("/weather-api",(req,res)=>{
    var wresult=[];
    var city =req.query.city;
    console.log(city);
var header = {
    "X-Yahoo-App-Id": "J93MaN3e"
};
var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9V05wZXR2YnA5NnV0JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYx',
    '50de119600b96dc7d82f402ce38222ca96077d7b',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city},india&format=json`,
    null,
    null,
    function (err, data, result) {
        if (err) {
            res.render("error")
        } else {
            try{
            var result =JSON.parse(data);
            console.log(JSON.parse(data));
            wresult.push(result.location.city);
           let con =(( result.forecasts[0].high - 32)*5)/9;
            wresult.push(Math.round(con));
            con =(( result.forecasts[0].low - 32)*5)/9;
            
            wresult.push(Math.round(con));
            wresult.push(result.forecasts[0].text)

           console.log(wresult[0]);
           console.log(wresult[1]);
           console.log(wresult[2]);
           console.log(wresult[3]);

           res.render("weather",{

            city:wresult[0],
            max:wresult[1],
            min:wresult[2],
            weather:wresult[3]
        })


    }catch(error){

        res.render("error")
    }
        
    }

    });


});



app.listen(port,console.log("server is running........."));