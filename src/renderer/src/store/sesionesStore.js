import { create } from 'zustand'
import turso from './turso'

export const useSesion = create((set, get) => ({
  sesionFacial: [],
  sesionCorporal: [],
  getSesionFacial: async (paciente) => {
    try {
      const storedSesionFacial = JSON.parse(localStorage.getItem('sesionFacial'))

      const pacienteID = paciente.id

      if (storedSesionFacial) {
        if (storedSesionFacial[0]['paciente_id'] == pacienteID) {
          set({ sesionFacial: storedSesionFacial })
          return
        }
      }

      const sesionFacial = await turso.execute({
        sql: 'SELECT * FROM sesion_facial WHERE paciente_id = :paciente_id',
        args: { paciente_id: pacienteID }
      })

      set({ sesionFacial: sesionFacial.rows })
      localStorage.setItem('sesionFacial', JSON.stringify(sesionFacial.rows))
    } catch (error) {
      alert('Error al obtener las sesiones faciales')
      console.error(error)
    }
  },
  getSesionCorporal: async (paciente) => {
    try {
      const storedSesionCorporal = localStorage.getItem('sesionCorporal')

      const pacienteID = paciente.id

      if (storedSesionCorporal) {
        if (storedSesionCorporal.paciente_id === pacienteID) {
          set({ sesionCorporal: JSON.parse(storedHistoriaCorporal) })
          return
        }
      }

      const sesionCorporal = await turso.execute({
        sql: 'SELECT * FROM sesion_corporal WHERE paciente_id = :paciente_id',
        args: { paciente_id: pacienteID }
      })

      set({ sesionCorporal: sesionCorporal.rows })
      localStorage.setItem('sesionCorporal', JSON.stringify(sesionCorporal.rows))
    } catch (error) {
      alert('Error al obtener las sesiones corporales')
      console.error(error)
    }
  },
  addSesionFacial: async (notas, fecha, paciente) => {
    try {
      const pacienteId = paciente.id

      const sqlAction = await turso.execute({
        sql: 'INSERT INTO sesion_facial (paciente_id, sesion, notas, fecha) VALUES (:paciente_id, :sesion, :notas, :fecha)',
        args: {
          paciente_id: pacienteId,
          sesion: 'Facial',
          notas: notas,
          fecha: fecha
        }
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        sesionFacial: [
          ...state.sesionFacial,
          { id: id, paciente_id: pacienteId, sesion: 'Facial', notas: notas, fecha: fecha }
        ]
      }))

      const getSesionFacial = get().sesionFacial

      localStorage.setItem('sesionFacial', JSON.stringify(getSesionFacial))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la sesion facial')
      return false
    }
  },
  addSesionCorporal: async (data) => {
    try {
      const keys = Object.keys(data).join(', ')
      const placeholders = Object.keys(data)
        .map((key) => `:${key}`)
        .join(', ')

      const sqlAction = await turso.execute({
        sql: `INSERT INTO sesion_corporal (${keys}) VALUES (${placeholders})`,
        args: data
      })

      const id = parseInt(sqlAction.lastInsertRowid.toString())

      set((state) => ({
        sesionCorporal: [...state.sesionCorporal, { id: id, ...data }]
      }))

      const getSesionCorporal = get().sesionCorporal

      localStorage.setItem('sesionCorporal', JSON.stringify(getSesionCorporal))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la sesion corporal')
      return false
    }
  }
}))

export default useSesion
