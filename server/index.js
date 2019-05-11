const express = require('express');
const bodyParser = require('body-parser');
var githubHelper = require('../helpers/github.js');
var mongo = require('../database/index.js');

let app = express();

app.use(bodyParser.text());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  githubHelper.getReposByUsername(req.body, (error, response, body) => {
    if (response.statusCode !== 200) {
      res.send(body.message);
    } else {
      console.log('Github statusCode:', response.statusCode);
      let extractedData = extractRepoData(JSON.parse(body));
      createRepoRecords(extractedData);
      res.end();
    }
  });
});

app.get('/repos', function (req, res) {
  res.send(JSON.stringify(extractTopTwentyFive()));
});


//// MODEL METHODS (INCOMING DATA ALTERS MODEL) ////

let extractRepoData = (repos) => {
  let filteredRepos = [];
  repos.forEach(repo => {
    let repoData = {};
    repoData.id = repo.id;
    repoData.name = repo.name;
    repoData.owner = {};
    repoData.owner.login = repo.owner.login;
    repoData.owner.url = repo.owner.url;
    repoData.owner.avatar_url = repo.owner.avatar_url;
    repoData.url = repo.url;
    repoData.watchers_count = repo.watchers_count;
    repoData.forks_count = repo.forks;
    repoData.open_issues = repo.open_issues;
    filteredRepos.push(repoData);
  });
  return filteredRepos;
};

let createRepoRecords = (repos) => {
  mongo.save(repos, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted or updated all values');
    }
  });
};

//// VIEW METHODS (OUTGOING DATA ALTERS VIEW) ////

let extractTopTwentyFive = () => {
  mongo.readAll((err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.sort((a, b) => {
        rateRepo(b) - rateRepo(a);
      });
      console.log('extracting');
      return data.slice(0, 25);
    }
  });
}

let rateRepo = (repo) => {
  return repo.watchers_count + repo.forks_count - repo.open_issues;
}

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});