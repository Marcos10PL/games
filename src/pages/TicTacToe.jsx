import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/StartButton";
import Field from "../components/Field";
import {PLAYERS, fieldValues, winnerLines} from '../data/tictactoe';
import style from '../style/tictactoe.module.scss';

export default function TicTacToe()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState(PLAYERS.X);
  const [rounds, setRounds] = useState(0);
  const [winnerFields, setWinnerFields] = useState([]);
  const [fieldsClicked, setFieldsClicked] = useState([]);
  const [vsPC, setVsPc] = useState('');
  const [error, setError] = useState(true);

  const [pcRands, setPcRands] = useState([]);

  useEffect(() => 
  {
    if(rounds > 0)
    {
      for(let i = 0; i < winnerLines.length; i++)
      {
        const [a, b, c] = winnerLines[i];
        if(fieldsClicked[a] && fieldsClicked[a] === fieldsClicked[b] 
          && fieldsClicked[b] == fieldsClicked[c])
        {
          setWinnerFields([a, b, c])
          setGameOver(true);
          return;
        }
      }

      if(rounds === 9)
      {
        setGameOver(true);
        return;
      }

      let XorO = status === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
      setStatus(XorO);
    }
  }, [rounds])

  const handleSetRounds = v =>
  {
    setRounds(prev => prev + 1);
    const updatedFieldsClicked = [...fieldsClicked];
    updatedFieldsClicked[v] = status;
    setFieldsClicked(updatedFieldsClicked);

    if(vsPC && rounds % 2 === 0)
    {
      let isInArray = false, rand;
      do
      {
        isInArray = false;
        rand = Math.floor(Math.random()*8);
        if(fieldsClicked.includes(rand))
          isInArray = true;
      }
      while(isInArray)
      setPcRands([...pcRands, rand])
      console.log(pcRands);
    }
  }
 
  const changeTypeOfGame = vsPC =>
  {
    setVsPc(vsPC);
    setError(false)
  }

  return(
    <>
      <Header msg="Kółko i krzyżyk" />

      <main>

        <StartButton 
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          gameOver={gameOver}
          error={error}
        />

        {!gameStarted && (
          <section className={style.info}>
            <button 
              onClick={() => changeTypeOfGame(false)}
              className={(vsPC !== '') && !vsPC ? style.chosen : ''}
            >
              1 vs 1
            </button>
            <button 
              onClick={() => changeTypeOfGame(true)}
              className={(vsPC !== '') && vsPC ? style.chosen : ''}
            >
              1 vs PC
            </button>
          </section>
        )}

        {(vsPC === '' && error) && (
          <div className={style.error}>
            Zanim zaczniesz <br /> wybierz rodzaj gry
          </div>
        )}

        {gameStarted && !error && (
          <>
            <section className={style.status}>
              {!winnerFields.length && rounds === 9 ? 'Remis' : 
              !gameOver ? `Gra ${status}!` : `Wygrywa ${status}!`}
            </section>

            <section className={style.board}>
              {fieldValues.map((v) => 
                <Field 
                  key={v}
                  value={v}
                  gameOver={gameOver} 
                  status={status}
                  handleSetRounds={handleSetRounds}
                  winnerFields={winnerFields}
                />
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}
