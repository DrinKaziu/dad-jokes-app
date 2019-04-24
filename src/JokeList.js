import React, { Component } from 'react';
import './JokeList.css';
import Joke from './Joke';

class JokeList extends Component {

  render() {
    const jokes = this.props.jokes.map(j => (
      <Joke 
        key={j.id} 
        joke={j.joke} 
        votes={j.votes} 
        upVote={() => this.props.handleVotes(j.id, 1)}
        downVote={() => this.props.handleVotes(j.id, -1)}
      />
    ))
    return (
      <div className="JokeList">
        <div>
          {jokes}
        </div>
      </div>
    )
  }
}

export default JokeList;
