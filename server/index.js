const express = require('express');
const bodyParser = require('body-parser');
var githubHelper = require('../helpers/github.js');
var mongo = require('../database/index.js');

let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('Handling POST request to /repos');
  githubHelper.getReposByUsername('slhodak', (error, response, body) => {
    if (error) {
      res.send({error});
    } else {
      console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
      let data = extractRepoData(JSON.parse(body));
      createRepoRecords(data);
      res.end();
    }
  });
});

app.get('/repos', function (req, res) {
  // this route should send back the top 25 repos
  // get all repos from database
  mongo.readAll((err, docs) => {
    if (err) {
      res.status(500);
      console.log(err);
      res.send(`database read error: ${err}`);
    } else {
      res.status(200);
      res.set('Message', 'Successful read');
      res.send(JSON.stringify(docs));
    }
  });
  // rank them
  // send back the top 25
});

// let rankingAlgorithm = (repos) => {

// }

let extractRepoData = (repos) => {
  let data = [];
  repos.forEach(repo => {
    let repoData = {};
    repoData.id = repo.id;
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
  return data;
};

let createRepoRecords = (data) => {
  //  create or update records in mongoDB for all repos in data
  mongo.save(data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});