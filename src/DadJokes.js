import React, { Component } from 'react';
import './DadJokes.css';
import JokeList from './JokeList';
import SideBarContainer from './SideBarContainer';
import axios from 'axios';
import uuid from 'uuid/v4';
const API_URL = 'https://icanhazdadjoke.com/'; 

class DadJokes extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
    }

    this.seenJokes = new Set(this.state.jokes.map(j => j.joke));
    this.getJokes = this.getJokes.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes()
  }

  async getJokes() {
    try {
      let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
          const res = await axios.get(API_URL, {
            headers: { Accept: 'application/json'}
          })

          if (!this.seenJokes.has(res.data.joke)) {
            jokes.push({ joke: res.data.joke, id: uuid(), votes: 0 })
          } else {
            console.log('Duplicata: ', res.data.joke)
          }
          
        }

        this.setState(st => ({jokes: [ ...st.jokes, ...jokes]}), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    } catch(e) {
      alert(e);
    }
  }

  handleVotes = (id, delta) => {
    this.setState(st => ({
      jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta} : j)
    }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
  }

  render() {
    return (
      <div className="DadJokes">
        <SideBarContainer getNewJokes={this.getJokes}/>
        <JokeList 
          jokes={this.state.jokes} 
          handleVotes={this.handleVotes}
        />
      </div>
    )
  }
}

export default DadJokes; 
