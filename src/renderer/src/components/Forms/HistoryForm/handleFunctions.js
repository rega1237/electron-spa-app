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
