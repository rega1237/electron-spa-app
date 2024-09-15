import { medidas } from '../../../../Constants/bodySessionConstants'
import { fillKeysObjects } from '../../../Forms/HistoryForm/handleFunctions'

export const setEditValues = (sesion, setMedidas, setNextSesion, setNotas) => {
  if (sesion.sesion === 'Corporal') {
    const { prox_sesion, notas } = sesion

    const medidasKeys = Object.keys(medidas)
    const medidasValues = Object.values(sesion).slice(2, 14)

    const medidasCorporal = fillKeysObjects(medidasKeys, medidasValues)

    setMedidas(medidasCorporal)
    setNextSesion(prox_sesion)
    setNotas(notas)
  } else {
    const notas = sesion.notas

    setNotas(notas)
  }
}
