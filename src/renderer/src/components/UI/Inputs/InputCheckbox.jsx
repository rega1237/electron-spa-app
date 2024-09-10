const InputCheckbox = ({ index, item, value, onChange }) => {
  return (
    <div key={index} className="flex flex-1 items-center gap-2">
      <label htmlFor={item}>{item}</label>
      <input
        type="checkbox"
        id={item}
        name={item}
        className="p-2"
        onChange={onChange}
        checked={value == 1}
      />
    </div>
  )
}

export default InputCheckbox
