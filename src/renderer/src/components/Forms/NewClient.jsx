const NewClient = ({handleToggleModal}) => {
  return (
    <>
      <div className="absolute top-0 z-10 min-h-full w-full bg-primary-foreground opacity-15"></div>
      <div className="absolute top-0 z-20 w-full">
        <div className="flex h-[100vh] flex-col items-center justify-center">
          <div className="flex w-[30%] items-center justify-between border-b bg-primary p-5 text-white rounded-t-[10px]">
            <h2 className="text-lg font-semibold">Nuevo Paciente</h2>
            <button className="text-muted-foreground" onClick={handleToggleModal}>
              Cerrar
            </button>
          </div>
          <form className="w-[30%] bg-primary p-5 rounded-b-[10px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nombre Completo</label>
                <input type="text" id="name" className="p-1" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Cédula de identidad</label>
                <input type="number" id="cedula" className="input p-1" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Teléfono</label>
                <input type="text" id="phone" className="input p-1" />
              </div>

              <button className="bg-primary-foreground text-primary p-3 hover:bg-white hover:text-primary-foreground">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewClient
