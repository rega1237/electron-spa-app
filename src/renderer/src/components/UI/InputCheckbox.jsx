const InputCheckbox = ({ index, item, onChange }) => {
  return (
    <div key={index} className="flex flex-1 items-center gap-2">
      <label htmlFor={item}>{item}</label>
      <input type="checkbox" id={item} className="p-2" onChange={onChange} />
    </div>
  )
}

export default InputCheckbox
