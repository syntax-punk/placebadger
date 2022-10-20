const playwright = require("playwright-aws-lambda");

const getUrl = () => {
  const badgerPath = "https://gorgeous-genie-fdd533.netlify.app/badger";

  // const {
  //   cardpath = "https://gorgeous-genie-fdd533.netlify.app",
  //   title = "No Title",
  //   handle = "",
  //   tags = "", 
  //   width = 1200,
  //   height = 630,
  // } = queryStringParameters;
  // return `${cardpath}?title=${title}&handle=${handle}&tags=${tags}&width=${width}&height=${height}`
  return badgerPath;
};

function delay(millis) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, millis)
  });
}

async function handlerFunction(event, ctx) {

  const badgerPath = getUrl(); 

  const browser = await playwright.launchChromium();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(badgerPath);
  await delay(1000);

  const bbox = await page.evaluate(() => {
    const badgerImg = document.getElementById("badger");
    const { x, y, width, height } = badgerImg.getBoundingClientRect();
    return { x, y, width, height };
  });

  const badgerBuffer = await page.screenshot({ clip: bbox });
  await browser.close();

  // return {
  //   statusCode: 302,
  //   headers: {
  //       "Location": "https://gorgeous-genie-fdd533.netlify.app/badger"
  //   }
  // }

  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/jpg",
      "Content-Length": badgerBuffer.length.toString()
    },
    body: badgerBuffer.toString("base64")
  }
}

exports.handler = handlerFunction;