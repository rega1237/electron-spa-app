import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewClient'
import Newappointment from '../Forms/NewAppointment'

const ModalAccount = ({ formType, handleToggleModal, turso, setInfo, paciente }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(
      <NewClient handleToggleModal={handleToggleModal} turso={turso} setInfo={setInfo} />,
      modalContainer
    )
  } else if (formType === 'newAppointment') {
    return createPortal(
      <Newappointment
        handleToggleModal={handleToggleModal}
        turso={turso}
        setInfo={setInfo}
        paciente={paciente}
      />,
      modalContainer
    )
  }
}

export default ModalAccount
