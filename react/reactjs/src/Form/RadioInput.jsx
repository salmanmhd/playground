export default function RadioInput({
  value,
  name,
  text,
  selectedOption,
  setValue,
}) {
  return (
    <label className='mr-5'>
      <input
        type='radio'
        value={value}
        name={name}
        checked={selectedOption === value}
        onChange={(e) => setValue(e.target.value === 'true')}
        className='mr-2 accent-blue-600'
      />
      {text}
    </label>
  );
}
