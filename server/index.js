const express = require('express');
var githubHelper = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  githubHelper.getReposByUsername('slhodak', (err, res, body) => {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
    console.log('body:', body); 
  });
  // TODO -- your code here!
  // this route should take the github username and password
  // and get the repo information from the github api, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // this route should send back the top 25 repos
  // get all repos from database
  // rank them
  // send back the top 25
});

let rankingAlgorithm = (repos) => {

}

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});