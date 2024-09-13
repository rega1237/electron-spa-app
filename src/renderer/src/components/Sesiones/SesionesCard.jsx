import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSesion from '../../store/sesionesStore'
import usePaciente from '../../store/pacienteStore'
import ModalAccount from '../Modal/ModalContainer'

const SesionesCard = ({ sesion }) => {
  const paciente = usePaciente((state) => state.paciente)

  const [isModalDialogueOpen, setIsModalDialogueOpen] = useState(false)
  const [displaySesion, setDisplaySesion] = useState(false)

  const handleDialogueModal = () => {
    setIsModalDialogueOpen(!isModalDialogueOpen)
  }

  const handleDisplaySession = () => {
    setDisplaySesion(!displaySesion)
  }

  return (
    <>
      <div className="flex w-full max-w-md flex-col rounded-xl bg-primary-foreground p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-4 rounded-full border border-primary"></div>
            <div className="text-md font-bold">{`Sesion ${sesion.sesion === 'Facial' ? 'facial' : 'corporal'}`}</div>
          </div>
          <div className="flex items-center space-x-4">
            <p>{sesion.fecha}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3 text-sm font-bold text-gray-500">
          <button className="hover:text-primary" onClick={handleDisplaySession}>
            Abrir
          </button>
          <button className="hover:text-primary" onClick={() => console.log('hola')}>
            Editar
          </button>
          <button className="hover:text-primary" onClick={() => console.log('hola')}>
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
      {displaySesion && (
        <ModalAccount
          formType={'displaySession'}
          handleToggleModal={handleDisplaySession}
          type={sesion}
        />
      )}
    </>
  )
}

export default SesionesCard