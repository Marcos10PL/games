import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import Hangman from './pages/Hangman';
import Memory from './pages/Memory';
import RockPaperScissors from './pages/rockPaperScissors';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/kolko-i-krzyzyk' element={<TicTacToe />}/>
        <Route path='/wisielec' element={<Hangman />}/>
        <Route path='/memory' element={<Memory />}/>
        <Route path='/papier-kamien-nozyce' element={<RockPaperScissors />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
