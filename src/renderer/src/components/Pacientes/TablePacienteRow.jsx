import { Link } from 'react-router-dom'
import patientPlaceholder from '../../assets/images/placeholder-user.webp'

const TablePacienteRow = ({ paciente }) => {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <Link className="flex items-center gap-3" to={`/${paciente.id}`}>
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              className="aspect-square h-full w-full"
              alt="Patient Avatar"
              src={patientPlaceholder}
            />
          </span>
          <div>
            <p className="font-medium">{paciente.nombre_completo}</p>
            <p className="text-sm text-muted-foreground">{paciente.cedula}</p>
          </div>
        </Link>
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
        <div className="flex flex-col gap-1">
          <p data-id="28">{paciente.telefono}</p>
        </div>
      </td>
      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle" data-id="30">
        <div className="flex items-center gap-2" data-id="31">
          <button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Agendar Cita
          </button>
          <button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Crear Historia
          </button>
          <button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Crear Sesión
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TablePacienteRow
