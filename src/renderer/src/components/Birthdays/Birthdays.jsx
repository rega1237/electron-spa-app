import { useEffect, useState } from 'react'
import usePaciente from '../../store/pacienteStore'
import BirthdayCard from './BirthdayCard/BirthdayCard'

const Birthdays = () => {
  const pacientes = usePaciente((state) => state.pacientes)
  const [birthdays, setBirthdays] = useState([])

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth()

    const birthdays = pacientes.filter((paciente) => {
      const birthday = new Date(paciente.fecha_de_nacimiento)
      console.log(birthday.getMonth() === currentMonth)
      return birthday.getMonth() === currentMonth
    })

    console.log(birthdays)

    setBirthdays(birthdays)
  }, [])

  return (
    <>
      {birthdays.map((birthday) => (
        <div key={birthday.id}>
          <BirthdayCard birthday={birthday} />
        </div>
      ))}
    </>
  )
}

export default Birthdays
