const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
  
  const query = req.body.cityName;
  const APIKEY = "4c15d692b15d73488c4710b5962be7da";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIKEY}&units=${unit}`;
  https.get(url, (response) => {
    
    if(response.statusCode!=404){
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      res.write(`<p>The weather is currently ${weatherDescription}</p>`)
      res.write(`<h1>The Temperature in ${query} is ${temp} Degrees celcius</h1>`);
      res.write(`<img src=${imageURL}>`);
    })}
    else{
      res.write('<h1>404 error</h1>');
      res.write('<h1>Wrong City</h1>');
    }
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000');
}
)