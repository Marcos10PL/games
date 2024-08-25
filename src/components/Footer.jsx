import { NavLink, useLocation } from 'react-router-dom';

export default function Footer()
{
  const location = useLocation()
  const path = location.pathname;

  return(
    <footer>
      {path !== '/' && <p><NavLink to='/'>Powrót na stronę główną</NavLink></p>}
      <p>2024 &copy; Wszelkie prawa zastrzeżone</p>
    </footer>
  )
}
