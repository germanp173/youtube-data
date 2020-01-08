import { getVideoViews } from "./functions/src/utils";

const goodScrape = "https://www.youtube.com/watch?v=F81cLjRY4to";
const badScrape = "https://www.youtube.com/watch?v=JvJ3bsgU0uA&t=78s";

const printViews = async () => {
  const testUrl = badScrape;
  const views = await getVideoViews(testUrl);

  console.log(views);
};

printViews();
