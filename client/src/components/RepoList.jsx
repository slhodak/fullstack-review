
import React from 'react';

const RepoList = (props) => (
  <div>
    <h4>Repo List Component</h4>
    There are {props.repos.length} repos.
    <table id="repos">
      {props.repos.map((repo, index) => {
        return(
          <tbody key={index}>
            <tr className="repoRow">
              <td><img src={repo.owner.avatar_url}></img></td>
              <td><a href={repo.owner.url}>{repo.owner.login}</a></td>
              <td><a href={repo.url}>{repo.name}</a></td>
              <td>Forks: {repo.forks_count}</td>
              <td>Watchers: {repo.watchers_count}</td>
              <td>Open Issues: {repo.open_issues_count}</td>
            </tr>
          </tbody>
        )
      })}
    </table>
  </div>
)

export default RepoList;