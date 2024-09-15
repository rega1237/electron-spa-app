import { useEffect, useState } from 'react'
import usePaciente from '../../../store/pacienteStore.js'

import FacialSession from './FacialSession/FacialSession'
import BodySession from './BodySession/BodySession'

const EditSessions = ({ handleToggleModal, sesion }) => {
  const [facialForm, setFacialForm] = useState(true)

  const paciente = usePaciente((state) => state.paciente)

  useEffect(() => {
    if (sesion.sesion === 'Corporal') {
      setFacialForm(false)
    }
  }, [])

  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[70%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">{`Editar Sesion ${paciente.nombre_completo}`}</h2>
            <button className="text-muted-foreground" onClick={() => handleToggleModal()}>
              Cerrar
            </button>
          </div>

          {facialForm ? (
            <FacialSession handleToggleModal={handleToggleModal} action={'edit'} sesion={sesion} />
          ) : (
            <BodySession handleToggleModal={handleToggleModal} action={'edit'} sesion={sesion} />
          )}
        </div>
      </div>
    </>
  )
}

export default EditSessions
