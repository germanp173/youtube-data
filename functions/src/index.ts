import * as functions from "firebase-functions";
import { getViews } from "./getViews";

module.exports = {
  getViews: functions.https.onRequest(getViews)
};
