const express = require("express");
const { write } = require("fs");
const app = express()
const https = require('https');
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")



});

app.post("/", function (req, res) {
    // console.log(req.body.cityName)
    const query = req.body.cityName
    const apiKey = "3970d7d474b0f13604a947fb02f9809e"
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units
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
            res.write('<h1>The Temperature in ' + query + ' is ' + temp + ' degrees fahrenheit</h1>')
            res.write("<img  src=" + imageURL + ">")
            res.send();

        })

    })
})




app.listen(3000, () => console.log("Server is running on port 3000"))