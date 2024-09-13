import { useState } from 'react'
import usePaciente from '../../../store/pacienteStore.js'

import FacialSession from './FacialSession/FacialSession'
import BodySession from './BodySession/BodySession'

const NewSessions = ({ handleToggleModal }) => {
  const [facialForm, setFacialForm] = useState(true)

  const paciente = usePaciente((state) => state.paciente)

  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[70%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">{`Nueva Sesion ${paciente.nombre_completo}`}</h2>
            <button className="text-muted-foreground" onClick={() => handleToggleModal()}>
              Cerrar
            </button>
          </div>
          <div className="w-[70%]">
            <button
              className={`w-[50%] py-5 text-white ${
                facialForm ? 'bg-primary-foreground' : 'border-2 bg-primary'
              }`}
              onClick={() => setFacialForm(true)}
            >
              Facial
            </button>
            <button
              className={`w-[50%] py-5 text-white ${
                facialForm ? 'border-2 bg-primary' : 'bg-primary-foreground'
              }`}
              onClick={() => setFacialForm(false)}
            >
              Corporal
            </button>
          </div>
          {facialForm ? (
            <FacialSession handleToggleModal={handleToggleModal} />
          ) : (
            <BodySession handleToggleModal={handleToggleModal} />
          )}
        </div>
      </div>
    </>
  )
}

export default NewSessions
