const express = require("express");
const { write } = require("fs");

const app = express()

const https = require('https');



app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=3970d7d474b0f13604a947fb02f9809e&units=imperial"
    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.feels_like;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write('<h1>The weather is curretnly ' + description + '.</h1>')
            res.write('<h1>The Temperature in Long is ' + temp + ' degrees fahrenheit</h1>')
            res.write("<img  src=" + imageURL + ">")
            res.send();

        })
    })


    // res.send("Server is up and running")
})




app.listen(3000, () => console.log("Server is running on port 3000"))