import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  facialHistoryClinicBackground,
  facialHistoryAestheticBackground,
  tipologiaCutanea,
  cuidadoPiel,
  patologiasCutaneas
} from '../../../../Constants/facialFormConstants'

import {
  handleCheckBox,
  handleSelect,
  handleText,
  handleTextArea,
  handleDate,
  setAllValuesFacial as setAllValues
} from '../handleFunctions'

import useHistoriaFacial from '../../../../store/facialHistoryStore'
import usePaciente from '../../../../store/pacienteStore'

import InputCheckbox from '../../../UI/Inputs/InputCheckbox'
import InputText from '../../../UI/Inputs/InputText'

const FacialHistory = ({ handleToggleModal, newHistoryAction }) => {
  const paciente = usePaciente((state) => state.paciente)
  const addHistoriaFacial = useHistoriaFacial((state) => state.addHistoriaFacial)
  const editHistoriaFacial = useHistoriaFacial((state) => state.editHistoriaFacial)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)

  const [facialClinic, setFacialClinic] = useState({ ...facialHistoryClinicBackground })
  const [facialAesthetic, setFacialAesthetic] = useState({ ...facialHistoryAestheticBackground })
  const [fototipo, setFototipo] = useState('')
  const [tipologia, setTipologia] = useState({ ...tipologiaCutanea })
  const [cuidadoDePiel, setCuidadoDePiel] = useState({ ...cuidadoPiel })
  const [patologias, setPatologias] = useState({ ...patologiasCutaneas })
  const [notas, setNotas] = useState('')

  const navigate = useNavigate()

  const date = handleDate()

  useEffect(() => {
    if (newHistoryAction === 'edit') {
      setAllValues(
        historiaFacial,
        setFacialClinic,
        setFacialAesthetic,
        setFototipo,
        setTipologia,
        setCuidadoDePiel,
        setPatologias,
        setNotas,
        fototipo
      )
    }
  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
  
      const SendData = {
        ...(newHistoryAction === 'edit' && { id: historiaFacial.id }),
        paciente_id: paciente.id,
        clinic_diabetes: facialClinic.Diabetes,
        clinic_cancer: facialClinic.Cancer,
        clinic_alergias: facialClinic.Alergias,
        clinic_anemia: facialClinic.Anemia,
        clinic_hipertension_arterial: facialClinic.Hipertensión,
        clinic_enfermedades_renales: facialClinic['Enfermedades Renales'],
        clinic_medicamentos_actuales: facialClinic['Medicamentos Actuales'],
        estetica_implante: facialAesthetic['Implante o injertos'],
        estetica_cirugias: facialAesthetic['Cirugias estéticas'],
        estetica_tratamientos: facialAesthetic['Tratamientos estéticos no invasivos'],
        estetica_botox: facialAesthetic.Botox,
        estetica_acido_hialuronico: facialAesthetic['Acido hialuronico'],
        estetica_mesoterapia: facialAesthetic['Mesoterapia facial'],
        estetica_dermapen: facialAesthetic.Dermapen,
        estetica_hilos_tensores: facialAesthetic['Hilos tensores'],
        estetica_otros: facialAesthetic.Otros,
        tipologia_seca: tipologia.Seca,
        tipologia_normal: tipologia.Normal,
        tipologia_grasa: tipologia.Grasa,
        tipologia_mixta: tipologia.Mixta,
        tipologia_sensible: tipologia.Sensible,
        tipologia_asfixiada: tipologia.Asfixiada,
        tipologia_deshidratada: tipologia.Deshidratada,
        tipologia_desvitalizada: tipologia.Desvitalizada,
        tipologia_otro: tipologia.Otro,
        fototipo_piel: fototipo,
        cuidado_limpieza: cuidadoDePiel.Limpieza,
        cuidado_hidratacion: cuidadoDePiel.Hidratacion,
        cuidado_proteccion_solar: cuidadoDePiel['Proteccion solar'],
        cuidado_exfoliacion: cuidadoDePiel.Exfoliacion,
        cuidado_limpieza_profunda: cuidadoDePiel['Limpieza profunda'],
        cuidado_mascarillas: cuidadoDePiel.Mascarillas,
        cuidado_otro: cuidadoDePiel.Otro,
        patologias_eritema: patologias.Eritema,
        patologias_comedones: patologias.Comedones,
        patologias_pustulas: patologias.Pustulas,
        patologias_cicatrices: patologias.Cicatrices,
        patologias_papulas: patologias.Papulas,
        patologias_millium: patologias.Millium,
        patologias_vitiligo: patologias.Vitiligo,
        patologias_melasma: patologias.Melasma,
        patologias_arrugas: patologias.Arrugas,
        patologias_efelides: patologias.Efelides,
        patologias_hiperpigmentaciones: patologias.Hiperpigmentaciones,
        patologias_rosacea: patologias.Rosacea,
        patologias_piel_tendencia_acneica: patologias['Piel con tendencia acneica'],
        patologias_tipo_acne: patologias['Tipo de acne'],
        patologias_grado_acne: patologias['Grado de acne'],
        patologias_causas_acne: patologias['Causas del acne'],
        facial_notas: notas,
        fecha_historia: date
      }
  
      if (newHistoryAction === 'edit') {
        await editHistoriaFacial(SendData)
      } else {
        await addHistoriaFacial(SendData)
      }
  
      handleToggleModal()
      navigate(`/paciente/${paciente.id}/historiaFacial`)
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <form
        className="no-scrollbar h-[70vh] w-[70%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="w-[200px] border-b text-lg font-semibold">Atecedentes Clinicos</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {Object.keys(facialHistoryClinicBackground).map((item, index) => {
              if (item === 'Medicamentos Actuales') {
                return (
                  <InputText
                    item={item}
                    key={index}
                    onChange={(e) => handleText(e, facialClinic, setFacialClinic)}
                    value={facialClinic[item]}
                  />
                )
              }

              return (
                <InputCheckbox
                  key={index}
                  item={item}
                  onChange={(e) => handleCheckBox(e, facialClinic, setFacialClinic)}
                  value={facialClinic[item]}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Atecedentes Estéticos</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {Object.keys(facialHistoryAestheticBackground).map((item, index) => {
              if (item === 'Otros') {
                return (
                  <InputText
                    item={item}
                    key={index}
                    onChange={(e) => {
                      handleText(e, facialAesthetic, setFacialAesthetic)
                    }}
                    value={facialAesthetic[item]}
                  />
                )
              }

              return (
                <InputCheckbox
                  key={index}
                  item={item}
                  onChange={(e) => {
                    handleCheckBox(e, facialAesthetic, setFacialAesthetic)
                  }}
                  value={facialAesthetic[item]}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2">
          <div>
            <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Fototipo de piel</h3>
            <div className="mt-3 flex flex-1 items-center gap-2">
              <select onChange={(e) => handleSelect(e, fototipo, setFototipo)} value={fototipo}>
                <option value="">Selecciona un fototipo</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Tipologia cutánea</h3>
            <div className="mt-3 grid grid-cols-2 items-center gap-2">
              {Object.keys(tipologiaCutanea).map((item, index) => {
                if (item === 'Otro') {
                  return (
                    <InputText
                      item={item}
                      key={index}
                      onChange={(e) => {
                        handleText(e, tipologia, setTipologia)
                      }}
                      value={tipologia[item]}
                    />
                  )
                }

                return (
                  <InputCheckbox
                    key={index}
                    item={item}
                    onChange={(e) => {
                      handleCheckBox(e, tipologia, setTipologia)
                    }}
                    value={tipologia[item]}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">
            Cuídado habitual de la piel
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {Object.keys(cuidadoPiel).map((item, index) => {
              return (
                <InputText
                  item={item}
                  key={index}
                  onChange={(e) => {
                    handleText(e, cuidadoDePiel, setCuidadoDePiel)
                  }}
                  value={cuidadoDePiel[item]}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Patologías cutáneas</h3>
          <div className="mt-3 grid grid-cols-2 gap-5">
            {Object.keys(patologiasCutaneas).map((item, index) => {
              if (item.includes('acn')) {
                if (item.includes('Piel')) {
                  return (
                    <InputCheckbox
                      item={item}
                      key={index}
                      onChange={(e) => {
                        handleCheckBox(e, patologias, setPatologias)
                      }}
                      value={patologias[item]}
                    />
                  )
                }

                return (
                  <InputText
                    item={item}
                    key={index}
                    onChange={(e) => {
                      handleText(e, patologias, setPatologias)
                    }}
                    value={patologias[item]}
                  />
                )
              }

              return (
                <InputCheckbox
                  item={item}
                  key={index}
                  onChange={(e) => {
                    handleCheckBox(e, patologias, setPatologias)
                  }}
                  value={patologias[item]}
                />
              )
            })}
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

export default FacialHistory
