import * as functions from "firebase-functions";
import { getVideoViews } from "./utils";

interface ReturnHashMap {
  [url: string]: number;
}

export const getViews = async (
  request: functions.https.Request,
  response: functions.Response
) => {
  // Ensure urls array is provided
  const urls: string[] = request.body.urls;
  if (!urls && Array.isArray(urls)) {
    response.statusCode = 400;
    response.send("No URLs array provided");
  }

  // Create array of promises.
  // Each array item is a promise that will retrieve the views
  // from a given YouTube video.
  const promises = urls.map((url: string) => getVideoViews(url));

  // Returns all views after all promises are resolved.
  Promise.all(promises)
    .then(videoData => {
      const returnHash: ReturnHashMap = {};
      videoData.forEach(video => (returnHash[video.url] = video.views));
      response.send(returnHash);
    })
    .catch(err => {
      response.statusCode = 500;
      response.send(err);
    });
};
