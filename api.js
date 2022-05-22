const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const url =
      "https://www.springerprofessional.de/wasserwirtschaft-4-2019/16592584";
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".teaser.cf");
    //console.log(listItems)

    // Stores data for all countries
    const countries = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const data = { title: "", date: "", url: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      data.title = $(el).children("a").text().trim();
      data.date = $(el).children("p").text().trim();
      data.url = $(el).children("a").attr("href");

      // Populate countries array with country data
      countries.push(data);
    });
    // Logs countries array to the console
    //console.dir(countries);
    return countries;
    // Write countries array in countries.json file
  } catch (err) {
    console.error(err);
  }
}


app.get("/", async function (req, res) {
  const result = await scrapeData(); 
  
    res.send("result");
});

app.listen(4000,()=> console.log("Server started on http://localhost:4000") );
