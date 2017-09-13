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
      teamTwo: [],
      message: "Testing"
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
    let newPeopleState = this.state.people;
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
    newPeopleState.push(person);
    this.setState({
      people: [...newPeopleState],
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
    e.dataTransfer.effectAllowed = "move";
    console.log(e.dataTransfer);
    //console.log(e.currentTarget);
  }
  handleDragDrop (e) {

    const draggedItem = this.draggedItem.dataset;
    let newPeopleState = this.state.people;
    let newTeamOne = this.state.teamOne;
    let newTeamTwo = this.state.teamTwo;

    if(e.target.dataset.team === "two"){
      let newPerson = newTeamOne[draggedItem.id];
      newPerson.team = "two";
      newTeamTwo.push(newTeamOne[draggedItem.id]);
      newTeamOne.splice(draggedItem.id,1);
      this.setState({
        teamOne: [...newTeamOne],
        teamTwo: [...newTeamTwo]
      })
      
     } else if (e.target.dataset.team === "one"){
      let newPerson = newTeamTwo[draggedItem.id];
      newPerson.team = "one";
      newTeamOne.push(newPerson);
      newTeamTwo.splice(draggedItem.id,1);
      this.setState({
        teamOne: [...newTeamOne],
        teamTwo: [...newTeamTwo]
      })
     } else if (e.target.dataset.team === "none"){
        console.log(draggedItem.team);
        if(draggedItem.team === "one"){
          let newPerson = newTeamOne[draggedItem.id];
          newPerson.team = null;
          newTeamOne.splice(draggedItem.id,1);
          newPeopleState.push(newPerson);
          this.setState({
            people: [...newPeopleState],
            teamOne: [...newTeamOne]
          })
        }else if (draggedItem.team === "two"){
          let newPerson = newTeamTwo[draggedItem.id];
          newPerson.team = null;
          newTeamTwo.splice(draggedItem.id,1);
          newPeopleState.push(newPerson);
          this.setState({
            people: [...newPeopleState],
            teamTwo: [...newTeamTwo]
          })
        }
     }

  }
  handleDragStart (e){
    this.draggedItem = e.currentTarget;
    
  }
  render() {
    let message;
    if(this.state.people.length < 1){
      message = "-- There are no more players left to assign. --"
    }else{
      message = null;
    }
    return (
      <div className="App">

        <div className="container-pending" data-team="none" onDragOver={this.handleDragEnter} onDrop={this.handleDragDrop} >
          <table className="assign-table" >
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
          {message ? <p>{message}</p> : null}

        </div>
        <div className="container-team" >
          <div className="team-list float-left" onDragOver={this.handleDragEnter} onDrop={this.handleDragDrop}>
              <p>Team One</p>
                {this.state.teamOne.map(function(person,index){
                  return (
                    <Teams 
                     key={index}
                     dataId={index} 
                     
                     teamMember={person} 
                     onStartDrag={this.handleDragStart}        
                     onSwitchTeam={this.handleSwitch} 
                     onRemove={this.handleRemove}/>
                  )
                }.bind(this))}
          </div>
          <div className="team-list float-right" onDragOver={this.handleDragEnter} onDrop={this.handleDragDrop}>
              <p>Team Two</p>
              {this.state.teamTwo.map(function(person,index){
                return (
                  <Teams 
                  key={index} 

                  dataId={index} 
                  teamMember={person} 
                  onStartDrag={this.handleDragStart} 
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
