import { Link } from 'react-router-dom'

import useHistoriaCorporal from '../../../store/bodyHistoryStore'
import usePaciente from '../../../store/pacienteStore'

import {
  alergias,
  bodyClinicBackground,
  motivoConsulta,
  antecedentesQuirurgicos
} from '../../../Constants/bodyFormConstants'

const DisplayCorporalHistory = () => {
  const paciente = usePaciente((state) => state.paciente)
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const alergiasCorporal = Object.values(historiaCorporal).slice(2, 6)
  const antecedentes = Object.values(historiaCorporal).slice(6, 15)
  const motivoCorporal = Object.values(historiaCorporal).slice(15, 20)
  const antecedentesQuirurgicosCorporal = Object.values(historiaCorporal).slice(20, 23)

  return (
    <>
      <div className="no-scrollbar overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5">
        <Link to={`/paciente/${paciente.id}`}>
          <button type="button" className="px-3 py-2 text-primary-foreground hover:text-primary">
            <div className="flex flex-row align-middle">
              <svg
                className="mr-2 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="ml-2">Atras</p>
            </div>
          </button>
        </Link>

        <h3 className="my-5 border-b text-center text-lg font-semibold">
          HISTORIA TRATAMIENTO CORPORALES
        </h3>

        <div>
          <h3 className="w-[200px] border-b text-lg font-semibold">Datos Estado de Salud</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Object.keys(alergias).map((item, index) => {
              return (
                <div className="flex items-center gap-2" key={`${index}_alergias`}>
                  <p>{item}:</p>
                  <p className="font-bold">
                    {alergiasCorporal[index] == '' ? 'Ninguno' : alergiasCorporal[index]}
                  </p>
                </div>
              )
            })}

            {Object.keys(bodyClinicBackground).map((item, index) => {
              return (
                <div className="flex items-center gap-2" key={`${index}_antecedentes`}>
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
                  <div className="flex items-center gap-2" key={`${index}_motivo`}>
                    <p>{item}:</p>
                    <p className="font-bold">
                      {motivoCorporal[index] == '' ? 'Ninguno' : motivoCorporal[index]}
                    </p>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-2" key={`${index}_motivo`}>
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
                <div className="flex items-center gap-2" key={`${index}_quirurgicos`}>
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
