import { useEffect, useState } from 'react'
import usePaciente from '../../store/pacienteStore'
import BirthdayCard from './BirthdayCard/BirthdayCard'

const Birthdays = () => {
  const pacientes = usePaciente((state) => state.pacientes)
  const [birthdays, setBirthdays] = useState([])

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const groupedBirthdays = {}
    for (let i = 1; i <= daysInMonth; i++) {
      groupedBirthdays[i] = []
    }

    pacientes.forEach((paciente) => {
      const birthdayDate = new Date(paciente.fecha_de_nacimiento)
      if (birthdayDate.getMonth() === currentMonth) {
        const day = birthdayDate.getDate()
        groupedBirthdays[day].push(paciente)
      }
    })

    setBirthdays(groupedBirthdays)
  }, [pacientes])

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  const currentMonthName = monthNames[new Date().getMonth()]

  return (
    <>
      <h3 className="text-xl font-bold text-primary-foreground">
        Cumpleañeros de {currentMonthName}
      </h3>
      <div className="mt-4 grid grid-cols-7 gap-2 text-center font-semibold text-muted-foreground">
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({
          length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
        }).map((_, index) => (
          <div key={`empty-start-${index}`} className="p-2"></div>
        ))}
        {Object.keys(birthdays)
          .sort((a, b) => a - b)
          .map((day) => (
            <div
              key={day}
              className={`rounded-lg border p-2 shadow-sm ${birthdays[day].length > 0 ? 'bg-card text-card-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              <h4 className="mb-2 text-lg font-semibold">Día {day}</h4>
              <div className="flex flex-col gap-2">
                {birthdays[day].length > 0 ? (
                  birthdays[day].map((birthday) => (
                    <BirthdayCard key={birthday.id} birthday={birthday} />
                  ))
                ) : (
                  <p className="text-center text-sm">No hay</p>
                )}
              </div>
            </div>
          ))}
        {Array.from({
          length: 6 - new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDay()
        }).map((_, index) => (
          <div key={`empty-end-${index}`} className="p-2"></div>
        ))}
      </div>
    </>
  )
}

export default Birthdays
