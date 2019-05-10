const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  // connected!
});

let repoSchema = mongoose.Schema({
  name: String,
  url: String,
  owner: {
    login: String,
    url: String,
    avatar_url: String
  },
  watchers: Number,
  forks: Number,
  open_issues: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO your code here
  // This function should save a repo or repos to the mondoDB
}

module.exports.save = save;