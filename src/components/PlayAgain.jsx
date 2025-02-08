import { useNavigate } from "react-router";

export default function PlayAgain() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(0)} className="play-again">
        Chcesz zagrać ponownie?
      </button>
    </div>
  );
}
