import * as functions from "firebase-functions";
import { getViews } from "./getViews";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "2GB"
}

module.exports = {
  getViews: functions.runWith(runtimeOpts).https.onRequest(getViews)
};
