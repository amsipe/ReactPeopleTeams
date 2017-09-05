import React, { Component } from 'react';
import PendingPeople from './PendingPeople.js';
import Teams from './Teams.js';
import PEOPLE from './PeopleList.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: PEOPLE
    }
    this.handleAssign = this.handleAssign.bind(this);
  }
  handleAssign () {
    console.log('hello')
    console.log(this.state)
  }
  render() {
    
    return (
      <div className="App">
        <PendingPeople initialPeople={PEOPLE} onPersonAssign={this.handleAssign} />
        <Teams/>
      </div>
    );
  }
}

export default App;
