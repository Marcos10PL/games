export default function StartButton({ 
  gameStarted, setGameStarted, gameOver, error = false})
{
  return(
    <button 
      className={`start-button ${(gameStarted || error) && 'disabled'}`}
      onClick={() => setGameStarted(true)}
      disabled={error}
    >
      {gameOver ? 'Koniec gry!' : 
      !gameStarted ? 'Rozpocznij grę!' : 'GRA TRWA!'}
    </button>
  )
}