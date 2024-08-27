import style from '../../style/hangman.module.scss';

export default function Phrase({ phrase })
{
  return(
    <div className={style.phrase}>
      {phrase}
    </div>
  )
}