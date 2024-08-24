import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewClient'

const ModalAccount = ({ formType, handleToggleModal, turso, setInfo }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(
      <NewClient handleToggleModal={handleToggleModal} turso={turso} setInfo={setInfo} />,
      modalContainer
    )
  }
}

export default ModalAccount
