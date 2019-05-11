import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }
  search(term) {
    fetch('http://127.0.0.1:1128/repos', {
      method: 'POST',
      body: term
    })
    .then(res => {
      this.getResults();
    })
    .catch(err => {
      this.getResults();
      console.log(err);
    });
    console.log(`${term} was searched`);
  }
  getResults() {
    fetch('http://127.0.0.1:1128/repos', {
      method: 'GET'
    })
    .then(res => {
      res.json().then(data => {
        this.updateReposInState(data);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  updateReposInState(newRepos) {
    console.log('updating repos in state with ' + newRepos);
    this.setState({
      repos: newRepos
    }, () => console.log(this.state.repos));
  }
  render() {
    return(
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));