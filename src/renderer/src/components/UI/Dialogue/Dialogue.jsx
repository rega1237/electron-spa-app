import useHistoriaCorporal from '../../../store/bodyHistoryStore'
import useHistoriaFacial from '../../../store/facialHistoryStore'

const Dialogue = ({ handleToggleModal, type, deleteRecord }) => {
  const historiaFacial = useHistoriaFacial((state) => state.historiaFacial)
  const historiaCorporal = useHistoriaCorporal((state) => state.historiaCorporal)
  const deleteHistoriaFacial = useHistoriaFacial((state) => state.deleteHistoriaFacial)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50">
      <div className="rounded-lg bg-primary-foreground p-5">
        <h1 className="text-2xl font-bold">¿Estás seguro que deseas eliminar?</h1>
        <div className="mt-5 flex justify-end gap-5">
          <button
            className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary"
            onClick={handleToggleModal}
          >
            Cancelar
          </button>
          <button
            className="bg-secondary px-5 py-1 text-primary-foreground hover:bg-secondary-foreground hover:text-primary"
            onClick={() => deleteRecord(type)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialogue
