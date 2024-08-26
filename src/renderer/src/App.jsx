import { useState } from 'react'
import { createClient } from '@libsql/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import TableBody from './components/Pacientes/TableBody'
import Paciente from './components/Paciente/Paciente'
import ModalAccount from './components/Modal/ModalContainer'

import useGetPacientes from './hooks/useGetPacientes'
import useGetCitas from './hooks/useGetCitas'

function App() {
  const [isModalNewPatientOpen, setIsModalNewPatientOpen] = useState(false)
  const [isModalNewAppointmentOpen, setIsModalNewAppointmentOpen] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [citas, setCitas] = useState([])
  const [search, setSearch] = useState('')

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const turso = createClient({
    url: import.meta.env.VITE_URL,
    authToken: import.meta.env.VITE_API_KEY
  })

  useGetPacientes({ setPacientes, turso })
  useGetCitas({ setCitas, turso })

  const handleToggleNewPatientModal = () => {
    setIsModalNewPatientOpen(!isModalNewPatientOpen)
  }

  const handleToggleNewAppointmentModal = () => {
    setIsModalNewAppointmentOpen(!isModalNewAppointmentOpen)
  }

  return (
    <>
      <Router>
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
          <Header
            handleToggleModal={handleToggleNewPatientModal}
            pacientes={pacientes}
            setSearch={setSearch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <TableBody
                  pacientes={pacientes}
                  search={search}
                  toggleNewAppointment={handleToggleNewAppointmentModal}
                  setPaciente={setPaciente}
                />
              }
            />
            <Route path="/:pacienteID" element={<Paciente pacientes={pacientes} />} />
          </Routes>
        </div>

        {isModalNewPatientOpen && (
          <ModalAccount
            formType="newClient"
            handleToggleModal={handleToggleNewPatientModal}
            turso={turso}
            setInfo={setPacientes}
          />
        )}

        {isModalNewAppointmentOpen && (
          <ModalAccount
            formType="newAppointment"
            handleToggleModal={handleToggleNewAppointmentModal}
            turso={turso}
            paciente={paciente}
            setInfo={setCitas}
          />
        )}
      </Router>
    </>
  )
}

export default App
