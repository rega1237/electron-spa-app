import AppoinmnetCard from './AppoinmentCard'

import useCitas from '../../store/citasStore'
import { useEffect, useState } from 'react'

const Appoinments = () => {
  const [citas, setCitas] = useState([])
  const [proximasCitas, setProximasCitas] = useState(true)
  const citasStore = useCitas((state) => state.citas)
  const getCitas = useCitas((state) => state.getCitas)

  useEffect(() => {
    getCitas()
  }, [])

  useEffect(() => {
    if (proximasCitas) {
      const citasProximas = citasStore.filter((cita) => {
        const fechaCita = new Date(`${cita.fecha}T00:00:00`)
        let fechaActual = new Date()
        const yearActual = fechaActual.getFullYear()
        const monthActual =
          fechaActual.getMonth() + 1 < 10
            ? `0${fechaActual.getMonth() + 1}`
            : fechaActual.getMonth() + 1
        const dayActual = fechaActual.getDate()
        fechaActual = new Date(`${yearActual}-${monthActual}-${dayActual}T00:00:00`)
        return fechaCita >= fechaActual
      })
      setCitas(citasProximas)
    } else {
      setCitas(citasStore)
    }
  }, [proximasCitas, citasStore])

  return (
    <>
      <div className="mb-5 flex w-[300px] justify-center gap-4">
        <button
          className={proximasCitas ? 'border-b-2 p-3' : ''}
          onClick={() => setProximasCitas(true)}
        >
          Proximas
        </button>
        <button
          className={!proximasCitas ? 'border-b-2 p-3' : ''}
          onClick={() => setProximasCitas(false)}
        >
          Todas
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {citas.length > 0 && citas.map((cita) => <AppoinmnetCard key={cita.id} cita={cita} />)}
      </div>
    </>
  )
}

export default Appoinments
