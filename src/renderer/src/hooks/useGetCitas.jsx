import { useEffect } from 'react'

const useGetCitas = ({ setCitas, turso }) => {
  useEffect(() => {
    const storedCitas = localStorage.getItem('citas')

    if (storedCitas) {
      setCitas(JSON.parse(storedCitas))
      return
    }

    const getCitas = async () => {
      try {
        const citas = await turso.execute('SELECT * FROM cita WHERE fecha >= date("now")')
        setCitas(citas.rows)
        localStorage.setItem('citas', JSON.stringify(citas.rows))
      } catch (error) {
        alert('Error al obtener las citas')
        console.error(error)
      }
    }

    getCitas()
  }, [])
}

export default useGetCitas
