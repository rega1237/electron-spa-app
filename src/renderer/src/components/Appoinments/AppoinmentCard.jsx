import { useState } from 'react'
import { Link } from 'react-router-dom'

import ModalAccount from '../Modal/ModalContainer'

import usePaciente from '../../store/pacienteStore'
import useCitas from '../../store/citasStore'

const AppoinmentCard = ({ cita }) => {
  const [isModalOpenAppoinment, setIsModalOpenAppoiment] = useState(false)

  const pacientes = usePaciente((state) => state.pacientes)
  const deleteCita = useCitas((state) => state.deleteCita)

  const paciente = pacientes.find((paciente) => paciente.id === cita.paciente_id)
  const fecha = cita.fecha
  const hora = cita.hora
  const motivo = cita.motivo

  const handleDialogueModal = () => {
    setIsModalOpenAppoiment(!isModalOpenAppoinment)
  }

  const handleDelete = () => {
    try {
      deleteCita(cita.id)
      handleDialogueModal()
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la cita')
    }
  }

  return (
    <>
      <div className="flex w-full max-w-sm flex-col rounded-xl bg-primary-foreground p-4 text-white shadow-lg">
        <div className="flex items-center justify-between md:flex-col lg:flex-row">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-4 rounded-full border border-primary"></div>
            <Link to={`/paciente/${paciente.id}`} className="hover:text-primary">
              <div className="text-md font-bold">{paciente['nombre_completo']}</div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <p>{fecha}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between md:flex-col lg:flex-row">
          <div className="flex items-center space-x-4">
            <p>{motivo}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p>{hora}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3 text-sm font-bold text-gray-500">
          <button className="hover:text-primary" onClick={handleDialogueModal}>
            Eliminar
          </button>
        </div>
      </div>
      {isModalOpenAppoinment && (
        <ModalAccount
          formType="dialogue"
          handleToggleModal={handleDialogueModal}
          type="cita"
          deleteRecord={handleDelete}
        />
      )}
    </>
  )
}

export default AppoinmentCard
