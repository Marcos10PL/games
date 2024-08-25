import { useState } from 'react';
import styles from '../style/start.module.scss'

export default function StartButton({ 
  gameStarted, setGameStarted, gameOver, error})
{
  return(
    <button 
      className={`${styles.startButton} ${(gameStarted || error) && styles.disabled}`}
      onClick={() => setGameStarted(true)}
      disabled={error}
    >
      {gameOver ? 'Koniec gry!' : 
      !gameStarted ? 'Rozpocznij grę!' : 'GRA TRWA!'}
    </button>
  )
}