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
      createRepoRecords(extractedData, err => {
        if (err) {
          console.log('Error inserting or updating values');
          res.status(500);
          res.end();
        } else {
          console.log('Inserted or updated all values');
          res.status(200);
          res.end();
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // mongo.readAll((err, docs) => {
  //   if (err) {
  //     console.log('error retrieving records: ' + err);
  //     res.statusCode(500);
  //     res.end();
  //   } else {
  //     res.send(docs);
  //   }
  // });
  extractTopTwentyFive((err, repos) => {
    if (err) {
      console.log('Error extracting top twenty five');
      res.status(500);
      res.end();
    } else {
      console.log('Extracted top twenty five repos');
      res.status(200);
      res.send(repos);
    }
  });
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

let createRepoRecords = (repos, callback) => {
  mongo.save(repos, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

//// VIEW METHODS (OUTGOING DATA ALTERS VIEW) ////

let extractTopTwentyFive = (callback) => {
  mongo.readAll((err, data) => {
    if (err) {
      callback(err);
    } else {
      data.sort((a, b) => {
        var aRating = rateRepo(a);
        var bRating = rateRepo(b);
        console.log('A rating: ' + aRating + ' B: rating ' + bRating);
        return bRating - aRating;
      });
      console.log('Got sorted list: ' + data);
      callback(null, data.slice(0, 25));
    }
  });
}

let rateRepo = (repo) => {
  return repo.watchers_count + repo.forks_count;
}

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});