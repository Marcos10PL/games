import style from '../../style/hangman.module.scss';
import { useLayoutEffect, useState } from 'react';

import h1 from '../../img/hangman/h1.svg';
import h2 from '../../img/hangman/h2.svg';
import h3 from '../../img/hangman/h3.svg';
import h4 from '../../img/hangman/h4.svg';
import h5 from '../../img/hangman/h5.svg';
import h6 from '../../img/hangman/h6.svg';
import h7 from '../../img/hangman/h7.svg';
import h8 from '../../img/hangman/h8.svg';
import h9 from '../../img/hangman/h9.svg';
import h10 from '../../img/hangman/h10.svg';
import h11 from '../../img/hangman/h11.svg';

export default function HangmanDrawing({ lives })
{
  const [src, setSrc] = useState('')

  useLayoutEffect(() => {
    const images = [null, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11]
    setSrc(images[lives]);
  }, [lives])

  return(
    <div className={style.hangman}>
      <img src={h11} alt="hangman-shadow" className={style.bg}/> 
      {src !== null && (
        <img src={src} alt="hangman" /> 
      )}
    </div>
  )
}