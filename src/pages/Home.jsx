import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home()
{
  return(
    <>
      <Header />

      <main>
        <nav>
          <NavLink to='/kolko-i-krzyzyk'>Kółko i krzyżyk</NavLink>
          <NavLink to='/wisielec'>Wisielec</NavLink>
          <NavLink to='/memory'>Memory</NavLink>
          <NavLink to='/papier-kamien-nozyce'>Papier, kamień, nożyce</NavLink>
        </nav>
      </main>

      <Footer />
    </>
  )
}
