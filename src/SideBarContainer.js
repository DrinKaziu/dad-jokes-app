import React, { Component } from 'react';
import './SideBarContainer.css'

class SideBarContainer extends Component {
  render() {
    return (
      <div className="SideBarContainer"> 
        <h1 className="SideBarContainer-title"><span>Dad</span> Jokes</h1>
        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Smiley Face"/>
        <button className="SideBarContainer-get-more" onClick={this.props.getNewJokes}>Fetch Jokes!</button>
      </div>
    )
  }
}

export default SideBarContainer; 

