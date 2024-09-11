import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import HistoryCard from './History_card/HistoryCard'
import AppoinmentCard from '../Appoinments/AppoinmentCard'

import useHistoriaFacial from '../../store/facialHistoryStore'
import useCitas from '../../store/citasStore'
import usePaciente from '../../store/pacienteStore'
import useHistoriaCorporal from '../../store/bodyHistoryStore'

const Paciente = ({ toggleNewHistory, newHistoryAction }) => {
  const { pacienteID } = useParams()

  const [citas, setCitas] = useState([])

  const pacientes = usePaciente((state) => state.pacientes)
  const paciente = usePaciente((state) => state.paciente)
  const setPaciente = usePaciente((state) => state.setPaciente)
  const citasStore = useCitas((state) => state.citas)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const getHistoriaFacial = useHistoriaFacial((state) => state.getHistoriaFacial)
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const getHistoriaCorporal = useHistoriaCorporal((state) => state.getHistoriaCorporal)

  const getCita = (paciente) => {
    const citasPaciente = citasStore.filter((cita) => cita.paciente_id === paciente.id)
    setCitas(citasPaciente)
  }

  const handlePaciente = async (paciente) => {
    await setPaciente(paciente)
    await getHistoriaFacial(paciente)
    await getHistoriaCorporal(paciente)
    getCita(paciente)
  }

  useEffect(() => {
    const searchPaciente = pacientes.find((paciente) => paciente.id === parseInt(pacienteID))
    handlePaciente(searchPaciente)
  }, [pacienteID, citasStore])

  return (
    <>
      <Link to={`/`}>
        <button type="button" class="px-3 py-2 text-primary-foreground hover:text-primary">
          <div class="flex flex-row align-middle">
            <svg
              class="mr-2 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p class="ml-2">Atras</p>
          </div>
        </button>
      </Link>
      <div>
        {paciente && (
          <>
            <h1 className="text-3xl font-bold">{paciente.nombre_completo}</h1>
            <div className="flex gap-3">
              <p>{paciente.cedula}</p>
              <p>{paciente.telefono}</p>
            </div>
            <div className="mt-3 flex gap-5">
              <button className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary">
                Editar
              </button>
              <button className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary">
                Eliminar
              </button>
            </div>

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

            <div className="mt-5">
              <h2 className="text-2xl font-bold">Citas</h2>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {citas.length === 0 && <p>No hay citas</p>}
                {citas.map((cita) => (
                  <AppoinmentCard key={cita.id} cita={cita} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Paciente
