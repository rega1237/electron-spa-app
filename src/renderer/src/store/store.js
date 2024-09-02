import { create } from 'zustand'
import { createClient } from '@libsql/client'

const turso = createClient({
  url: import.meta.env.VITE_URL,
  authToken: import.meta.env.VITE_API_KEY
})

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

export const useCitas = create((set, get) => ({
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
  }
}))

export const useHistoriaFacial = create((set, get) => ({
  historiaFacial: {},
  getHistoriaFacial: async (paciente) => {
    try {
      const storedHistoriaFacial = localStorage.getItem('historiaFacial')

      if (storedHistoriaFacial.paciente_id === paciente.id) {
        set({ historiaFacial: JSON.parse(storedHistoriaFacial) })
        return
      }

      const historiaFacial = await turso.execute({
        sql: 'SELECT * FROM historia_facial WHERE paciente_id = :paciente_id',
        args: { paciente_id: paciente.id }
      })

      set({ historiaFacial: historiaFacial.rows })
      localStorage.setItem('historiaFacial', JSON.stringify(historiaFacial.rows))
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
          ...data,
          id: id
        }
      }))

      const getHistoriaFacial = get().historiaFacial

      localStorage.setItem('historiaFacial', JSON.stringify(getHistoriaFacial))
    } catch (error) {
      console.error(error.message)
      alert('Error al guardar la historia facial')
    }
  }
}))
