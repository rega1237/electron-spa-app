export const ipcHandleImages = (images, paciente, date, cedula, tipoSesion) =>
  window.electron.ipcRenderer.send('save-images', images, paciente, date, cedula, tipoSesion)

export const handleImageInput = (e, set) => {
  const files = Array.from(e.target.files).map((file) => file.path)
  set(files)
}
