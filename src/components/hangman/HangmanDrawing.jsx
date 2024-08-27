import style from '../../style/hangman.module.scss';
import { useLayoutEffect, useState } from 'react';
import { images } from '../../data/hangman';

export default function HangmanDrawing({ lives })
{
  const [src, setSrc] = useState('')

  useLayoutEffect(() => {
    setSrc(images[lives]);
  }, [lives])

  return(
    <div className={style.hangman}>
      <img src={images[images.length - 1]} alt="hangman-shadow" className={style.bg}/> 
      {src !== null && (
        <img src={src} alt="hangman" /> 
      )}
    </div>
  )
}