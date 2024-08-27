import {
  facialHistoryClinicBackground,
  facialHistoryAestheticBackground,
  tipologiaCutanea,
  cuidadoPiel,
  patologiasCutaneas
} from '../../../Constants/formConstants'

import InputCheckbox from '../../UI/InputCheckbox'
import InputText from '../../UI/InputText'

const NewHistory = ({ handleToggleModal, turso, paciente, setInfo }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[70%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">Nueva Historia {paciente.nombre_completo}</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          <form
            className="h-[80vh] w-[70%] overflow-x-hidden overflow-y-scroll rounded-b-[10px] bg-primary p-5"
            onSubmit={handleSubmit}
          >
            <div>
              <h3 className="w-[200px] border-b text-lg font-semibold">Atecedentes Clinicos</h3>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {Object.keys(facialHistoryClinicBackground).map((item, index) => {
                  return <InputCheckbox index={index} item={item} onChange={() => {}} />
                })}
              </div>
            </div>

            <div>
              <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">
                Atecedentes Estéticos
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {Object.keys(facialHistoryAestheticBackground).map((item, index) => {
                  return <InputCheckbox index={index} item={item} onChange={() => {}} />
                })}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2">
              <div>
                <h3 className="mt-5 w-[200px] border-b text-lg font-semibold">Fototipo de piel</h3>
                <div className="mt-3 flex flex-1 items-center gap-2">
                  <select>
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
                      return <InputText item={item} index={index} onChange={() => {}} />
                    }

                    return <InputCheckbox index={index} item={item} onChange={() => {}} />
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
                  return <InputText item={item} index={index} onChange={() => {}} />
                })}
              </div>
            </div>

            <div>
              <h3 className="mt-4 w-[300px] border-b text-lg font-semibold">Patologías cutáneas</h3>
              <div className="mt-3 grid grid-cols-2 gap-5">
                {Object.keys(patologiasCutaneas).map((item, index) => {
                  if (item.includes('acn')) {
                    if (item.includes('Piel')) {
                      return <InputCheckbox item={item} index={index} onChange={() => {}} />
                    }

                    return <InputText item={item} index={index} onChange={() => {}} />
                  }

                  return (
                    <>
                      <InputCheckbox item={item} index={index} onChange={() => {}} />
                    </>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button className="w-[300px] bg-primary-foreground p-3 text-primary hover:bg-white hover:text-primary-foreground">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewHistory
