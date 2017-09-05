import React from 'react';



function PendingPeople (props) {
    console.log(props.initialPeople[0]);

    return (
        <div className="container-pending">
          <ul className="pending-list">
            {props.initialPeople.map(function(person,index){
                return (
                    <li key={props.initialPeople.id}><button onClick={props.onPersonAssign}>Assign</button>{person.name}</li>
                )
            })}  

          </ul>
        </div>
    );
}

export default PendingPeople;