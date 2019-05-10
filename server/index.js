const express = require('express');
var githubHelper = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('Handling POST request to /repos');
  githubHelper.getReposByUsername('slhodak', (err, res, body) => {
    if (err) {
      console.log('error:', err);
    } else {
      console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
      // console.log(JSON.parse(body));
      extractRepoData(JSON.parse(body));
    }
  });
  // TODO -- your code here!
  // this route should take the github username and password
  // and get the repo information from the github api, then
  // save the repo information in the database
  res.send({a:'hi'});
});

app.get('/repos', function (req, res) {
  // this route should send back the top 25 repos
  // get all repos from database
  // rank them
  // send back the top 25
  res.send(JSON.stringify({a:'hi'}));
});

// let rankingAlgorithm = (repos) => {

// }

let extractRepoData = (repos) => {
  let data = [];
  repos.forEach(repo => {
    let repoData = {};
    repoData.name = repo.name;
    repoData.owner = {};
    repoData.owner.login = repo.owner.login;
    repoData.owner.url = repo.owner.url;
    repoData.owner.avatar_url = repo.owner.avatar_url;
    repoData.url = repo.name;
    repoData.watchers = repo.name;
    repoData.forks = repo.name;
    repoData.open_issues = repo.name;
    data.push(repoData);
  });
  console.log(data);
};

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});