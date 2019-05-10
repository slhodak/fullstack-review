const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
/**TODO your schema here */
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO your code here
  // This function should save a repo or repos to the mondoDB
}

module.exports.save = save;