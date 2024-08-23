import Header from './components/Header/Header'

import patientPlaceholder from './assets/images/placeholder-user.webp'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
        <Header />

        <div className="overflow-hidden rounded-lg border">
          <div className="relative w-full overflow-auto">
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
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-3">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          class="aspect-square h-full w-full"
                          alt="Patient Avatar"
                          src={patientPlaceholder}
                        />
                      </span>
                      <div>
                        <p class="font-medium">Rafael Guzman</p>
                        <p class="text-sm text-muted-foreground">19449831</p>
                      </div>
                    </div>
                  </td>
                  <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">
                    <div class="flex flex-col gap-1">
                      <p data-id="28">0414-967-5141</p>
                    </div>
                  </td>
                  <td class="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle" data-id="30">
                    <div class="flex items-center gap-2" data-id="31">
                      <button
                        class="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Agendar Cita
                      </button>
                      <button
                        class="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Crear Historia
                      </button>
                      <button
                        class="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Crear Sesión
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
