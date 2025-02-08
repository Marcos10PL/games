import style from "../../style/memory.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import questionMark from "../../img/memory/quest.svg";

export default function Card({ card, handleCardClick, clicked, visible }) {
  return (
    <button
      onClick={handleCardClick}
      style={{
        color: card.color,
        pointerEvents: clicked ? "none" : "",
      }}
      className={`${style.card} ${visible ? "disabled" : ""}`}
    >
      <img
        src={questionMark}
        alt="question-mark"
        style={{ opacity: !clicked ? (!visible ? 1 : 0) : 0 }}
      />

      <span style={{ opacity: !clicked ? (visible ? 1 : 0) : 1 }}>
        <FontAwesomeIcon icon={card.icon} />
      </span>
    </button>
  );
}
