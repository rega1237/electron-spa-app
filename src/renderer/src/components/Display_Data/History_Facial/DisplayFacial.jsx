import { Link } from 'react-router-dom'
import {
  facialHistoryClinicBackground,
  facialHistoryAestheticBackground,
  tipologiaCutanea,
  cuidadoPiel,
  patologiasCutaneas
} from '../../../Constants/facialFormConstants'

import useHistoriaFacial from '../../../store/facialHistoryStore'
import usePaciente from '../../../store/pacienteStore'

const DisplayFacialHistory = () => {
  const paciente = usePaciente((state) => state.paciente)
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const clinicFacial = Object.values(historiaFacial).slice(2, 9)
  const esteticaFacial = Object.values(historiaFacial).slice(9, 18)
  const tipologiaFacial = Object.values(historiaFacial).slice(18, 27)
  const cuidadoFacial = Object.values(historiaFacial).slice(28, 35)
  const patologiasFacial = Object.values(historiaFacial).slice(35, 51)

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
          <h3 className="w-[200px] border-b text-lg font-semibold">Atecedentes Clinicos</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {Object.keys(facialHistoryClinicBackground).map((item, index) => {
              if (item === 'Medicamentos Actuales') {
                return (
                  <div className="flex items-center gap-2">
                    <p>{item}:</p>
                    <p className="font-bold">
                      {clinicFacial[index] == '' ? 'Ninguno' : clinicFacial[index]}
                    </p>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">{clinicFacial[index] ? 'Si' : 'No'}</p>
                </div>
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
                  <div className="flex items-center gap-2">
                    <p>{item}:</p>
                    <p className="font-bold">
                      {esteticaFacial[index] == '' ? 'Ninguno' : esteticaFacial[index]}
                    </p>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">{esteticaFacial[index] ? 'Si' : 'No'}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2">
          <div>
            <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Fototipo de piel</h3>
            <div className="mt-3 flex flex-1 items-center gap-2">
              <p>{historiaFacial['fototipo_piel']}</p>
            </div>
          </div>

          <div>
            <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Tipologia cutánea</h3>
            <div className="mt-3 grid grid-cols-2 items-center gap-2">
              {Object.keys(tipologiaCutanea).map((item, index) => {
                if (item === 'Otro') {
                  return (
                    <div className="flex items-center gap-2">
                      <p>{item}:</p>
                      <p className="font-bold">
                        {tipologiaFacial[index] == '' ? 'Ninguno' : tipologiaFacial[index]}
                      </p>
                    </div>
                  )
                }

                return (
                  <div className="flex items-center gap-2">
                    <p>{item}:</p>
                    <p className="font-bold">{tipologiaFacial[index] ? 'Si' : 'No'}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">
            Cuídado habitual de la piel
          </h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {Object.keys(cuidadoPiel).map((item, index) => {
              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">
                    {cuidadoFacial[index] == '' ? 'Ninguno' : cuidadoFacial[index]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Patologías cutáneas</h3>
          <div className="mt-3 grid grid-cols-3 gap-5">
            {Object.keys(patologiasCutaneas).map((item, index) => {
              if (item.includes('acn')) {
                if (item.includes('Piel')) {
                  return (
                    <div className="flex items-center gap-2">
                      <p>{item}:</p>
                      <p className="font-bold">{patologiasFacial[index] ? 'Si' : 'No'}</p>
                    </div>
                  )
                }

                return (
                  <div className="flex items-center gap-2">
                    <p>{item}:</p>
                    <p className="font-bold">
                      {patologiasFacial[index] ? 'No' : patologiasFacial[index]}
                    </p>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <p>{item}:</p>
                  <p className="font-bold">{patologiasFacial[index] ? 'Si' : 'No'}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Notas</h3>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <p>{historiaFacial['facial_notas']}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayFacialHistory
