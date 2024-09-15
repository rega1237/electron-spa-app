import { create } from 'zustand'
import turso from './turso'

export const useSesion = create((set, get) => ({
  sesiones: [],
  getSesiones: async (paciente) => {
    const pacienteID = paciente.id

    const sesionFacial = await turso.execute(
      `SELECT * FROM sesion_facial WHERE paciente_id = ${pacienteID}`
    )

    const sesionCorporal = await turso.execute(
      `SELECT * FROM sesion_corporal WHERE paciente_id = ${pacienteID}`
    )

    const sesionesOrdenada = [...sesionCorporal.rows, ...sesionFacial.rows].sort((a, b) => {
      return new Date(b.fecha) - new Date(a.fecha)
    })

    set({ sesiones: sesionesOrdenada })

    localStorage.setItem('sesiones', JSON.stringify(sesionesOrdenada))
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
          ...state.sesiones,
          { id: id, paciente_id: pacienteId, sesion: 'Facial', notas: notas, fecha: fecha }
        ]
      }))

      const getSesiones = get().sesiones

      localStorage.setItem('sesiones', JSON.stringify(getSesiones))

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
        sesiones: [...state.sesiones, { id: id, ...data }]
      }))

      const getSesiones = get().sesiones

      localStorage.setItem('sesionCorporal', JSON.stringify(getSesiones))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la sesion corporal')
      return false
    }
  },
  editSesionFacial: async (id, notas) => {
    try {
      console.log('hola edit')
      await turso.execute({
        sql: `UPDATE sesion_facial SET notas = :notas WHERE id = ${id}`,
        args: { notas: notas }
      })

      const changeSesionValue = get().sesiones.map((sesion) => {
        if (sesion.id === id && sesion.sesion === 'Facial') {
          sesion.notas = notas
        }

        return sesion
      })

      set({ sesiones: changeSesionValue })

      localStorage.setItem('sesiones', JSON.stringify(changeSesionValue))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al editar la sesion facial')
      return false
    }
  },
  editSesionCorporal: async (data) => {
    try {
      console.log(data)
      const keys = Object.keys(data)
        .map((key) => `${key} = :${key}`)
        .join(', ')

      const id = data.id

      await turso.execute({
        sql: `UPDATE sesion_corporal SET ${keys} WHERE id = ${id}`,
        args: data
      })

      const changeSesionValue = get().sesiones.map((sesion) => {
        if (sesion.id === id && sesion.sesion === 'Corporal') {
          return (sesion = data)
        } else {
          return sesion
        }
      })

      set({ sesiones: changeSesionValue })

      localStorage.setItem('sesionCorporal', JSON.stringify(changeSesionValue))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al editar la sesion corporal')
      return false
    }
  },
  deleteSesionFacial: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM sesion_facial WHERE id = :id',
        args: { id: id }
      })

      const filterSesiones = get().sesiones.filter(
        (sesion) => sesion.id !== id && sesion.sesion === 'Facial'
      )

      set({ sesiones: filterSesiones })

      localStorage.setItem('sesionFacial', JSON.stringify(filterSesiones))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la sesion facial')
      return false
    }
  },
  deleteSesionCorporal: async (id) => {
    try {
      await turso.execute({
        sql: 'DELETE FROM sesion_corporal WHERE id = :id',
        args: { id: id }
      })

      const filterSesiones = get().sesiones.filter(
        (sesion) => sesion.id !== id && sesion.sesion === 'Corporal'
      )

      set({ sesiones: filterSesiones })

      localStorage.setItem('sesionCorporal', JSON.stringify(filterSesiones))

      return true
    } catch (error) {
      console.error(error.message)
      alert('Error al eliminar la sesion corporal')
      return false
    }
  }
}))

export default useSesion
