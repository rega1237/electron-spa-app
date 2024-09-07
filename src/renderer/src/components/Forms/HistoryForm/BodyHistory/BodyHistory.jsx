import { useState } from 'react'
import usePaciente from '../../../../store/pacienteStore'
import useHistoriaCorporal from '../../../../store/bodyHistoryStore'

import InputCheckbox from '../../../UI/InputCheckbox'
import InputText from '../../../UI/InputText'

import {
  alergias,
  bodyClinicBackground,
  motivoConsulta,
  antecedentesQuirurgicos
} from '../../../../Constants/bodyFormConstants'

import { handleCheckBox, handleText, handleTextArea, handleDate } from '../handleFunctions'

const BodyHistory = ({ handleToggleModal }) => {
  const paciente = usePaciente((state) => state.paciente)
  const addHistoriaCorporal = useHistoriaCorporal((state) => state.addHistoriaCorporal)
  const [alergiasForm, setAlergias] = useState(alergias)
  const [bodyClinic, setBodyClinic] = useState(bodyClinicBackground)
  const [motivo, setMotivo] = useState(motivoConsulta)
  const [antecedentesQuirurgicosForm, setAntecedentesQuirurgicos] =
    useState(antecedentesQuirurgicos)
  const [notas, setNotas] = useState('')
  const date = handleDate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendData = {
      paciente_id: paciente.id,
      alergias_medicamentos: alergiasForm.Medicamentos,
      alergias_cosmeticos: alergiasForm.Cosmeticos,
      alergias_perfumes: alergiasForm.Perfumes,
      alergias_otros: alergiasForm.Otros,
      clinic_diabetes: bodyClinic.Diabetes,
      clinic_respiratorios: bodyClinic.Respiratorios,
      clinic_cardiacos: bodyClinic.Cardiacos,
      clinic_digestivos: bodyClinic.Digestivos,
      clinic_estrenimiento: bodyClinic.Estreñimiento,
      clinic_marcapasos: bodyClinic.Marcapasos,
      clinic_protesis: bodyClinic.Protesis,
      clinic_ant_oncologicos: bodyClinic['Ant Oncologicos'],
      clinic_tiroides: bodyClinic.Tiroides,
      motivo_flacidez: motivo['Flacidez Estrias o Celulitis'],
      motivo_cuidado_piel: motivo['Cuidado de la piel'],
      motivo_tratamiento_fisioterapeutico: motivo['Tratamiento Fisioterapeutico'],
      motivo_estres: motivo['Estres/Ansiedad/Insomnio'],
      motivo_otros: motivo.Otros,
      ant_quirur_implantes: antecedentesQuirurgicosForm.Implantes,
      ant_quirur_cirugia: antecedentesQuirurgicosForm.Cirugia,
      corporal_notas: notas,
      fecha_historia: date
    }

    await addHistoriaCorporal(sendData)

    handleToggleModal()
  }

  return (
    <>
      <form
        className="no-scrollbar h-[70vh] w-[70%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="w-[200px] border-b text-lg font-semibold">Atecedentes Clinicos</h3>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2">
            {Object.keys(alergias).map((item, index) => {
              return (
                <InputText
                  item={item}
                  key={index}
                  onChange={(e) => handleText(e, alergiasForm, setAlergias)}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Atecedentes Estéticos</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {Object.keys(bodyClinicBackground).map((item, index) => {
              return (
                <InputCheckbox
                  key={index}
                  item={item}
                  onChange={(e) => {
                    handleCheckBox(e, bodyClinic, setBodyClinic)
                  }}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Tipologia cutánea</h3>
          <div className="mt-3 grid grid-cols-2 items-center gap-2">
            {Object.keys(motivoConsulta).map((item, index) => {
              if (item === 'Otro') {
                return (
                  <InputText
                    item={item}
                    key={index}
                    onChange={(e) => {
                      handleText(e, motivo, setMotivo)
                    }}
                  />
                )
              }

              return (
                <InputCheckbox
                  key={index}
                  item={item}
                  onChange={(e) => {
                    handleCheckBox(e, motivo, setMotivo)
                  }}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">
            Cuídado habitual de la piel
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {Object.keys(antecedentesQuirurgicos).map((item, index) => {
              return (
                <InputText
                  item={item}
                  key={index}
                  onChange={(e) => {
                    handleText(e, antecedentesQuirurgicosForm, setAntecedentesQuirurgicos)
                  }}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Notas</h3>
          <div className="mt-3">
            <textarea
              className="h-24 w-full p-2"
              placeholder="Escribe aqui cualquier dato extra..."
              onChange={(e) => handleTextArea(e, setNotas)}
            ></textarea>
          </div>
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

export default BodyHistory
