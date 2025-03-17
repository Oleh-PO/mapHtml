var fs = require('fs');
var express = require('express');
var app = express();
var port = 8080;

// app.use(express.text({ type: 'text/html' }));
// app.get('/', (req, res) => {
//     fs.readFile('inner.html', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//     });
// });
// app.get('/staticmap.png', (req, res) => {
//     fs.readFile('staticmap.png', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'png'});
//         res.write(data);
//         return res.end();
//     });
// });
// app.get('/start', (req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     console.log(req.query.value);
//     return res.end();
// });
app.get('/mTEST.json', (req, res) => {
    fs.readFile('mTEST.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'json'});
        res.write(data);
        return res.end();
    });
});
app.listen(port, () => {
    console.log(`localhost:${port}`);
});