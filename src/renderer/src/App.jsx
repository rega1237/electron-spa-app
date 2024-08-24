import { useState, useEffect } from 'react'
import { createClient } from '@libsql/client'

import Header from './components/Header/Header'
import TableBody from './components/Pacientes/TableBody'
import ModalAccount from './components/Modal/ModalContainer'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [search, setSearch] = useState('')

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  useEffect(() => {
    const storedPacientes = localStorage.getItem('pacientes')

    if (storedPacientes) {
      setPacientes(JSON.parse(storedPacientes))
      return
    }

    const getPacientes = async () => {
      try {
        const pacientes = await turso.execute('SELECT * FROM pacientes')
        setPacientes(pacientes.rows)
        localStorage.setItem('pacientes', JSON.stringify(pacientes.rows))
      } catch (error) {
        alert('Error al obtener los pacientes')
        console.error(error)
      }
    }

    getPacientes()
  }, [])

  const turso = createClient({
    url: import.meta.env.VITE_URL,
    authToken: import.meta.env.VITE_API_KEY
  })

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
        <Header handleToggleModal={handleToggleModal} pacientes={pacientes} setSearch={setSearch} />
        <TableBody pacientes={pacientes} search={search} />
      </div>

      {isModalOpen && (
        <ModalAccount
          formType="newClient"
          handleToggleModal={handleToggleModal}
          turso={turso}
          setInfo={setPacientes}
        />
      )}
    </>
  )
}

export default App
