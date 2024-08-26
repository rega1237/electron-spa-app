import { useEffect } from 'react'

const useGetPacientes = ({ setPacientes, turso }) => {
  useEffect(() => {
    const storedPacientes = localStorage.getItem('pacientes')

    if (storedPacientes) {
      setPacientes(JSON.parse(storedPacientes))
      return
    }

    const getPacientes = async () => {
      try {
        const pacientes = await turso.execute('SELECT * FROM pacientes')
        setPacientes(pacientes.rows)
        localStorage.setItem('pacientes', JSON.stringify(pacientes.rows))
      } catch (error) {
        alert('Error al obtener los pacientes')
        console.error(error)
      }
    }

    getPacientes()
  }, [])
}

export default useGetPacientes
