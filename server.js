const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(express.text({ type: 'text/html' }));

let mapData;

app.get('/', (req, res) => {
  let editor;
  fs.readFile('html/editor.html', function(err, data) {
    editor = data;
  });
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(editor + data);
    return res.end();
  });
});
app.post('/getMap', (req, res) => {
  mapData = req.body;
  res.writeHead(200);
  res.end();
});
app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
  console.log(`localhost:${port}`);
});