import RadioInput from './RadioInput';
export default function SettingsForm({ value, setValue, handleSubmit }) {
  return (
    <div className='flex flex-col justify-between  h-[28rem]'>
      <div>
        <h1 className='text-xl'>
          Do you want to make your profile to be public
        </h1>
        <RadioInput
          value={true}
          name={'public'}
          text='Yes'
          selectedOption={value}
          setValue={setValue}
        />

        <RadioInput
          value={false}
          name={'public'}
          text='No'
          selectedOption={value}
          setValue={setValue}
        />
      </div>

      <button
        onClick={(e) => handleSubmit(e)}
        className='w-24 h-10 font-bold border border-gray-400 bg-gray-800 hover:bg-gray-900 mt-3 rounded-lg cursor-pointer'
      >
        Submit
      </button>
    </div>
  );
}
