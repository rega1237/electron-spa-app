import { Link } from 'react-router-dom'

const BirthdayCard = ({ birthday }) => {
  console.log(birthday)
  return (
    <>
      <div className="flex w-full max-w-md flex-col rounded-xl bg-primary-foreground p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-4 rounded-full border border-primary"></div>
            <Link to={`/paciente/${birthday.id}`}>
              <div className="text-md font-bold">{birthday.nombre_completo}</div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <p>{birthday['fecha_de_nacimiento']}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p>{birthday['telefono']}</p>
        </div>
      </div>
    </>
  )
}

export default BirthdayCard
