import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import HistoryCard from './History_card/HistoryCard'
import AppoinmentCard from '../Appoinments/AppoinmentCard'
import SesionesCard from '../Sesiones/SesionesCard'

import useHistoriaFacial from '../../store/facialHistoryStore'
import useCitas from '../../store/citasStore'
import usePaciente from '../../store/pacienteStore'
import useHistoriaCorporal from '../../store/bodyHistoryStore'
import useSesion from '../../store/sesionesStore'
import ModalAccount from '../Modal/ModalContainer'
import Loading from '../UI/Loading/Loading'

const Paciente = ({ toggleNewHistory, newHistoryAction }) => {
  const { pacienteID } = useParams()
  const navigate = useNavigate()

  const [citas, setCitas] = useState([])
  const [editPaciente, setEditPaciente] = useState(false)
  const [displayHistory, setDisplayHistory] = useState(true)
  const [displayAppoinments, setDisplayAppoinments] = useState(false)
  const [displaySesiones, setDisplaySesiones] = useState(false)
  const [displayDialogue, setDisplayDialogue] = useState(false)
  const [pacienteLoaded, setPacienteLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  const pacientes = usePaciente((state) => state.pacientes)
  const paciente = usePaciente((state) => state.paciente)
  const setPaciente = usePaciente((state) => state.setPaciente)
  const citasStore = useCitas((state) => state.citas)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const getHistoriaFacial = useHistoriaFacial((state) => state.getHistoriaFacial)
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const getHistoriaCorporal = useHistoriaCorporal((state) => state.getHistoriaCorporal)
  const sesionesStore = useSesion((state) => state.sesiones)
  const getSesiones = useSesion((state) => state.getSesiones)
  const deletePaciente = usePaciente((state) => state.deletePaciente)

  const getCita = (paciente) => {
    const citasPaciente = citasStore.filter((cita) => cita.paciente_id === paciente.id)
    setCitas(citasPaciente)
  }

  const handleDeletePaciente = async (paciente) => {
    await deletePaciente(paciente.id)
    navigate('/')
  }

  const handlePaciente = async (paciente) => {
    const pacienteID = paciente.id
    await setPaciente(paciente)
    await getHistoriaFacial(paciente)
    await getHistoriaCorporal(paciente)
    await getSesiones(pacienteID)
    getCita(paciente)
  }

  const handleDisplayHistory = () => {
    setDisplayHistory(true)
    setDisplayAppoinments(false)
    setDisplaySesiones(false)
  }

  const handleDisplayAppoinments = () => {
    setDisplayHistory(false)
    setDisplayAppoinments(true)
    setDisplaySesiones(false)
  }

  const handleDisplaySesiones = () => {
    setDisplayHistory(false)
    setDisplayAppoinments(false)
    setDisplaySesiones(true)
  }

  const handleToggleDialogue = () => {
    setDisplayDialogue(!displayDialogue)
  }

  const handleToggleEditPatient = () => {
    setEditPaciente(!editPaciente)
  }

  const getAge = (date) => {
    const today = new Date()
    const birthDate = new Date(date)
    const age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }

    return age
  }

  useEffect(() => {
    const searchPaciente = () => {
      const searchPaciente = pacientes.find((paciente) => paciente.id === parseInt(pacienteID))
      handlePaciente(searchPaciente)
      setPacienteLoaded(true)
      setLoading(false)
    }

    searchPaciente()
  }, [pacienteID, citasStore])

  useEffect(() => {
    const updateSessions = async () => {
      const pacienteID = paciente.id
      await getSesiones(pacienteID)
    }
    if (pacienteLoaded) {
      updateSessions()
    }
  }, [sesionesStore.length])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Link to={`/`}>
        <button type="button" className="px-3 py-2 text-primary-foreground hover:text-primary">
          <div className="flex flex-row align-middle">
            <svg
              className="mr-2 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="ml-2">Atras</p>
          </div>
        </button>
      </Link>

      <div>
        {paciente && (
          <>
            <h1 className="text-3xl font-bold">{paciente.nombre_completo}</h1>
            <div className="flex gap-3">
              <p>{paciente.cedula}</p> |<p>{paciente.telefono}</p> |
              <p>{`${getAge(paciente['fecha_de_nacimiento'])} años`}</p>
            </div>
            <div className="mt-3 flex gap-5">
              <button
                className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary"
                onClick={handleToggleEditPatient}
              >
                Editar
              </button>
              <button
                className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary"
                onClick={handleToggleDialogue}
              >
                Eliminar
              </button>
            </div>

            <div className="mx-auto my-5 flex gap-4">
              <button
                className={displayHistory ? 'border-b-2 p-3' : ''}
                onClick={handleDisplayHistory}
              >
                Historias
              </button>
              <button
                className={displayAppoinments ? 'border-b-2 p-3' : ''}
                onClick={handleDisplayAppoinments}
              >
                Citas
              </button>
              <button
                className={displaySesiones ? 'border-b-2 p-3' : ''}
                onClick={handleDisplaySesiones}
              >
                Sesiones
              </button>
            </div>

            {displayHistory && (
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Historias</h2>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  {Object.keys(historiaFacial).length > 0 && (
                    <HistoryCard
                      type="Historia Facial"
                      toggleNewHistory={toggleNewHistory}
                      newHistoryAction={newHistoryAction}
                    />
                  )}
                  {Object.keys(historiaCorporal).length > 0 && (
                    <HistoryCard
                      type="Historia Corporal"
                      toggleNewHistory={toggleNewHistory}
                      newHistoryAction={newHistoryAction}
                    />
                  )}
                  {Object.keys(historiaFacial).length === 0 &&
                    Object.keys(historiaCorporal).length === 0 && <p>No hay historias</p>}
                </div>
              </div>
            )}

            {displayAppoinments && (
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Citas</h2>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  {citas.length === 0 && <p>No hay citas</p>}
                  {citas.map((cita) => (
                    <AppoinmentCard key={cita.id} cita={cita} />
                  ))}
                </div>
              </div>
            )}

            {displaySesiones && (
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Sesiones</h2>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  {sesionesStore.length === 0 && <p>No hay sesiones</p>}
                  {sesionesStore.map((sesion) => (
                    <SesionesCard key={`${sesion.id}-${sesion.sesion}`} sesion={sesion} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {displayDialogue && (
        <ModalAccount
          handleToggleModal={handleToggleDialogue}
          formType="dialogue"
          deleteRecord={handleDeletePaciente}
          type={paciente}
        />
      )}

      {editPaciente && (
        <ModalAccount
          formType="newClient"
          handleToggleModal={handleToggleEditPatient}
          newHistoryAction={'edit'}
          type={paciente}
        />
      )}
    </>
  )
}

export default Paciente
