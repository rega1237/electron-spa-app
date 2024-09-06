import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useHistoriaFacial from '../../store/facialHistoryStore'
import useCitas from '../../store/citasStore'
import usePaciente from '../../store/pacienteStore'

const Paciente = () => {
  const { pacienteID } = useParams()

  const [citas, setCitas] = useState([])

  const pacientes = usePaciente((state) => state.pacientes)
  const paciente = usePaciente((state) => state.paciente)
  const setPaciente = usePaciente((state) => state.setPaciente)
  const citasStore = useCitas((state) => state.citas)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const getHistoriaFacial = useHistoriaFacial((state) => state.getHistoriaFacial)

  const getCita = (paciente) => {
    const citasPaciente = citasStore.filter((cita) => cita.paciente_id === paciente.id)
    setCitas(citasPaciente)
  }

  const handlePaciente = async (paciente) => {
    await setPaciente(paciente)
    await getHistoriaFacial(paciente)
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
            <h2 className="text-2xl font-bold">Historia Facial</h2>
            <div className="mt-3">
              <p>{historiaFacial.length > 0 ? 'Diabetes' : 'No hay historias'}</p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-bold">Citas</h2>
            <div className="mt-3">
              <ul>
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
