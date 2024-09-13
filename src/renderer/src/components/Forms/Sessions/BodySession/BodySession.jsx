import { useState } from 'react'

import { handleText, handleTextArea, handleDate } from '../../HistoryForm/handleFunctions'
import { ipcHandleImages, handleImageInput } from '../../../../Constants/ipcHandle'
import { medidas } from '../../../../Constants/bodySessionConstants'

import useSesionesStore from '../../../../store/sesionesStore'
import usePaciente from '../../../../store/pacienteStore'

import InputText from '../../../UI/Inputs/InputText'

const BodySession = ({ handleToggleModal }) => {
  const [medidasForm, setMedidas] = useState(medidas)
  const [notas, setNotas] = useState('')
  const [nextSesion, setNextSesion] = useState('')
  const [images, setImages] = useState([])

  const addNewBodySession = useSesionesStore((state) => state.addSesionCorporal)

  const date = handleDate()

  const paciente = usePaciente((state) => state.paciente)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      peso: medidasForm.Peso,
      cintura: medidasForm.Cintura,
      cadera: medidasForm.Cadera,
      abdomen: medidasForm.Abdomen,
      brazo_der: medidasForm['Brazo derecho'],
      brazo_izq: medidasForm['Brazo izquierdo'],
      muslo_der: medidasForm['Muslo derecho'],
      muslo_izq: medidasForm['Muslo izquierdo'],
      pant_der: medidasForm['Pantorrilla derecha'],
      pant_izq: medidasForm['Pantorrilla izquierda'],
      prox_sesion: nextSesion,
      notas: notas,
      fecha: date,
      paciente_id: paciente.id
    }

    const newSession = addNewBodySession(data)

    if (newSession) {
      ipcHandleImages(images, paciente['nombre_completo'], date, paciente['cedula'], 'corporal')
    }

    handleToggleModal()
  }

  return (
    <>
      <form
        className="no-scrollbar h-[70vh] w-[70%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Peso & Medidas</h3>
          <div className="mt-3 grid lg:grid-cols-2">
            {Object.keys(medidas).map((item, index) => {
              return (
                <InputText
                  item={item}
                  key={index}
                  onChange={(e) => handleText(e, medidasForm, setMedidas)}
                  value={medidasForm[item]}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex w-[200px] flex-col gap-2">
          <label htmlFor="date">Proxima Sesion</label>
          <input
            type="date"
            id="date"
            className="p-1"
            value={nextSesion}
            onChange={(e) => setNextSesion(e.target.value)}
          />
        </div>

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

export default BodySession
