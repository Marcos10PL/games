import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/StartButton";
import PlayAgain from "../components/PlayAgain";
import Info from "../components/Info";
import Options from "../components/Options";
import Status from "../components/Status";
import Icon from "../components/rock-paper-scissors/Icon";

import style from '../style/paper-rock-scissors.module.scss';
import { ICONS, LIMITS, PAPER, ROCK, SCISSORS } from "../data/rock-paper-scissors";

export default function RockPaperScissors()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(true);
  const [selectedLimit, setSelectedLimit] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [pcIcon, setPcIcon] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [pcPoints, setPcPoints] = useState(0);
  const [msg, setMsg] = useState(null);

  const changeLimit = id =>
  {
    setSelectedLimit(id);
    setError(false);
  }

  useEffect(() => 
  {
    if(selectedIcon)
    {
      let rand = Math.floor(Math.random() * ICONS.length);
      let newPcIcon = ICONS[rand];

      let idIconUser = selectedIcon.id;
      let idIconPC = newPcIcon.id;

      if(newPcIcon.id === selectedIcon.id)
        setMsg('Remis!');
      else if(idIconUser === ROCK && idIconPC === SCISSORS
        || idIconUser === SCISSORS && idIconPC === PAPER
        || idIconUser === PAPER && idIconPC === ROCK
      ){
        setUserPoints(prev => prev + 1);
        setMsg('Wgrywasz tę rundę!');
      }
      else
      {
        setPcPoints(prev => prev + 1);
        setMsg('Komputer wgrywa tę rundę!');
      }
      setPcIcon(ICONS[rand]);
    }
  }, [selectedIcon])

  useEffect(() => 
  {
    if(pcPoints === selectedLimit || userPoints === selectedLimit)
      return;

    if(msg)
    {
      setTimeout(() => 
      {
        setMsg(null);
        setPcIcon(null);
        setSelectedIcon(null);
      }, 900)
    }
  }, [msg])

  useEffect(() => 
  {
    if(pcPoints !== selectedLimit && userPoints !== selectedLimit)
      return;

    setTimeout(() => {
      userPoints === selectedLimit ? setMsg('Wygrywasz!') : setMsg('Przegarłeś!');
      setGameOver(true);
    }, 800)

  }, [pcPoints, userPoints])
  
  return(
    <>
      <Header msg="Papier, kamień, nożyce" />

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
              {id: LIMITS[1], cond: selectedLimit === LIMITS[1]},
              {id: LIMITS[3], cond: selectedLimit === LIMITS[3]},
              {id: LIMITS[6], cond: selectedLimit === LIMITS[6]},
            ]}
            onclickFunction={changeLimit}
          />
        )}

        {(gameStarted && !error) && (
          <>
            <Status msg={
              msg ? gameOver ? `${msg} - ${userPoints}:${pcPoints}`
              : msg : `TY ${userPoints}:${pcPoints} PC`} 
            />

            <section className={`${style.board} ${gameOver && 'disabled'}`}>
              <Icon icon={selectedIcon} />    
              <Icon icon={pcIcon} />    
            </section>

            <section className={`${style.panel} ${(msg || gameOver) && 'disabled'}`}>
              <h4>Wybierz swój atak</h4>
              <div className={style.icons}>
                {ICONS.map((icon, index) => 
                  <button key={index} onClick={() => setSelectedIcon(icon)}>
                    <Icon icon={icon} />  
                  </button>
                )}
              </div>
            </section>
          </>
        )}

        {error && <Info msg={`limit punktów`} />}

      </main>

      <Footer />
    </>
  )
}
