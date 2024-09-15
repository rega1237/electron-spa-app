import { createPortal } from 'react-dom'
import NewClient from '../Forms/NewPatientForm/NewClient'
import Newappointment from '../Forms/NewAppointment/NewAppointment'
import NewHistory from '../Forms/HistoryForm/NewHistory'
import Dialogue from '../UI/Dialogue/Dialogue'
import NewSessions from '../Forms/Sessions/NewSessions'
import DisplaySesionBody from '../Sesiones/DisplaySesion/DisplaySesionBody'
import EditSessions from '../Forms/Sessions/EditSessions'

const ModalAccount = ({ formType, handleToggleModal, newHistoryAction, type, deleteRecord }) => {
  const modalContainer = document.getElementById('modal')

  if (!modalContainer) {
    return null
  }

  if (formType === 'newClient') {
    return createPortal(
      <NewClient
        handleToggleModal={handleToggleModal}
        newHistoryAction={newHistoryAction}
        type={type}
      />,
      modalContainer
    )
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
  } else if (formType === 'newSession') {
    return createPortal(<NewSessions handleToggleModal={handleToggleModal} />, modalContainer)
  } else if (formType === 'editSession') {
    return createPortal(
      <EditSessions handleToggleModal={handleToggleModal} sesion={type} />,
      modalContainer
    )
  } else if (formType === 'displaySession') {
    return createPortal(
      <DisplaySesionBody sesion={type} handleToggleModal={handleToggleModal} />,
      modalContainer
    )
  }
}

export default ModalAccount
