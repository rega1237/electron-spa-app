const Dialogue = ({ handleToggleModal, type, deleteRecord }) => {
  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="rounded-lg bg-primary-foreground p-5">
          <h1 className="text-2xl font-bold text-primary">¿Estás seguro que deseas eliminar?</h1>
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
    </>
  )
}

export default Dialogue
