import TablePacienteRow from './TablePacienteRow'
import usePaciente from '../../store/pacienteStore'

const TableBody = ({
  search,
  toggleNewAppointment,
  toggleNewHistory,
  newHistoryAction,
  toggleNewSession
}) => {
  const pacientes = usePaciente((state) => state.pacientes)

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="relative h-[500px] w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Nombre
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Telefono
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {search.length > 0
              ? search.map((paciente) => (
                  <TablePacienteRow
                    key={paciente.id}
                    paciente={paciente}
                    toggleNewAppointment={toggleNewAppointment}
                    toggleNewHistory={toggleNewHistory}
                  />
                ))
              : pacientes.map((paciente) => (
                  <TablePacienteRow
                    key={paciente.id}
                    paciente={paciente}
                    toggleNewAppointment={toggleNewAppointment}
                    toggleNewHistory={toggleNewHistory}
                    newHistoryAction={newHistoryAction}
                    toggleNewSession={toggleNewSession}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableBody
