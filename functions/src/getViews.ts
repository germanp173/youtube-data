import * as functions from "firebase-functions";
import { getVideoViews } from "./utils";

interface ReturnHashMap {
  [url: string]: number;
}

export const getViews = async (
  request: functions.https.Request,
  response: functions.Response
) => {

  console.log("Starting here!");

  // Ensure urls array is provided
  const urls: string[] = request.body.urls;

  console.log("urls: ", urls);

  if (!urls && Array.isArray(urls)) {
    response.statusCode = 400;
    response.send("No URLs array provided");
    return;
  }

  console.log("Starting promise map");

  // Create array of promises.
  // Each array item is a promise that will retrieve the views
  // from a given YouTube video.
  const promises = urls.map((url: string) => getVideoViews(url));

  // Returns all views after all promises are resolved.
  try {
    console.log("Invoking all promises");
    const videoData = await Promise.all(promises);
    console.log("Done with all promises");
    const returnHash: ReturnHashMap = {};

    videoData.forEach(video => (returnHash[video.url] = video.views));
    response.statusCode = 200;
    response.send(returnHash);
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.send("ERROR: " + error);
  }
};
