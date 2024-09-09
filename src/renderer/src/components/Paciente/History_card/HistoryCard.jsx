import { Link } from 'react-router-dom'
import useHistoriaFacial from '../../../store/facialHistoryStore'
import usePaciente from '../../../store/pacienteStore'

const HistoryCard = ({ type }) => {
  const paciente = usePaciente((state) => state.paciente)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)

  return (
    <div className="flex w-full max-w-md flex-col rounded-xl bg-primary-foreground p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-4 w-4 rounded-full border border-primary"></div>
          <div className="text-md font-bold">{type}</div>
        </div>
        <div className="flex items-center space-x-4">
          <p>{historiaFacial.fecha_historia}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3 text-sm font-bold text-gray-500">
        <Link
          to={
            type === 'Historia Facial'
              ? `/paciente/${paciente.id}/historiaFacial`
              : `/paciente/${paciente.id}/historiaCorporal`
          }
          className="hover:text-primary"
        >
          Abrir
        </Link>
        <button className="hover:text-primary">Editar</button>
        <button className="hover:text-primary">Eliminar</button>
      </div>
    </div>
  )
}

export default HistoryCard
