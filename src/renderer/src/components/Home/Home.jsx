import { useState } from 'react'
import TableBody from '../Pacientes/TableBody'
import Appoinments from '../Appoinments/Appoinments'
import useCitas from '../../store/citasStore'

const Home = ({ search, toggleNewAppointment, toggleNewHistory }) => {
  const [patientsTable, setPatientsTable] = useState(true)

  const citas = useCitas((state) => state.citas)

  return (
    <>
      <div className="mx-auto mb-5 flex w-[300px] justify-center gap-4">
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
        />
      ) : (
        <Appoinments />
      )}
    </>
  )
}

export default Home
