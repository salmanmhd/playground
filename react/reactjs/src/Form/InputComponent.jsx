export default function InputComponent({
  inputType,
  labelText,
  value,
  setValue,
  placeholderText,
}) {
  const handleChange = (e) => {
    const newValue =
      inputType === 'number' ? Number(e.target.value) : e.target.value;
    setValue(newValue);
  };

  return (
    <div className='mb-4'>
      <label className='mr-6  '>{labelText}: </label>
      <input
        value={value}
        onChange={handleChange}
        className='ml-4 border text-gray-950 rounded-lg border-gray-500 p-1'
        type={inputType}
        placeholder={placeholderText}
      />
    </div>
  );
}
