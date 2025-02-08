import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Hangman from "./pages/Hangman";
import Memory from "./pages/Memory";
import RockPaperScissors from "./pages/RockPaperScissors";
import NotFound from "./pages/NotFound";
import TooSmallDeviceInfo from "./components/TooSmallDeviceInfo";

import "./style/main.scss";

export default function App() {
  return (
    <>
      <TooSmallDeviceInfo />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kolko-i-krzyzyk" element={<TicTacToe />} />
        <Route path="/wisielec" element={<Hangman />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/papier-kamien-nozyce" element={<RockPaperScissors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
