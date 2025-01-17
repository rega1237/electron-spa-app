const InputText = ({ item, index, value, onChange }) => {
  return (
    <div key={index} className="flex flex-1 items-center gap-2">
      <label htmlFor={item}>{item}</label>
      <input
        type="text"
        id={item}
        name={item}
        className="border-b bg-transparent p-2 focus-visible:outline-none"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default InputText
