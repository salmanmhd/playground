import { useState } from 'react';

export default function Form() {
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [playGames, setPlayGames] = useState('');
  const [watchMovies, setWatchMovies] = useState('');
  const [gym, setGym] = useState('');

  const [publicProfile, setPublicProfile] = useState(false);

  function handleTabButton(text) {
    setActiveTab(text);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !age ||
      playGames === '' ||
      watchMovies === '' ||
      gym === '' ||
      publicProfile === ''
    ) {
      alert('form not submitted, Please fill all the fields');
      return;
    }
    setShowSubmitted((prev) => !prev);
    alert('form submitted');
  }

  return (
    <div className='flex  align-center h-full w-full'>
      <div className='rounded-md ml-10 mt-10 border border-gray-400 rounded-sm flex flex-col h-[35rem] w-[35rem]'>
        <div className='mt-8 ml-4'>
          <TabButton
            onTabChange={handleTabButton}
            text='Profile'
            isActive={activeTab === 'profile'}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Interest'
            isActive={activeTab === 'interest'}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Settings'
            isActive={activeTab === 'settings'}
          />
        </div>
        <form className='w-full flex-1 flex flex-col justify-between py-4 '>
          <div className='ml-4'>
            {activeTab === 'profile' && (
              <ProfileForm
                name={name}
                age={age}
                email={email}
                setName={setName}
                setAge={setAge}
                setEmail={setEmail}
              />
            )}
            {activeTab === 'interest' && (
              <Interest
                playGames={playGames}
                setPlayGames={setPlayGames}
                watchMovies={watchMovies}
                setWatchMovies={setWatchMovies}
                gym={gym}
                setGym={setGym}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsForm value={publicProfile} setValue={setPublicProfile} />
            )}
          </div>
          <button
            onClick={(e) => handleFormSubmit(e)}
            className='w-24 h-10 font-bold border border-gray-400 bg-gray-800 ml-6 mt-3 rounded-lg cursor-pointer'
          >
            Submit
          </button>
        </form>
      </div>
      {showSubmitted && (
        <div className='rounded-md ml-10 mt-10 border gap-y-4 p-4 border-gray-400 rounded-sm flex flex-col h-[35rem] w-[35rem]'>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Play Games: {playGames ? 'Yes' : 'No'}</p>
          <p>Watch Movies: {watchMovies ? 'Yes' : 'No'}</p>
          <p>Gym: {gym ? 'Yes' : 'No'}</p>
          <p>Public Profile: {publicProfile ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

function TabButton({ text, isActive, onTabChange }) {
  return (
    <button
      onClick={() => onTabChange(text.toLowerCase())}
      className={`border mr-1 w-20 h-8 font-semibold border-gray-400 rounded-t-lg cursor-pointer ${
        isActive ? 'bg-gray-950' : 'bg-gray-800'
      }`}
    >
      {text}
    </button>
  );
}

function Interest({
  playGames,
  setPlayGames,
  watchMovies,
  setWatchMovies,
  gym,
  setGym,
}) {
  return (
    <div>
      <h2>Do you like to play games?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='games'
        selectedOption={playGames}
        setValue={setPlayGames}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='games'
        selectedOption={playGames}
        setValue={setPlayGames}
      />
      <h2 className='mt-4'>Do you like to watch movies?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='movies'
        selectedOption={watchMovies}
        setValue={setWatchMovies}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='movies'
        selectedOption={watchMovies}
        setValue={setWatchMovies}
      />
      <h2 className='mt-4'>Do you go to gym?</h2>
      <RadioInput
        text='Yes'
        value={true}
        nameText='gym'
        selectedOption={gym}
        setValue={setGym}
      />
      <RadioInput
        text='No'
        value={false}
        nameText='gym'
        selectedOption={gym}
        setValue={setGym}
      />
    </div>
  );
}

function RadioInput({ value, name, text, selectedOption, setValue }) {
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

function ProfileForm({ name, age, email, setName, setAge, setEmail }) {
  return (
    <div className='flex flex-col'>
      <InputComponent
        inputType='text'
        labelText='Name'
        value={name}
        setValue={setName}
        placeholderText='Enter your name'
      />

      <InputComponent
        inputType='number'
        labelText='Age'
        value={age}
        setValue={setAge}
        placeholderText='Enter your age'
      />
      <InputComponent
        inputType='email'
        labelText='Email'
        value={email}
        setValue={setEmail}
        placeholderText='Enter your email'
      />
    </div>
  );
}

function InputComponent({
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

function SettingsForm({ value, setValue }) {
  return (
    <>
      <h1 className='text-xl'>Do you want to make your profile to be public</h1>
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
    </>
  );
}
