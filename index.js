const http = require("http");
const randomstring = require("randomstring");
const port = process.env.PORT || 5000;

function generateEvent() {
  const label = randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  });
  return JSON.stringify({
    timestamp: new Date().getTime(),
    label: label,
    x: Math.floor(Math.random() * 100) + 1,
    y: Math.floor(Math.random() * 100) + 1,
  });
}

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    "Access-Control-Allow-Origin":"*"
  });

  var id = (new Date()).getTime();

  setInterval(function() {
    constructSSE(res, id, generateEvent());
  }, 2000);

  constructSSE(res, id, generateEvent());
}

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

http.createServer((req, res) => {
  sendSSE(req, res);
}).listen(port);
