import useHistoriaCorporal from '../../../store/bodyHistoryStore'

import {
  alergias,
  bodyClinicBackground,
  motivoConsulta,
  antecedentesQuirurgicos
} from '../../../Constants/bodyFormConstants'
import { useEffect } from 'react'

const DisplayCorporalHistory = () => {
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const alergiasCorporal = Object.values(historiaCorporal).slice(2, 6)
  const antecedentes = Object.values(historiaCorporal).slice(6, 15)
  const motivoCorporal = Object.values(historiaCorporal).slice(15, 20)
  const antecedentesQuirurgicosCorporal = Object.values(historiaCorporal).slice(20, 22)

  useEffect(() => {
    console.log('historiaCorporal', historiaCorporal)
    console.log('values', Object.values(historiaCorporal))
    console.log('alergias', alergiasCorporal)
    console.log('antecedentes', antecedentes)
    console.log('motivo', motivoCorporal)
    console.log('quirur', antecedentesQuirurgicosCorporal)
  }, [])

  return (
    <>
      <div className="no-scrollbar overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5">
        <h3 className="my-5 border-b text-center text-lg font-semibold">
          HISTORIA TRATAMIENTO CORPORALES
        </h3>

        <div>
          <h3 className="w-[200px] border-b text-lg font-semibold">Datos Estado de Salud</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Object.keys(alergias).map((item, index) => {
              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">
                    {alergiasCorporal[index] == '' ? 'Ninguno' : alergiasCorporal[index]}
                  </p>
                </div>
              )
            })}

            {Object.keys(bodyClinicBackground).map((item, index) => {
              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">{antecedentes[index] ? 'Si' : 'No'}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Motivo de la consulta</h3>
          <div className="mt-3 grid grid-cols-2 items-center gap-2">
            {Object.keys(motivoConsulta).map((item, index) => {
              if (item === 'Otros') {
                return (
                  <div className="flex items-center gap-2">
                    <p>{item}:</p>
                    <p className="font-bold">
                      {motivoCorporal[index] == '' ? 'Ninguno' : alergiasCorporal[index]}
                    </p>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">{motivoCorporal[index] ? 'Si' : 'No'}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">
            Antecedentes Quirurgicos
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {Object.keys(antecedentesQuirurgicos).map((item, index) => {
              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">
                    {antecedentesQuirurgicosCorporal[index] == ''
                      ? 'Ninguno'
                      : antecedentesQuirurgicosCorporal[index]}
                  </p>
                </div>
              )
            })}
          </div>

          <div>
            <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Notas</h3>
            <div className="mt-3">
              <p>{historiaCorporal['corporal_notas']}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayCorporalHistory
