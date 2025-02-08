import { useCallback, useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/StartButton";
import Info from "../components/Info";
import Options from "../components/Options";
import Status from "../components/Status";
import Letter from "../components/hangman/Letter";
import HangmanDrawing from "../components/hangman/HangmanDrawing";
import PlayAgain from "../components/PlayAgain";
import Phrase from "../components/hangman/Phrase";

import style from '../style/hangman.module.scss';
import { CATEGORIES, LETTERS, proverbs, sports, movies, MAX_LIVES } from "../data/hangman";

export default function Hangman()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(true);
  const [category, setCategory] = useState('');
  const [phrase, setPhrase] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);
  const [lives, setLives] = useState(0);
  const [hiddenPhrase, setHiddenPhrase] = useState([]);

  const changeCategory = id => 
  {
    setError(false);
    setCategory(id);
  }

  useEffect(() =>
  {
    if(gameStarted)
    {
      const selectCategory = () => 
      {
        switch(category)
        {
          case CATEGORIES.PROVERBS: return proverbs;
          case CATEGORIES.SPORTS: return sports;
          case CATEGORIES.MOVIES: return movies;
          default: return [];
        }
      }
      const selectedPhrase = selectCategory();
  
      if (selectedPhrase.length > 0)
      {
        let rand = Math.floor(Math.random() * selectedPhrase.length);
    
        setHiddenPhrase(
          selectedPhrase[rand]
            .split('')
            .map((l) => (l.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/) ? '_' : ' '))
        );
        setPhrase(selectedPhrase[rand].toUpperCase().split(''))
      } 
    }
  }, [gameStarted])

  useEffect(() =>
  {
    if(lives === MAX_LIVES || (lives > 0 && phrase.toString() === hiddenPhrase.toString()))
      setGameOver(true);
  }, [lives, guessedLetters])

  const handleClick = letter =>
  {
    if(phrase.includes(letter))
    {
      const updatedHiddenPhrase = [...hiddenPhrase];
      phrase.forEach((lett, index) => 
      {
        if(lett === letter)
          updatedHiddenPhrase[index] = letter;
      })
        
      setHiddenPhrase(updatedHiddenPhrase);
      setGuessedLetters([...guessedLetters, letter]);
    }
    else
      setLives(prev => prev + 1);

    setClickedLetters([...clickedLetters, letter]);
  }
  
  useEffect(() => 
  { 
    const handleKeyDown = e => 
    {
      const key = e.key.toUpperCase();
      if(
        !gameStarted 
        || lives === MAX_LIVES 
        || !(key.match(/^[A-ZĄĆĘŁŃÓŚŻŹ]/)) 
        || clickedLetters.includes(key)
      ) 
        return;

      e.preventDefault();
      handleClick(key.toUpperCase());
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [handleClick, clickedLetters])
  
  return(
    <>
      <Header msg="Wisielec" />

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
              {id: CATEGORIES.PROVERBS, cond: category === CATEGORIES.PROVERBS},
              {id: CATEGORIES.SPORTS, cond: category === CATEGORIES.SPORTS},
              {id: CATEGORIES.MOVIES, cond: category === CATEGORIES.MOVIES},
            ]}
            onclickFunction={changeCategory}
          />
        )}

        {(gameStarted && !error) && (
          <>
            <Status
              msg={
              !gameOver ? `Kategoria: ${category}` 
              : lives === MAX_LIVES ? 'Przegrałeś!' : 'Wygrałeś!'}
            />

            <section className={`${style.board} ${gameOver ? 'disabled' : ''}`}>

              <HangmanDrawing lives={lives} />

              <div className={style.container}>
                <Phrase phrase={gameOver ? phrase : hiddenPhrase} />

                <div className={style.letters}>
                  {LETTERS.map((row, index) =>
                    <div className={style.row} key={index}>
                      {row.map(letter => 
                        <Letter 
                          key={letter}
                          handleClick={handleClick}
                          guessedLetters={guessedLetters}
                          clickedLetters={clickedLetters}
                          letter={letter}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

            </section>
          </>
        )}

        {error && <Info msg='kategorię' />}

      </main>

      <Footer />
    </>
  )
}
