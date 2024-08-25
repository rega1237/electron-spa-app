import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Paciente = ({ pacientes }) => {
  const { pacienteID } = useParams()

  const [paciente, setPaciente] = useState(null)

  useEffect(() => {
    const paciente = pacientes.find((paciente) => paciente.id == pacienteID)
    setPaciente(paciente)
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
