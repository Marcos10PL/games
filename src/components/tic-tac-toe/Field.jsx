import x from "../../img/tictactoe/cross.svg";
import o from "../../img/tictactoe/circle.svg";
import { PLAYERS } from "../../data/tictactoe";
import style from "../../style/tictactoe.module.scss";
import { useEffect, useState } from "react";

export default function Field({
  gameOver,
  nextMove,
  value,
  winnerFields,
  fieldStatus,
}) {
  const [clicked, setClicked] = useState(false);
  const isWinner = winnerFields.includes(value);

  const handleClick = () => {
    if (!fieldStatus) {
      nextMove(value);
      setClicked(true);
    }
  };

  useEffect(() => {
    fieldStatus && setClicked(true);
  }, [fieldStatus]);

  return (
    <div
      className={`${style.field} ${gameOver ? "disabled" : ""}`}
      style={{
        pointerEvents: `${clicked ? "none" : ""}`,
        backgroundColor: `${isWinner ? "rgba(237, 138, 45, 0.15)" : ""}`,
      }}
      onClick={() => handleClick()}
    >
      {fieldStatus && (
        <img
          src={fieldStatus === PLAYERS.X ? x : o}
          alt={fieldStatus === PLAYERS.X ? PLAYERS.X : PLAYERS.O}
        />
      )}
    </div>
  );
}
