import React, { Component } from 'react';
import PendingPeople from './PendingPeople.js';
import Teams from './Teams.js';
import PEOPLE from './PeopleList.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: [...PEOPLE],
      teamOne: [],
      teamTwo: []
    }
    this.handleAssign = this.handleAssign.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }
  handleAssign (person,team) {
    
    if(team === "teamOne"){
      person.team = "one";
      this.state.teamOne.push(person);
    }else {
      person.team = "two";
      this.state.teamTwo.push(person);
    }

    const newPeople = this.state.people.filter(function(per){
      return per !== person;
      
    });
    this.setState({
      people: [...newPeople]
    });
  }

  handleRemove(person){
    
    let newTeamOne = this.state.teamOne;
    let newTeamTwo = this.state.teamTwo;
    if(person.team === "one"){
     
      newTeamOne = newTeamOne.filter(function(member){
        return member !== person;
      })
    }else {
      newTeamTwo = newTeamTwo.filter(function(member){
        return member !== person;
      })
    }
    person.team = "";
    this.state.people.push(person);
    this.setState({
      people: this.state.people,
      teamOne: [...newTeamOne],
      teamTwo: [...newTeamTwo]
    });
  }

  handleSwitch(person){
    let newTeamOne = this.state.teamOne;
    let newTeamTwo = this.state.teamTwo;

    if(person.team === "one"){
      person.team = "two";
      
      newTeamOne = newTeamOne.filter(function(member){
        return member !== person;
      })
      newTeamTwo.push(person);
      
      this.setState({
        teamTwo: [...newTeamTwo],
        teamOne: [...newTeamOne]
        
      })
    } else if (person.team === "two"){
      person.team = "one";
      newTeamOne.push(person);
      newTeamTwo = newTeamTwo.filter(function(member){
        return member !== person;
      })

      this.setState({
        teamOne: [...newTeamOne],
        teamTwo: [...newTeamTwo]
      })
    }
  }

  handleDragEnter (e) {
    e.preventDefault();
    console.log(e.currentTarget);
  }
  handleDragDrop (e) {
    e.preventDefault();
    console.log("hotdog");
    console.log(e);

  }
  handleDragStart (e){
    console.log(e.currentTarget.dataset.id);
  }
  render() {
    
    return (
      <div className="App">

        <div className="container-pending">
          <table className="assign-table">
            <tbody>
              <tr>
                <th>Name</th>
                <th colSpan="2">Assign a Team</th>
              </tr>
              {this.state.people.map(function(person,index){

                return (
                    <PendingPeople key={index} person={person} index={index} onPersonAssign={this.handleAssign}/>
                )
              }.bind(this))}  
            </tbody>
          </table>

        </div>
        <div data-id="one" className="container-team" >
          <div className="team-list float-left">
              <p>Team One</p>
                {this.state.teamOne.map(function(person,index){
                  return (
                    <Teams key={index}
                     dataId={index} 
                     dataTeam={"one"} 
                     teamMember={person} 
                     onStartDrag={this.handleDragStart} 
                     onEnterDrag={this.handleDragEnter} 
                     onSwitchTeam={this.handleSwitch} 
                     onRemove={this.handleRemove}/>
                  )
                }.bind(this))}
          </div>
          <div className="team-list float-right" onDrop={this.handleDragDrop}>
              <p>Team Two</p>
              {this.state.teamTwo.map(function(person,index){
                return (
                  <Teams key={index} 
                  dataId={index} 
                  dataTeam={"two"} 
                  teamMember={person} 
                  onStartDrag={this.handleDragStart} 
                  onEnterDrag={this.handleDragEnter} 
                  onSwitchTeam={this.handleSwitch} 
                  onRemove={this.handleRemove}/>
                )
              }.bind(this))}
          </div>
      </div>
      </div>
    );
  }
}

export default App;
