import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewPatientForm/NewClient'
import Newappointment from '../Forms/NewAppointment/NewAppointment'
import NewHistory from '../Forms/HistoryForm/NewHistory'
import Dialogue from '../UI/Dialogue/Dialogue'

const ModalAccount = ({ formType, handleToggleModal, newHistoryAction, type, deleteRecord }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(<NewClient handleToggleModal={handleToggleModal} />, modalContainer)
  } else if (formType === 'newAppointment') {
    return createPortal(<Newappointment handleToggleModal={handleToggleModal} />, modalContainer)
  } else if (formType === 'newHistory') {
    return createPortal(
      <NewHistory handleToggleModal={handleToggleModal} newHistoryAction={newHistoryAction} />,
      modalContainer
    )
  } else if (formType === 'dialogue') {
    return createPortal(
      <Dialogue handleToggleModal={handleToggleModal} type={type} deleteRecord={deleteRecord} />,
      modalContainer
    )
  }
}

export default ModalAccount
