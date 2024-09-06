import { create } from 'zustand'
import turso from './turso'

export const usePaciente = create((set, get) => ({
  pacientes: [],
  paciente: {},
  getPacientes: async (state) => {
    try {
      const storedPacientes = localStorage.getItem('pacientes')

      if (storedPacientes) {
        set({ pacientes: JSON.parse(storedPacientes) })
        return
      }

      const pacientes = await turso.execute('SELECT * FROM pacientes')

      set({ pacientes: pacientes.rows })
      localStorage.setItem('pacientes', JSON.stringify(pacientes.rows))
    } catch (error) {
      alert('Error al obtener los pacientes')
      console.error(error)
    }
  },
  addPaciente: async ({ nombre_completo, cedula, fecha_de_nacimiento, telefono }) => {
    try {
      const sqlAction = await turso.execute({
        sql: 'INSERT INTO pacientes (nombre_completo, cedula, fecha_de_nacimiento, telefono) VALUES (:nombre_completo, :cedula, :fecha_de_nacimiento, :telefono)',
        args: {
          nombre_completo: nombre_completo,
          cedula: cedula,
          fecha_de_nacimiento: fecha_de_nacimiento,
          telefono: telefono
        }
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        pacientes: [
          ...state.pacientes,
          { id: id, nombre_completo: nombre_completo, cedula: cedula, telefono: telefono }
        ]
      }))

      const getPacientes = get().pacientes

      localStorage.setItem('pacientes', JSON.stringify(getPacientes))
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar el paciente')
    }
  },
  setPaciente: (paciente) => set((state) => ({ paciente: paciente }))
}))

export default usePaciente
