import { useEffect } from 'react'
import { medidas } from '../../../../Constants/bodySessionConstants'

const DisplaySesionCorporal = ({ handleToggleModal, sesion }) => {
  const medidasKeys = Object.keys(medidas)
  const medidasValues = Object.values(sesion).slice(2, 13)
  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[50%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">{`Sesion Corporal`}</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          <div className="no-scrollbar h-[70vh] w-[50%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5">
            <div className="grid grid-cols-2">
              <div>
                <h3 className="mt-4 w-[200px] border-b text-lg font-semibold">Fecha de Sesion</h3>
                <div className="mt-3">{sesion.fecha}</div>
              </div>

              <div>
                <h3 className="mt-4 w-[200px] border-b text-lg font-semibold">Proxima Sesion</h3>
                <div className="mt-3">{sesion.prox_sesion}</div>
              </div>
            </div>

            <div>
              <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Peso & Medidas</h3>
              <div className="mt-3 grid grid-cols-2">
                {medidasKeys.map((medida, index) => (
                  <div key={index} className="flex gap-3">
                    <p>{`${medida}: ${medidasValues[index] ? medidasValues[index] : ''}`}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Notas</h3>
              <div className="mt-3">{sesion.notas}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplaySesionCorporal
