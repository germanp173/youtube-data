import { getVideoViews } from "./functions/src/utils";

const printViews = async () => {
  const testUrl = "https://www.youtube.com/watch?v=F81cLjRY4to";
  const views = await getVideoViews(testUrl);

  console.log(views);
};

printViews();
