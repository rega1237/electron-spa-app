import { create } from 'zustand'
import turso from './turso'

const useHistoriaCorporal = create((set, get) => ({
  historiaCorporal: {},
  getHistoriaCorporal: async (paciente) => {
    try {
      const storedHistoriaCorporal = localStorage.getItem('historiaCorporal')

      const pacienteID = paciente.id

      if (storedHistoriaCorporal) {
        if (storedHistoriaCorporal.paciente_id === pacienteID) {
          set({ historiaCorporal: JSON.parse(storedHistoriaCorporal) })
          return
        }
      }

      const historiaCorporal = await turso.execute({
        sql: 'SELECT * FROM historia_corporal WHERE paciente_id = :paciente_id',
        args: { paciente_id: pacienteID }
      })

      if (historiaCorporal.rows.length === 0) {
        set({ historiaCorporal: {} })
        localStorage.setItem('historiaCorporal', JSON.stringify({}))
        return
      }

      set({ historiaCorporal: historiaCorporal.rows[0] })
      localStorage.setItem('historiaCorporal', JSON.stringify(historiaCorporal.rows[0]))
    } catch (error) {
      console.error(error.message)
      alert('Error al obtener la historia corporal')
    }
  },
  addHistoriaCorporal: async (data) => {
    try {
      const keys = Object.keys(data).join(', ')
      const placeholders = Object.keys(data)
        .map((key) => `:${key}`)
        .join(', ')

      const sqlAction = await turso.execute({
        sql: `INSERT INTO historia_corporal (${keys}) VALUES (${placeholders})`,
        args: data
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        historiaCorporal: {
          id: id,
          ...data
        }
      }))

      const getHistory = get().historiaCorporal

      localStorage.setItem('historiaCorporal', JSON.stringify(getHistory))
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la historia corporal')
    }
  },
  editHistoriaCorporal: async (data) => {
    try {
      const keys = Object.keys(data)
        .filter((key) => key !== 'id' || key !== 'paciente_id' || key !== 'fecha_historia')
        .map((key) => `${key} = :${key}`)
        .join(', ')

      const id = data.id

      const sqlAction = await turso.execute({
        sql: `UPDATE historia_corporal SET ${keys} WHERE id = ${id}`,
        args: data
      })

      set((state) => ({ historiaCorporal: data }))

      const getHistoryCorporal = get().historiaCorporal

      localStorage.setItem('historiaCorporal', JSON.stringify(getHistoryCorporal))
    } catch (error) {
      console.error(error.message)
      alert('Error al editar la historia corporal')
    }
  },
  deleteHistoriaCorporal: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM historia_corporal WHERE id = :id',
        args: { id }
      })

      set((state) => ({ historiaCorporal: {} }))
      localStorage.setItem('historiaCorporal', JSON.stringify({}))
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la historia corporal')
    }
  }
}))

export default useHistoriaCorporal
