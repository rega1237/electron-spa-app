const InputText = ({ item, index, onChange }) => {
  return (
    <div key={index} className="flex flex-1 items-center gap-2">
      <label htmlFor={item}>{item}</label>
      <input
        type="text"
        id={item}
        className="border-b bg-transparent p-2 focus-visible:outline-none"
      />
    </div>
  )
}

export default InputText
