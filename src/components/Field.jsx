import x from '../img/tictactoe/cross.svg';
import o from '../img/tictactoe/circle.svg';
import { PLAYERS } from '../data/tictactoe';
import style from '../style/tictactoe.module.scss';
import { useState } from 'react';

export default function Field({ 
  gameOver, status, handleSetRounds, value, winnerFields
}){
  const [fieldStatus, setFieldStatus] = useState();
  const [clicked, setClicked] = useState(false);

  const isWinner = winnerFields.includes(value);

  const handleClick = () => 
  {
    if (!fieldStatus) 
    {
      setFieldStatus(status);
      handleSetRounds(value);  
      setClicked(true);      
    }
  };

  return(
    <div 
      className={`${style.field} ${gameOver ? style.disabled : ''}`} 
      style={{
        pointerEvents: `${clicked ? 'none': ''}`, 
        backgroundColor: `${isWinner ? 'rgba(237, 138, 45, 0.15)' : ''}`,
      }}
      onClick={() => handleClick()}
    >
      {fieldStatus && (
        <img 
          src={fieldStatus === PLAYERS.X ? x : o} 
          alt={fieldStatus === PLAYERS.X ? PLAYERS.X : PLAYERS.O} />
      )}
    </div>
  )
}