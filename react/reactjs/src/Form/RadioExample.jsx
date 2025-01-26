import { useState } from 'react';

export default function RadioExample() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update the state with the selected value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You selected: ${selectedOption}`);
  };

  return (
    <form onSubmit={handleSubmit} className='p-4'>
      <h2 className='text-lg font-semibold mb-4'>Choose an option:</h2>

      {/* Radio Button 1 */}
      <label className='flex items-center mb-2'>
        <input
          type='radio'
          value='optionone'
          name='options'
          checked={selectedOption === 'optionone'}
          onChange={handleChange}
          className='mr-2 accent-blue-600'
        />
        Option One
      </label>

      {/* Radio Button 2 */}
      <label className='flex items-center mb-2'>
        <input
          type='radio'
          value='option2'
          name='options'
          checked={selectedOption === 'option2'}
          onChange={handleChange}
          className='mr-2'
        />
        Option Two
      </label>

      {/* Radio Button 3 */}
      <label className='flex items-center mb-2'>
        <input
          type='radio'
          value='option3'
          name='options'
          checked={selectedOption === 'option3'}
          onChange={handleChange}
          className='mr-2'
        />
        Option 3
      </label>

      <button
        type='submit'
        className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
      >
        Submit
      </button>
    </form>
  );
}
