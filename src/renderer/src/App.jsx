import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Paciente from './components/Paciente/Paciente'
import ModalAccount from './components/Modal/ModalContainer'
import DisplayFacialHistory from './components/Display_Data/History_Facial/DisplayFacial'
import DisplayCorporalHistory from './components/Display_Data/History_Body/DisplayCorporal'

import useCitas from './store/citasStore'
import usePaciente from './store/pacienteStore'

function App() {
  const [isModalNewPatientOpen, setIsModalNewPatientOpen] = useState(false)
  const [isModalNewAppointmentOpen, setIsModalNewAppointmentOpen] = useState(false)
  const [isModalNewHistoryOpen, setIsModalNewHistoryOpen] = useState(false)
  const [isModalSessionOpen, setIsModalSessionOpen] = useState(false)
  const [newHistoryAction, setNewHistoryAction] = useState('')
  const [search, setSearch] = useState('')

  const getPacientes = usePaciente((state) => state.getPacientes)
  const getCitas = useCitas((state) => state.getCitas)

  useEffect(() => {
    getPacientes()
    getCitas()
  }, [])

  const handleToggleNewPatientModal = () => {
    setIsModalNewPatientOpen(!isModalNewPatientOpen)
  }

  const handleToggleNewAppointmentModal = () => {
    setIsModalNewAppointmentOpen(!isModalNewAppointmentOpen)
  }

  const handleToggleNewHistoryModal = (action) => {
    setIsModalNewHistoryOpen(!isModalNewHistoryOpen)
    setNewHistoryAction(action)
  }

  const handleToggleNewSessionModal = () => {
    setIsModalSessionOpen(!isModalSessionOpen)
  }

  return (
    <>
      <Router>
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
          <Header handleToggleModal={handleToggleNewPatientModal} setSearch={setSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  search={search}
                  toggleNewAppointment={handleToggleNewAppointmentModal}
                  toggleNewHistory={handleToggleNewHistoryModal}
                  toggleNewSession={handleToggleNewSessionModal}
                />
              }
            />
            <Route
              path="/paciente/:pacienteID"
              element={
                <Paciente
                  toggleNewHistory={handleToggleNewHistoryModal}
                  newHistoryAction={newHistoryAction}
                />
              }
            />
            <Route path="/paciente/:pacienteID/historiaFacial" element={<DisplayFacialHistory />} />
            <Route
              path="/paciente/:pacienteID/historiaCorporal"
              element={<DisplayCorporalHistory />}
            />
          </Routes>
        </div>

        {isModalNewPatientOpen && (
          <ModalAccount formType="newClient" handleToggleModal={handleToggleNewPatientModal} />
        )}

        {isModalNewAppointmentOpen && (
          <ModalAccount
            formType="newAppointment"
            handleToggleModal={handleToggleNewAppointmentModal}
          />
        )}

        {isModalNewHistoryOpen && (
          <ModalAccount
            formType="newHistory"
            newHistoryAction={newHistoryAction}
            handleToggleModal={handleToggleNewHistoryModal}
          />
        )}

        {isModalSessionOpen && (
          <ModalAccount formType="newSession" handleToggleModal={handleToggleNewSessionModal} />
        )}
      </Router>
    </>
  )
}

export default App
