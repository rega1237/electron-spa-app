import { useState } from 'react'
import TableBody from '../Pacientes/TableBody'
import Appoinments from '../Appoinments/Appoinments'
import useCitas from '../../store/citasStore'

const Home = ({ search, toggleNewAppointment, toggleNewHistory, toggleNewSession }) => {
  const [patientsTable, setPatientsTable] = useState(true)

  return (
    <>
      <div className="mx-auto mb-5 flex justify-center gap-4">
        <button
          className={patientsTable ? 'border-b-2 p-3' : ''}
          onClick={() => setPatientsTable(true)}
        >
          Pacientes
        </button>
        <button
          className={!patientsTable ? 'border-b-2 p-3' : ''}
          onClick={() => setPatientsTable(false)}
        >
          Citas
        </button>
      </div>

      {patientsTable ? (
        <TableBody
          search={search}
          toggleNewHistory={toggleNewHistory}
          toggleNewAppointment={toggleNewAppointment}
          toggleNewSession={toggleNewSession}
        />
      ) : (
        <Appoinments />
      )}
    </>
  )
}

export default Home
