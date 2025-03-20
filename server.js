const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const decoder = new TextDecoder();
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(express.text({ type: 'text/html' }));

let mapData;
let test;


app.get('/', (req, res) => {
  fs.readFile('index.html', function(err, data) { //starting server
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.post('/getMap', (req, res) => {
  res.writeHead(200);
  res.end();
  mapData = req.body;
  // fs.writeFileSync("json/input.json", JSON.stringify(mapData));
  fetch(mapData.src).then((response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.arrayBuffer())
    .then((Buf) => Buffer.from(Buf, 'base64')) //make boffer for fs
    .then((decode) => fs.writeFile("content/staticmap.png", decode, function (err) {}))
});

app.use(express.static(path.join(__dirname)));


app.listen(port, () => {
  console.log(`localhost:${port}`);
});