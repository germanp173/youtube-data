const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.youtube.com/watch?v=F81cLjRY4to").then(response => {
  const $ = cheerio.load(response.data);
  const views = $(".watch-view-count")[0].children[0].data;

  console.log(views);
});
