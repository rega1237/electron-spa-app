import usePaciente from '../../store/pacienteStore'

const Input = ({ placeHolder, type, setSearch }) => {
  const pacientes = usePaciente((state) => state.pacientes)

  const handleSearch = (e) => {
    const searchValue = e.target.value
    const filteredPacientes = pacientes.filter((paciente) => {
      return (
        paciente.nombre_completo.toLowerCase().includes(searchValue.toLowerCase()) ||
        paciente.cedula.includes(searchValue)
      )
    })

    setSearch(filteredPacientes.length > 0 ? filteredPacientes : [])
  }

  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeHolder}
      type={type}
      onChange={handleSearch}
    ></input>
  )
}

export default Input
