async function handlerFunction(event, ctx) {
  return {
    statusCode: 302,
    headers: {
        "Location": "https://google.com"
    }
  }
}

exports.handler = handlerFunction;