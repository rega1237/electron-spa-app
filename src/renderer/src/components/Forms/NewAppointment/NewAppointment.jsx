import { useState } from 'react'
import useCitas from '../../../store/citasStore'
import usePaciente from '../../../store/pacienteStore'

const Newappointment = ({ handleToggleModal }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [motivo, setMotivo] = useState('')

  const paciente = usePaciente((state) => state.paciente)
  const addCita = useCitas((state) => state.addCita)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (time === 'Seleccione una hora' || date === '' || motivo === 'Seleccione un motivo') {
      alert('Por favor complete todos los campos')
      return
    }

    try {
      await addCita({ paciente_id: paciente.id, fecha: date, hora: time, motivo: motivo })
      e.target.reset()
      handleToggleModal()
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la cita')
    }
  }

  const timeAr = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM'
  ]

  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[30%] items-center justify-between rounded-t-[10px] border-b bg-primary p-5 text-white">
            <h2 className="text-lg font-semibold">Nuevo Cita para {paciente.nombre_completo}</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          <form className="w-[30%] rounded-b-[10px] bg-primary p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="date">Fecha</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  id="date"
                  className="p-1"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Hora">Hora de cita</label>
                <select
                  name="time"
                  id="time"
                  className="input p-1"
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Seleccione una hora</option>
                  {timeAr.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Hora">Motivo</label>
                <select
                  name="motivo"
                  id="motivo"
                  className="input p-1"
                  onChange={(e) => setMotivo(e.target.value)}
                >
                  <option value="">Seleccione un motivo</option>
                  <option value="Tratamiento Facial">Tratamiento Facial</option>
                  <option value="Masaje Reductor">Tratamiento Corporal</option>
                </select>
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

export default Newappointment
