import { useLocation, useNavigate } from "react-router-dom";

export default function PlayAgain() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
          setTimeout(() => navigate(location.pathname), 0);
        }}
        className="play-again"
      >
        Chcesz zagrać ponownie?
      </button>
    </div>
  );
}
