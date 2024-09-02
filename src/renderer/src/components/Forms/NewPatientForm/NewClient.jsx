import { useEffect, useState } from 'react'
import { usePaciente } from '../../../store/store'
import { useNavigate } from 'react-router-dom'

const NewClient = ({ handleToggleModal }) => {
  const [nombre, setNombre] = useState('')
  const [cedula, setCedula] = useState('')
  const [telefono, setTelefono] = useState('')
  const [birthdate, setBirthdate] = useState('')

  const navigate = useNavigate()

  const addPaciente = usePaciente((state) => state.addPaciente)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addPaciente({ nombre_completo: nombre, cedula, fecha_de_nacimiento: birthdate, telefono })
    e.target.reset()
    handleToggleModal()
    const pacientes = JSON.parse(localStorage.getItem('pacientes'))
    const id = pacientes[pacientes.length - 1].id
    navigate(`/${id}`)
  }

  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[30%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">Nuevo Paciente</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          <form className="w-[30%] rounded-b-[10px] bg-primary p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  className="p-1"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Cédula de identidad</label>
                <input
                  type="number"
                  id="cedula"
                  className="input p-1"
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="date"
                  className="p-1"
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="number"
                  id="phone"
                  className="input p-1"
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <button className="bg-primary-foreground p-3 text-primary hover:bg-white hover:text-primary-foreground">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewClient