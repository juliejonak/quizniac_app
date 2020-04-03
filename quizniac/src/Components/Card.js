import Clue from "./Clue";
import React, { useState } from "react";

const Card = (props) => {
  const { answer, clues } = props;
  const [isVisible, setVisible] = useState(false);
  const [isRevealed, setRevealed] = useState(0);
  const { setScore, isScore } = props;

  const revealAnswer = (e) => {
    setVisible(true);
    setScore(isScore + (10 - isRevealed) * 10);
    setRevealed(10);
  };

  const increaseRevealed = (e) => {
    setRevealed(isRevealed + 1);
  };

  return (
    <div>
      {clues.map((clue, index) => {
        return (
          <Clue
            clue={clue}
            index={index}
            key={clue}
            hidden={index > isRevealed}
          />
        );
      })}

      <button onClick={increaseRevealed}>Reveal Next Clue</button>
      <button onClick={revealAnswer}>Show Answer</button>

      <h3 className={isVisible ? "visible" : "hidden"}>
        The answer is {answer}
      </h3>
    </div>
  );
};

export default Card;