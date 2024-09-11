import AppoinmnetCard from './AppoinmentCard'

import useCitas from '../../store/citasStore'

const Appoinments = () => {
  const citas = useCitas((state) => state.citas)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {citas.length > 0 && citas.map((cita) => <AppoinmnetCard key={cita.id} cita={cita} />)}
      </div>
    </>
  )
}

export default Appoinments
