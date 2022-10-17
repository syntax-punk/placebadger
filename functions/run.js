async function handlerFunction(event, ctx) {

  return {
    statusCode: 302,
    headers: {
        "Location": "https://gorgeous-genie-fdd533.netlify.app/badger"
    }
  }
}

exports.handler = handlerFunction;