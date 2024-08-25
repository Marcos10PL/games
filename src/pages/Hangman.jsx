import Footer from "../components/Footer";
import Header from "../components/Header";
import StartButton from "../components/startButton";

export default function Hangman()
{
  return(
    <>
      <Header msg="Wisielec" />

      <main>
        <StartButton />
      </main>

      <Footer />
    </>
  )
}
