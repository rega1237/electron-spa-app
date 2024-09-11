import { create } from 'zustand'
import turso from './turso'

const useCitas = create((set, get) => ({
  citas: [],
  getCitas: async () => {
    try {
      const storedCitas = localStorage.getItem('citas')

      if (storedCitas) {
        set({ citas: JSON.parse(storedCitas) })
        return
      }

      const citas = await turso.execute('SELECT * FROM citas')

      set({ citas: citas.rows })
      localStorage.setItem('citas', JSON.stringify(citas.rows))
    } catch (error) {
      console.error(error.message)
      alert('Error al obtener las citas')
    }
  },
  addCita: async ({ paciente_id, fecha, hora, motivo }) => {
    try {
      const sqlAction = await turso.execute({
        sql: 'INSERT INTO citas (paciente_id, fecha, hora, motivo) VALUES (:paciente_id, :fecha, :hora, :motivo)',
        args: { paciente_id: paciente_id, fecha: fecha, hora: hora, motivo: motivo }
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        citas: [
          ...state.citas,
          { id: id, paciente_id: paciente_id, fecha: fecha, hora: hora, motivo: motivo }
        ]
      }))

      const getCitas = get().citas

      localStorage.setItem('citas', JSON.stringify(getCitas))
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la cita')
    }
  },
  deleteCita: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM citas WHERE id = :id',
        args: { id: id }
      })

      set((state) => ({
        citas: state.citas.filter((cita) => cita.id !== id)
      }))

      const getCitas = get().citas

      localStorage.setItem('citas', JSON.stringify(getCitas))
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la cita')
    }
  }
}))

export default useCitas
