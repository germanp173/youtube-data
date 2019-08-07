import * as functions from "firebase-functions";
import * as rp from "request-promise";
import * as cheerio from "cheerio";

export const GetViews = functions.https.onRequest((request, response) => {
  // Ensure urls array is provided
  if (!request.body.urls) {
    response.statusCode = 400;
    response.send("No URLs provided");
  }

  // Create array of promises.
  // Each array item is a promise that will retrieve the views
  // from a given YouTube video.
  const promises = request.body.urls.map(
    (url: string) =>
      new Promise((resolve, reject) => {
        const options = {
          uri: url,
          transform: (body: string) => {
            return cheerio.load(body);
          }
        };

        rp(options)
          .then($ => {
            const views = $(".watch-view-count")[0].children[0].data || "-999";
            resolve({
              url,
              views: parseInt(views.replace(/,/g, "")) // Remove commas from view count and parse it
            });
          })
          .catch(err => reject(err));
      })
  );

  // Returns all views after all promises are resolved.
  Promise.all(promises)
    .then(views => response.send(views))
    .catch(err => {
      response.statusCode = 500;
      response.send(err);
    });
});
