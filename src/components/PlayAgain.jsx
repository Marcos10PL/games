import { useNavigate } from "react-router";
import '../style/buttons.scss';

export default function PlayAgain()
{
  const navigate = useNavigate();

  return(
    <div className="play-again">
      <button onClick={() => navigate(0)} className="play-again-button">
        Chcesz zagrać ponownie?
      </button>
    </div>
  )
}