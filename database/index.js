const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  // connected!
});

let repoSchema = mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  url: String,
  owner: {
    login: String,
    url: String,
    avatar_url: String
  },
  watchers_count: Number,
  forks_count: Number,
  open_issues_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback, index = 0) => {
  if (index < repos.length) {
    Repo.findOneAndUpdate({id: repos[index].id}, repos[index], {upsert: true},
      function(err, doc) {
        if (err) {
          callback(err);
        }
        console.log('upserting a record');
        save(repos, callback, index + 1);
      });
  } else {
    callback();
  }
};

let readAll = (callback) => {
  Repo.find()
    .then(docs => {
      callback(null, docs);
    })
    .catch(err => {
      callback(err);
    });
};

module.exports.readAll = readAll;
module.exports.save = save;