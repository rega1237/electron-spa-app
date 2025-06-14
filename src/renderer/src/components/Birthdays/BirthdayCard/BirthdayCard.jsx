import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BirthdayCard = ({ birthday }) => {
  const birthdayDate = new Date(birthday.fecha_de_nacimiento)
  const day = birthdayDate.getDate()
  const month = birthdayDate.toLocaleString('es-ES', { month: 'long' })
  const year = birthdayDate.getFullYear()

  return (
    <div className="flex flex-col rounded-xl bg-primary-foreground p-4 text-white shadow-lg">
      <Link to={`/paciente/${birthday.id}`} className="mb-2 flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-primary"></div>
        <div className="text-md truncate font-bold">{birthday.nombre_completo}</div>
      </Link>
      <div className="flex flex-col items-center justify-between text-sm">
        <p className="text-xs opacity-75">
          {day} de {month} de {year}
        </p>
        <p className="text-xs opacity-75">{birthday.telefono}</p>
      </div>
    </div>
  )
}

BirthdayCard.propTypes = {
  birthday: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fecha_de_nacimiento: PropTypes.string.isRequired,
    nombre_completo: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired
  }).isRequired
}

export default BirthdayCard
