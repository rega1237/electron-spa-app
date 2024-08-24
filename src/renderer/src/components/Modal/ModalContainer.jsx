import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewClient'

const ModalAccount = ({ formType, handleToggleModal }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(<NewClient handleToggleModal={handleToggleModal} />, modalContainer)
  }
}

export default ModalAccount
