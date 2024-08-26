import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/startButton";
import Info from "../components/Info";
import Options from "../components/Options";
import Status from "../components/Status";
import h1 from '../img/hangman/h11.svg';
import style from '../style/hangman.module.scss';

import { CATEGORIES, LETTERS, proverbs, sports, movies } from "../data/hangman";

export default function Hangman()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(true);
  const [category, setCategory] = useState('');
  const [categoryArray, setCategoryArray] = useState([]);
  const [pass, setPass] = useState([]);

  const changeCategory = id => 
  {
    setError(false);
    setCategory(id);
  }

  useEffect(() =>
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

    const categoryArr = selectCategory();

    if (categoryArr.length > 0)
    {
      let rand = Math.floor(Math.random() * categoryArr.length);
  
      setPass(
        categoryArr[rand]
          .split('')
          .map((l) => (l.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/) ? '_' : ' '))
      );
    } 
  }, [gameStarted])

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

        {gameStarted && !error && (
          <>
            <Status
              msg={`Wybrana kategoria: ${category}`}
            />


            <section className={style.board}>

              <div className={style.hangman}>
                <img src={h1} alt="" /> 
              </div>

              <div className={style.container}>

                <div className={style.pass}>
                  {pass}
                </div>

                <div className={style.letters}>
                  {LETTERS.map((row, index) =>  
                    <div key={index} className={style.row}>
                      {row.map(letter =>
                        <button key={letter}>
                          {letter}
                        </button>
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
