import { useEffect, useState } from 'react';
import style from '../../style/hangman.module.scss';

export default function Letter({ handleClick, guessedLetters, letter }) 
{
  const [guessed, setGuessed] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setGuessed(guessedLetters.includes(letter));
  }, [guessedLetters])

  return(
    <button 
      key={letter} 
      onClick={() =>{ handleClick(letter); setClicked(true) }}
      className={clicked ? `disabled ${guessed ? style.good : style.bad}` : ''}
    >
      {letter}
    </button>
  )
}

      