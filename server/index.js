const express = require('express');
let app = express();

app.use(express.static(__dirname, '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO -- your code here!
  // this route should take the github username and password
  // and get the repo information from the github api, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // this route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});