import React from 'react';

const Clue = (props) => {
    const clueNumber = 10 - props.index;
    return (
      <div>
        <p>
          <span>{clueNumber}.</span>{" "}
          <span className={props.hidden ? "hidden" : "visible"}>
            {props.clue}
          </span>
        </p>
      </div>
    );
  };
  
  export default Clue;  