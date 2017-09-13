import React from 'react';



function PendingPeople (props) {

        return (

            <tr key={props.person.id}>
                <td>{props.person.name}</td>
                <td><a className="one-assign" onClick={function() {props.onPersonAssign(props.person,"teamOne")}}>One</a></td>
                <td><a className="two-assign" onClick={function() {props.onPersonAssign(props.person,"teamTwo")}}>Two</a></td>
            </tr>
        );
}

export default PendingPeople;