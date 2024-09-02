import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewPatientForm/NewClient'
import Newappointment from '../Forms/NewAppointment/NewAppointment'
import NewHistory from '../Forms/HistoryForm/NewHistory'

const ModalAccount = ({ formType, handleToggleModal, turso, setInfo, paciente }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(<NewClient handleToggleModal={handleToggleModal} />, modalContainer)
  } else if (formType === 'newAppointment') {
    return createPortal(<Newappointment handleToggleModal={handleToggleModal} />, modalContainer)
  } else if (formType === 'newHistory') {
    return createPortal(<NewHistory handleToggleModal={handleToggleModal} />, modalContainer)
  }
}

export default ModalAccount
