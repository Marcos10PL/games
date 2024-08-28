import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Field from "../components/tic-tac-toe/Field";
import PlayAgain from "../components/PlayAgain";
import Options from "../components/Options";
import StartButton from "../components/startButton";
import Info from "../components/Info";
import Status from "../components/Status";

import {PLAYERS, fieldValues, winnerLines, GAMEMODES} from '../data/tictactoe';
import style from '../style/tictactoe.module.scss';

export default function TicTacToe()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState(PLAYERS.X);
  const [rounds, setRounds] = useState(0);
  const [winnerFields, setWinnerFields] = useState([]);
  const [fieldsClicked, setFieldsClicked] = useState(Array(9).fill(null));
  const [gameMode, setGameMode] = useState('');
  const [vsPC, setVsPc] = useState(false);
  const [error, setError] = useState(true);

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

      let nextStatus = status === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
      setStatus(nextStatus);

      if(nextStatus === PLAYERS.O && gameMode === GAMEMODES.MULTIPLAYER)
        handlePcMove();
    }
  }, [rounds])

  const nextMove = (v, s = status) =>
  {
    setRounds(prev => prev + 1);
    const updatedFieldsClicked = [...fieldsClicked];
    updatedFieldsClicked[v] = s;
    setFieldsClicked(updatedFieldsClicked);
  }

  const findPcMove = player => 
  {
    for (let i = 0; i < winnerLines.length; i++) 
    {
      const [a, b, c] = winnerLines[i];
  
      if (fieldsClicked[a] === player && fieldsClicked[b] === player && fieldsClicked[c] === null) 
        return c;
      if (fieldsClicked[a] === player && fieldsClicked[c] === player && fieldsClicked[b] === null) 
        return b;
      if (fieldsClicked[b] === player && fieldsClicked[c] === player && fieldsClicked[a] === null) 
        return a;
    }
    return null;
  };

  const handlePcMove = () =>
  {
    let isInArray = false;
    let pcMove = findPcMove(PLAYERS.O);

    if(pcMove === null)
      pcMove = findPcMove(PLAYERS.X)

    if(pcMove === null)
    {
      do
      {
        isInArray = false;
        pcMove = Math.floor(Math.random()*9);
        if(fieldsClicked[pcMove] !== null)
          isInArray = true;
      }
      while(isInArray);
    }
    
    if(pcMove !== null)
    {
      setTimeout(() => {
        nextMove(pcMove, PLAYERS.O);
      }, 500)
    }
  }

  const changeTypeOfGame = id =>
  { 
    id === GAMEMODES.MULTIPLAYER && setVsPc(true);
    setGameMode(id);
    setError(false);
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

        {gameOver && <PlayAgain />}

        {!gameStarted && (
          <Options
            arr={[
              {id: GAMEMODES.SINGLEPLAYER, cond: GAMEMODES.SINGLEPLAYER === gameMode}, 
              {id: GAMEMODES.MULTIPLAYER, cond: GAMEMODES.MULTIPLAYER === gameMode}, 
            ]}
            onclickFunction={changeTypeOfGame}
          />
        )}

        {error && <Info msg='typ gry' />}

        {gameStarted && !error && (
          <>
            <Status
              msg=
              {
                !winnerFields.length && rounds === 9 ? 'Remis' 
                : gameOver ? vsPC ? status === PLAYERS.X ? 'Wygrywasz!' : 'Wygrywa komputer!' 
                :`Wygrywa ${status}!` 
                : vsPC ? status === PLAYERS.X ? 'Twój ruch!' : 'Ruch komputera!' 
                : `Gra ${status}!`
              }
            />

            <section 
              className={style.board}
              style={status === PLAYERS.O && vsPC ? {pointerEvents: 'none'} : {}}
            >
              {fieldValues.map((v) => 
                <Field 
                  key={v}
                  value={v}
                  gameOver={gameOver} 
                  nextMove={nextMove}
                  winnerFields={winnerFields}
                  fieldStatus={fieldsClicked[v]}
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