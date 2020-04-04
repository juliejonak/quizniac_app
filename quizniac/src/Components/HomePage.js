import Card from "./Card";
import React, { useState, useEffect } from "react";
const axios = require("axios");
// TODO: prevent inspect elements cheating: hint.visible ? hint.text : "Nice try, no cheating!";
// TODO set score to local storage so it also persists

const HomePage = () => {
    const [isScore, setScore] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [cardIDs, setCardIDs] = useState([]);
    const [hasSeen, setHasSeen] = useState({});

    // setLocalStorage | set after giving first card
    const setLocalStorage = (updatedObject) => {
        console.log("Trying to update localStorage with: ", updatedObject)
        window.localStorage.setItem("seenCards", JSON.stringify(updatedObject));
    }

    const getCardsFromStorage = () => {
        // error handling for when "seenCards" isn't on localStorage

        const seenCards = JSON.parse(window.localStorage.getItem("seenCards"));
        // when made into a hook, consider if should be on state
        return seenCards
    }

    // pass it cardIDs.length
    const getRandomCard = () => {
        let foundNewCard = false

        while (foundNewCard === false){
            const randomIndex = Math.floor(Math.random() * Math.floor(cardIDs.length))
            console.log(`randomly chosen index is ${randomIndex}, random card ID is ${cardIDs[randomIndex]}`)

            if (hasSeen[cardIDs[randomIndex]]){
                continue
            } else {
                foundNewCard = true
                const newCardID = cardIDs[randomIndex]
                // returns _id of card to render
                setLocalStorage({...hasSeen, [newCardID]: true });
                setHasSeen({...hasSeen, [newCardID]: true})
                return newCardID
            }
        }
    }
    

    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            const res = await axios('https://quizniac.herokuapp.com/cards');
            setData(res.data);

            // Sets initial array of all possible card IDs to choose random
            const ids = [];
            res.data.forEach(card => {
                ids.push(card._id)
            });
            console.log(`There are ${ids.length} cards.`)
            setCardIDs(ids)

            
            setLocalStorage({
                "5e869eed4f40fba2be50a33a": true
            })
            setHasSeen({
                "5e869eed4f40fba2be50a33a": true
            })
            console.log(getCardsFromStorage());
            
            setLoading(false);
        }
        fetchData();
    }, []);

    // check local storage for seen {
    //     _id: true,
    // }
    // see if random card has been seen
    // if not, fetch that card and add to local storage list
    // if so, pick new one

    // Add a "current" card so if user leaves and returns, can load same one
    // Keep track of # of hints used on that object

    // when API returns single card, also return total number in db (store in FE for now)
  
    return (
      <div className="container">
          <title>Quizniac</title>
  
          <h1>Welcome to Quizniac!</h1>
          <h2>Your current score is {isScore}.</h2>

          <button onClick={getRandomCard}>Get Random</button>
  
        {isLoading ? ( <div>Loading...</div>) :
          <div>
          {data.map(card => (
            <Card clues={card.clues} answer={card.answer} setScore={setScore} isScore={isScore} key={card.clues[0]} />
          ))}
          </div>
        }
  
      </div>
    );
  };
  
  export default HomePage;