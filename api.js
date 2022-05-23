const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
async function scrapeData() {
  try {
    const url =
      "https://www.springerprofessional.de/wasserwirtschaft-4-2019/16592584";
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const contents = [];

    const editionAndJahr = $(".issue-title").text().split(" ")[1];
    const edition = editionAndJahr.split("/")[0];
    const year = editionAndJahr.split("/")[1];
    
    // <h1 class="issue-title">Ausgabe 4/2019</h1>;

    const listItems = $(".teaser.cf");

    

    listItems.each((id, el) => {
      
      const data = {
        edition: edition,
        date: "",
        year: year,
        category:"",
        title: "",
        author:"",
        url: "",
      };
       
      
      data.date = $(el).children("p").text().trim().split(" | ")[0];
      data.category = $(el).children("p").text().trim().split(" | ")[1];
      data.title = $(el).children("a").text().trim();
      data.author = $(el).children("div").text().trim();
      data.url =
        "https://www.springerprofessional.de" +
        $(el).children("a").attr("href");

      contents.push(data);
    });

    return contents;
  } catch (err) {
    console.error(err);
  }
}


app.get("/api", async function (req, res) {
  const result = await scrapeData(); 
  
    res.send(result);
});

app.listen(4000,()=> console.log("Server started on http://localhost:4000") );
