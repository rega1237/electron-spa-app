import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePaciente } from '../../store/store'

const Paciente = () => {
  const { pacienteID } = useParams()

  const pacientes = usePaciente((state) => state.pacientes)
  const paciente = usePaciente((state) => state.paciente)
  const setPaciente = usePaciente((state) => state.setPaciente)

  const handlePaciente = async (paciente) => {
    await setPaciente(paciente)
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
        </>
      )}
    </div>
  )
}

export default Paciente
