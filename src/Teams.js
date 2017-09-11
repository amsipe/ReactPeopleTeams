import React from 'react';

function Teams (props) {
  //console.log(props.teamMember.name);
    return (
      <ul 
        className="teamMember" 
        data-team={props.dataTeam} 
        onDragEnter={(e)=> {props.onEnterDrag(e)}}
      >
        <li onDragStart={props.onStartDrag} data-id={props.dataId} draggable={true}>{props.teamMember.name}</li>
        <div className="float-right">
          <li><i className="cancel" onClick={()=> {props.onRemove(props.teamMember)}}>&#x2718;</i></li>
          <li><i className="move-team" onClick={() => {props.onSwitchTeam(props.teamMember)}}>&#8596;</i></li>
        </div>
      </ul>
    )
}

export default Teams;