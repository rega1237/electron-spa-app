import DisplaySesionCorporal from './DisplaySesionCorporal/DisplaySesionCorporal'
import DisplaySesionFacial from './DisplaySesionFacial/DisplaySesionFacial'

const DisplaySesionBody = ({ sesion, handleToggleModal }) => {
  console.log(sesion)
  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[50%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">{`Sesion Facial`}</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          {sesion.sesion === 'Facial' ? (
            <DisplaySesionFacial sesion={sesion} handleToggleModal={handleToggleModal} />
          ) : (
            <DisplaySesionCorporal sesion={sesion} handleToggleModal={handleToggleModal} />
          )}
        </div>
      </div>
    </>
  )
}

export default DisplaySesionBody
