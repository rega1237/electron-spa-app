import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import HistoryCard from './History_card/HistoryCard'

import useHistoriaFacial from '../../store/facialHistoryStore'
import useCitas from '../../store/citasStore'
import usePaciente from '../../store/pacienteStore'
import useHistoriaCorporal from '../../store/bodyHistoryStore'

const Paciente = () => {
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
  }, [pacienteID])

  return (
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
            <div className="mt-3 flex gap-4">
              {Object.keys(historiaFacial).length > 0 && <HistoryCard type="Historia Facial" />}
              {Object.keys(historiaCorporal).length > 0 && <HistoryCard type="Historia Corporal" />}
              {Object.keys(historiaFacial).length === 0 &&
                Object.keys(historiaCorporal).length === 0 && <p>No hay historias</p>}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-bold">Citas</h2>
            <div className="mt-3">
              <ul>
                {citas.length === 0 && <p>No hay citas</p>}
                {citas.map((cita) => (
                  <li key={cita.id}>
                    <p>{cita.fecha}</p>
                    <p>{cita.hora}</p>
                    <p>{cita.motivo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Paciente
