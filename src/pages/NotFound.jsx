import { useEffect } from "react";
import { useNavigate } from "react-router"

export default function NotFound()
{
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  })

  return(
    <div style={{textAlign: 'center', padding: '15px'}}>
      <p>Nie znaleziono strony o podanym adresie.</p>
      <p>Za chwilę zostaniesz przekierowany na stronę główną.</p>
    </div>
  )
}
