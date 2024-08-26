import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/startButton";
import Error from "../components/Error";

export default function Hangman()
{
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(true);


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
              <section className='info'>
                <button>
                  Przysłowia
                </button>
                <button> 
                  Sporty
                </button>
                <button> 
                  Filmy
                </button>
              </section>
          )}

          {(error) && (
            <Error msg='kategorię' />
          )}

      </main>

      <Footer />
    </>
  )
}
