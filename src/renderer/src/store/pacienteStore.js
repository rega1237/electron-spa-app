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
  setPaciente: (paciente) => set((state) => ({ paciente: paciente })),
  editPaciente: async ({ id, nombre_completo, cedula, fecha_de_nacimiento, telefono }) => {
    try {
      await turso.execute({
        sql: 'UPDATE pacientes SET nombre_completo = :nombre_completo, cedula = :cedula, fecha_de_nacimiento = :fecha_de_nacimiento, telefono = :telefono WHERE id = :id',
        args: {
          id: id,
          nombre_completo: nombre_completo,
          cedula: cedula,
          fecha_de_nacimiento: fecha_de_nacimiento,
          telefono: telefono
        }
      })

      const storedPacientes = get().pacientes
      const updatedPacientes = storedPacientes.map((paciente) => {
        if (paciente.id === id) {
          paciente.nombre_completo = nombre_completo
          paciente.cedula = cedula
          paciente.telefono = telefono
          paciente.fecha_de_nacimiento = fecha_de_nacimiento
        }
        return paciente
      })

      set({ pacientes: updatedPacientes })
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes))
      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al editar el paciente')
      return false
    }
  },
  deletePaciente: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM historia_facial WHERE paciente_id = :id',
        args: { id: id }
      })

      await turso.execute({
        sql: 'DELETE FROM historia_corporal WHERE paciente_id = :id',
        args: { id: id }
      })

      await turso.execute({
        sql: 'DELETE FROM sesion_facial WHERE paciente_id = :id',
        args: { id: id }
      })

      await turso.execute({
        sql: 'DELETE FROM sesion_corporal WHERE paciente_id = :id',
        args: { id: id }
      })

      await turso.execute({
        sql: 'DELETE FROM citas WHERE paciente_id = :id',
        args: { id: id }
      })

      await turso.execute({
        sql: 'DELETE FROM pacientes WHERE id = :id',
        args: { id: id }
      })

      const storedPacientes = get().pacientes
      const filteredPacientes = storedPacientes.filter((paciente) => paciente.id !== id)

      set({ pacientes: filteredPacientes })
      localStorage.setItem('pacientes', JSON.stringify(filteredPacientes))
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar el paciente')
    }
  }
}))

export default usePaciente
