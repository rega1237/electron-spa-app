import { create } from 'zustand'
import turso from './turso'

const useHistoriaFacial = create((set, get) => ({
  historiaFacial: {},
  getHistoriaFacial: async (paciente) => {
    try {
      const storedHistoriaFacial = localStorage.getItem('historiaFacial')

      const pacienteID = paciente.id

      if (storedHistoriaFacial) {
        if (storedHistoriaFacial.paciente_id === pacienteID) {
          set({ historiaFacial: JSON.parse(storedHistoriaFacial) })
          return
        }
      }

      const historiaFacial = await turso.execute({
        sql: 'SELECT * FROM historia_facial WHERE paciente_id = :paciente_id',
        args: { paciente_id: pacienteID }
      })

      if (historiaFacial.rows.length === 0) {
        set({ historiaFacial: {} })
        localStorage.setItem('historiaFacial', JSON.stringify({}))
        return
      }

      set((state) => ({ historiaFacial: historiaFacial.rows[0] }))
      localStorage.setItem('historiaFacial', JSON.stringify(historiaFacial.rows[0]))
    } catch (error) {
      console.error(error.message)
      alert('Error al obtener la historia facial')
    }
  },
  addHistoriaFacial: async (data) => {
    try {
      const keys = Object.keys(data).join(', ')
      const placeholders = Object.keys(data)
        .map((key) => `:${key}`)
        .join(', ')

      const sqlAction = await turso.execute({
        sql: `INSERT INTO historia_facial (${keys}) VALUES (${placeholders})`,
        args: data
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        historiaFacial: {
          id: id,
          ...data
        }
      }))

      const getHistoriaFacial = get().historiaFacial

      localStorage.setItem('historiaFacial', JSON.stringify(getHistoriaFacial))
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la historia facial')
    }
  },
  editHistoriaFacial: async (data) => {
    try {
      const keys = Object.keys(data)
        .filter((key) => key !== 'id' || key !== 'paciente_id' || key !== 'fecha_historia')
        .map((key) => `${key} = :${key}`)
        .join(', ')

      const id = data.id

      const sqlAction = await turso.execute({
        sql: `UPDATE historia_facial SET ${keys} WHERE id = ${id}`,
        args: data
      })

      set((state) => ({ historiaFacial: data }))

      const getHistoriaFacial = get().historiaFacial

      localStorage.setItem('historiaFacial', JSON.stringify(getHistoriaFacial))
    } catch (error) {
      console.error(error.message)
      alert('Error al editar la historia facial')
    }
  },
  deleteHistoriaFacial: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM historia_facial WHERE id = :id',
        args: { id }
      })

      set((state) => ({ historiaFacial: {} }))

      localStorage.setItem('historiaFacial', JSON.stringify({}))
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la historia facial')
    }
  }
}))

export default useHistoriaFacial
