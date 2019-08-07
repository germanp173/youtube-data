import * as functions from "firebase-functions";
import * as cheerio from "cheerio";
import axios from "axios";

export const GetViews = functions.https.onRequest((request, response) => {
  console.log(JSON.stringify(request.body));
  axios
    .get("https://www.youtube.com/watch?v=F81cLjRY4to")
    .then(res => {
      const $ = cheerio.load(res.data);
      const views = $(".watch-view-count")[0].children[0].data;

      console.log(views);
      response.send(views);
    })
    .catch(err => console.log(err));
});
