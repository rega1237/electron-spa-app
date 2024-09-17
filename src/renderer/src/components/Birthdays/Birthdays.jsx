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
      return birthday.getMonth() === currentMonth
    })

    setBirthdays(birthdays)
  }, [])

  return (
    <>
    <h3 className='text-xl font-bold text-primary-foreground'>Cumeplañeros del mes</h3>
      {birthdays.map((birthday) => (
        <div key={birthday.id} className='mt-4'>
          <BirthdayCard birthday={birthday} />
        </div>
      ))}
      {birthdays.length === 0 && <p className='mt-4'>No hay cumpleañeros</p> }
    </>
  )
}

export default Birthdays
