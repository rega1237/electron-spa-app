import { useState } from 'react'

import { handleTextArea, handleDate } from '../../HistoryForm/handleFunctions'
import { ipcHandleImages, handleImageInput } from '../../../../Constants/ipcHandle'
import usePaciente from '../../../../store/pacienteStore'
import useSesion from '../../../../store/sesionesStore'

const FacialSession = ({ handleToggleModal }) => {
  const [notas, setNotas] = useState('')
  const [images, setImages] = useState([])

  const paciente = usePaciente((state) => state.paciente)
  const addSesionFacial = useSesion((state) => state.addSesionFacial)

  const date = handleDate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createSesion = await addSesionFacial(notas, date, paciente)
    if (createSesion) {
      ipcHandleImages(images, paciente['nombre_completo'], date, paciente['cedula'], 'facial')
      handleToggleModal()
    }
  }

  return (
    <>
      <form
        className="no-scrollbar h-[70vh] w-[70%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Notas</h3>
          <div className="mt-3">
            <textarea
              className="h-24 w-full p-2"
              placeholder="Escribe aqui cualquier dato extra..."
              onChange={(e) => handleTextArea(e, setNotas)}
              value={notas}
            ></textarea>
          </div>
        </div>

        <div>
          <label htmlFor="imageInput">Selecciona las imágenes:</label>
          <input
            type="file"
            id="imageInput"
            multiple
            accept="image/*"
            onChange={(e) => handleImageInput(e, setImages)}
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button className="w-[300px] bg-primary-foreground p-3 text-primary hover:bg-white hover:text-primary-foreground">
            Guardar
          </button>
        </div>
      </form>
    </>
  )
}

export default FacialSession
