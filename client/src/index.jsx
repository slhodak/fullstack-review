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
  }
  search(term) {
    fetch('http://127.0.0.1:1128/repos', {
      method: 'POST'
    })
    .then(response => {
      response.json().then(res => {
        console.log(res);
      });
    })
    .catch(err => {
      console.log(err);
    });
    console.log(`${term} was searched`);
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