export default function PlayAgain() {
  return (
    <div>
      <button onClick={() => window.location.reload()} className="play-again">
        Chcesz zagrać ponownie?
      </button>
    </div>
  );
}
