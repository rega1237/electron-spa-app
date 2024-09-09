export const handleCheckBox = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.checked })
}

export const handleText = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value })
}

export const handleSelect = (e, state, setState) => {
  setState(e.target.value)
}

export const handleTextArea = (e, setState) => {
  setState(e.target.value)
}

export const handleDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}
