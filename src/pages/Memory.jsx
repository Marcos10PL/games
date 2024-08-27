import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/startButton";
import Options from "../components/Options";
import Info from "../components/Info";
import Status from "../components/Status";
import Card from "../components/memory/Card";

import { NUMBER_OF_CARDS, CARDS } from "../data/memory";
import style from '../style/memory.module.scss';

export default function Memory()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState();
  const [counter, setCounter] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const changeNumber = id => 
  {
    setSelectedNumber(id);
    setError(false);
  }

  useEffect(() => 
  {
    if(gameStarted)
    {
      const shuffleArray = (array) => 
      {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) 
        {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
      };

      let updatedCards = [
        ...CARDS(selectedNumber/2), 
        ...CARDS(selectedNumber/2)
      ]

      const shuffledCards = shuffleArray(updatedCards);
      setCards(shuffledCards);
      
    }
  }, [gameStarted])


  useEffect(() => 
  {
    if (selectedCards.length === 2) 
    {
      const [firstIndex, secondIndex] = selectedCards;
      const firstIcon = cards[firstIndex];
      const secondIcon = cards[secondIndex];

      if (firstIcon.id === secondIcon.id) 
      {
        let newCards = cards.map(card => {
          if(card.id === firstIcon.id  || card.id === secondIcon.id)
            return {...card, matched: true}
          return card;
        })
        setCards(newCards);
        console.log(newCards);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 500);
    }
  }, [selectedCards]);

  const handleCardClick = index => 
  {
    if (selectedCards.length === 2) 
      return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);
  };

  return(
    <>
      <Header msg="Memory" />

      <main>
        <StartButton 
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          gameOver={gameOver}
          error={error}
        />

        {gameOver && <PlayAgain />}

        {!gameStarted && (
          <Options
            arr={[
              {id: NUMBER_OF_CARDS[12], cond: selectedNumber === NUMBER_OF_CARDS[12]},
              {id: NUMBER_OF_CARDS[24], cond: selectedNumber === NUMBER_OF_CARDS[24]},
              {id: NUMBER_OF_CARDS[36], cond: selectedNumber === NUMBER_OF_CARDS[36]},
            ]}
            onclickFunction={changeNumber}
          />
        )}

      {gameStarted && !error && (
        <>
          <Status msg={`Licznik: ${counter}`} />

          <section className={style.board}>
            {cards.map((card, index) => (
              <Card 
                key={`${card.id} ${index}`} 
                card={card} 
                handleCardClick={() => handleCardClick(index)}
                clicked={selectedCards.includes(index)}
                visible={card.matched}
              />
            ))}
          </section>
        </>
      )}
        
        {error && <Info msg='liczbę kart' />}
      </main>

      <Footer />
    </>
  )
}
