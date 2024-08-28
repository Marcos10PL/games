import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../style/paper-rock-scissors.module.scss';

export default function Icon({ icon }) 
{
  return(
    <span className={style.icon}>
      {icon && (
        <FontAwesomeIcon 
        icon={icon.icon} 
        size="2x" 
        rotation={icon.rotation}
      />    
      )}
  </span>
  )
}