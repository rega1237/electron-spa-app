import {
  facialHistoryClinicBackground,
  facialHistoryAestheticBackground,
  tipologiaCutanea,
  cuidadoPiel,
  patologiasCutaneas
} from '../../../Constants/facialFormConstants'

import {
  alergias,
  bodyClinicBackground,
  motivoConsulta,
  antecedentesQuirurgicos
} from '../../../Constants/bodyFormConstants'

export const handleCheckBox = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.checked })
}

export const handleText = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value })
}

export const handleSelect = (e, state, setState) => {
  setState(e.target.value)
}

export const handleTextArea = (e, setState) => {
  setState(e.target.value)
}

export const handleDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export const fillKeysObjects = (keys, values) => {
  const obj = {}
  keys.forEach((key, index) => {
    obj[key] = values[index]
  })

  return obj
}

export const setAllValuesFacial = (
  historiaFacial,
  setFacialClinic,
  setFacialAesthetic,
  setFototipo,
  setTipologia,
  setCuidadoDePiel,
  setPatologias,
  setNotas
) => {
  const clinicFacialKeys = Object.keys(facialHistoryClinicBackground)
  const esteticaFacialKeys = Object.keys(facialHistoryAestheticBackground)
  const tipologiaFacialKeys = Object.keys(tipologiaCutanea)
  const cuidadoFacialKeys = Object.keys(cuidadoPiel)
  const patologiasFacialKeys = Object.keys(patologiasCutaneas)

  const clinicFacialValues = Object.values(historiaFacial).slice(2, 9)
  const esteticaFacialValues = Object.values(historiaFacial).slice(9, 18)
  const tipologiaFacialValues = Object.values(historiaFacial).slice(18, 27)
  const cuidadoFacialValues = Object.values(historiaFacial).slice(28, 35)
  const patologiasFacialValues = Object.values(historiaFacial).slice(35, 51)

  setFacialClinic(fillKeysObjects(clinicFacialKeys, clinicFacialValues))
  setFacialAesthetic(fillKeysObjects(esteticaFacialKeys, esteticaFacialValues))
  setFototipo(historiaFacial['fototipo_piel'])
  setTipologia(fillKeysObjects(tipologiaFacialKeys, tipologiaFacialValues))
  setCuidadoDePiel(fillKeysObjects(cuidadoFacialKeys, cuidadoFacialValues))
  setPatologias(fillKeysObjects(patologiasFacialKeys, patologiasFacialValues))
  setNotas(historiaFacial['facial_notas'])
}

export const setAllValuesCorporal = (
  useHistoriaCorporal,
  setAlergias,
  setBodyClinic,
  setMotivo,
  setAntecedentesQuirurgicos,
  setNotas
) => {
  const alergiasKeys = Object.keys(alergias)
  const bodyClinicKeys = Object.keys(bodyClinicBackground)
  const motivoKeys = Object.keys(motivoConsulta)
  const antecedentesQuirurgicosKeys = Object.keys(antecedentesQuirurgicos)

  const alergiasValues = Object.values(useHistoriaCorporal).slice(2, 6)
  const bodyClinicValues = Object.values(useHistoriaCorporal).slice(6, 15)
  const motivoValues = Object.values(useHistoriaCorporal).slice(15, 20)
  const antecedentesQuirurgicosValues = Object.values(useHistoriaCorporal).slice(20, 22)

  setAlergias(fillKeysObjects(alergiasKeys, alergiasValues))
  setBodyClinic(fillKeysObjects(bodyClinicKeys, bodyClinicValues))
  setMotivo(fillKeysObjects(motivoKeys, motivoValues))
  setAntecedentesQuirurgicos(
    fillKeysObjects(antecedentesQuirurgicosKeys, antecedentesQuirurgicosValues)
  )
  setNotas(useHistoriaCorporal['corporal_notas'])
}
