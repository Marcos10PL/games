import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/startButton";

export default function RockPaperScissors()
{
  return(
    <>
      <Header msg="Papier, kamień, nożyce" />

      <main>
        <StartButton />
      </main>

      <Footer />
    </>
  )
}
