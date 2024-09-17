import { useState } from 'react'
import TableBody from '../Pacientes/TableBody'
import Appoinments from '../Appoinments/Appoinments'
import Birthdays from '../Birthdays/Birthdays'

const Home = ({ search, toggleNewAppointment, toggleNewHistory, toggleNewSession }) => {
  const [patientsTable, setPatientsTable] = useState(true)
  const [appointmentsTable, setAppointmentsTable] = useState(false)
  const [birthdays, setBirthdays] = useState(false)

  const handlepatientsTable = () => {
    setPatientsTable(true)
    setAppointmentsTable(false)
    setBirthdays(false)
  }

  const handleAppointmentsTable = () => {
    setPatientsTable(false)
    setAppointmentsTable(true)
    setBirthdays(false)
  }

  const handleBirthdays = () => {
    setPatientsTable(false)
    setAppointmentsTable(false)
    setBirthdays(true)
  }

  return (
    <>
      <div className="mx-auto mb-5 flex justify-center gap-4">
        <button className={patientsTable ? 'border-b-2 p-3' : ''} onClick={handlepatientsTable}>
          Pacientes
        </button>
        <button
          className={appointmentsTable ? 'border-b-2 p-3' : ''}
          onClick={handleAppointmentsTable}
        >
          Citas
        </button>
        <button className={birthdays ? 'border-b-2 p-3' : ''} onClick={handleBirthdays}>
          Cumpleaños
        </button>
      </div>

      {patientsTable && (
        <TableBody
          search={search}
          toggleNewHistory={toggleNewHistory}
          toggleNewAppointment={toggleNewAppointment}
          toggleNewSession={toggleNewSession}
        />
      )}

      {appointmentsTable && <Appoinments />}

      {birthdays && <Birthdays />}
    </>
  )
}

export default Home
