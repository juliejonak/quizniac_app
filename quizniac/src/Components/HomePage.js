import Card from "./Card";
import React, { useState, useEffect } from "react";
const axios = require("axios");

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
  
    return (
      <div className="container">
        <header>
          <title>Quizniac</title>
          <link rel="icon" href="/quizniac.ico" />
        </header>
  
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