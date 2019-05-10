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
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  Repo.insertMany(data)
    .then(docs => {
      console.log('successful insert');
    })
    .catch(err => {
      console.log(err);
    });
};

let readAll = (callback) => {
  Repo.find({})
    .then(docs => {
      callback(null, docs);
    })
    .catch(err => {
      callback(err);
    });
};

module.exports.readAll = readAll;
module.exports.save = save;