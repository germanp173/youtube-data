import * as rp from "request-promise";
import * as cheerio from "cheerio";

export interface VideoViews {
  url: string;
  views: number;
}

export const getVideoViews = (url: string) =>
  new Promise<VideoViews>((resolve, reject) => {
    const options = {
      uri: url,
      transform: (body: string) => {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($: any) => {
        const views = $(".watch-view-count")[0]?.children[0]?.data || "-999999";
        resolve({
          url,
          views: parseInt(views.replace(/,/g, "")) // Remove commas from view count and parse it
        });
      })
      .catch((err: any) => reject(err));
  });
