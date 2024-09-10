import { useState } from 'react'
import { Link } from 'react-router-dom'
import useHistoriaFacial from '../../../store/facialHistoryStore'
import useHistoriaCorporal from '../../../store/bodyHistoryStore'
import usePaciente from '../../../store/pacienteStore'
import ModalAccount from '../../Modal/ModalContainer'

const HistoryCard = ({ type, toggleNewHistory }) => {
  const paciente = usePaciente((state) => state.paciente)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const deleteHistoriaFacial = useHistoriaFacial((state) => state.deleteHistoriaFacial)
  const deleteHistoriaCorporal = useHistoriaCorporal((state) => state.deleteHistoriaCorporal)

  const [isModalDialogueOpen, setIsModalDialogueOpen] = useState(false)

  const handleDialogueModal = () => {
    setIsModalDialogueOpen(!isModalDialogueOpen)
  }

  const deleteHistory = (type) => {
    try {
      if (type === 'Historia Facial') {
        const id = historiaFacial.id
        deleteHistoriaFacial(id)
        handleDialogueModal()
      } else if (type === 'Historia Corporal') {
        const id = historiaCorporal.id
        deleteHistoriaCorporal(id)
        handleDialogueModal()
      }
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la historia')
    }
  }

  return (
    <>
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
          <button className="hover:text-primary" onClick={() => toggleNewHistory('edit')}>
            Editar
          </button>
          <button className="hover:text-primary" onClick={handleDialogueModal}>
            Eliminar
          </button>
        </div>
      </div>
      {isModalDialogueOpen && (
        <ModalAccount
          formType="dialogue"
          handleToggleModal={handleDialogueModal}
          type={type}
          deleteRecord={deleteHistory}
        />
      )}
    </>
  )
}

export default HistoryCard
