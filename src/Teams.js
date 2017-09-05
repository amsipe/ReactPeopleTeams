import React from 'react';



function Teams (props) {
    return (
        <div className="container-team">
        <ul className="team-one">
          <li>
            <button>Un-assign</button>
            <span>Team-one</span>
            <button>Switch Teams</button>
            </li>
          <li>
            <button>Un-assign</button>
            <span>Team-one</span>
            <button>Switch Teams</button>
            </li>
          <li>
            <button>Un-assign</button>
            <span>Team-one</span>
            <button>Switch Teams</button>
            </li>
          <li>
            <button>Un-assign</button>
            <span>Team-one</span>
            <button>Switch Teams</button>
            </li>
        </ul>
        <ul className="team-two">
          <li>
            <button>Un-assign</button>
            <span>Team-two</span>
            <button>Switch Teams</button>
          </li>
          <li>
            <button>Un-assign</button>
            <span>Team-two</span>
            <button>Switch Teams</button>
          </li>
          <li>
            <button>Un-assign</button>
            <span>Team-two</span>
            <button>Switch Teams</button>
          </li>
          <li>
            <button>Un-assign</button>
            <span>Team-two</span>
            <button>Switch Teams</button>
          </li>
        </ul>
      </div>
    )
}

export default Teams;