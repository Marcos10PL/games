export default function Options({ arr, onclickFunction })
{
  return(
    <section className='options'>
      {arr.map(({ id, cond }, index) => 
        <button 
          key={index}
          className={cond ? 'chosen' : ''} 
          onClick={() => onclickFunction(id)}
        >
          {id}
        </button>
      )}
    </section>
  )
}