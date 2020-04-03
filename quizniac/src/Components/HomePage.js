import Card from "./Card";
import React, { useState, useEffect } from "react";
const axios = require("axios");
// TODO: prevent inspect elements cheating: hint.visible ? hint.text : "Nice try, no cheating!";

const HomePage = () => {
    const [isScore, setScore] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            const res = await axios('https://quizniac.herokuapp.com/');
            setData(res.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    // mount
    // randomly pick id from range of available, 
    // check local storage for seen list
    // see if random card has been seen
    // if not, fetch that card and add to local storage list
    // if so, pick new one

    // Add a "current" card so if user leaves and returns, can load same one
    // Keep track of # of hints used on that object

    // when API returns single card, also return total number in db (store in FE for now)
  
    return (
      <div className="container">
          <title>Quizniac</title>
  
        <main>
          <h1>Welcome to Quizniac!</h1>
          <h2>Your current score is {isScore}.</h2>
  
        {isLoading ? ( <div>Loading...</div>) :
          <div>
          {data.map(card => (
            <Card clues={card.clues} answer={card.answer} setScore={setScore} isScore={isScore} key={card.clues[0]} />
          ))}
          </div>
        }
  
        </main>
  
        <footer>
            Powered by Julie
        </footer>
      </div>
    );
  };
  
  export default HomePage;