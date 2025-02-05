import { useState } from 'react';

export default function Form() {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  function handleTabButton(text: string) {
    setActiveTab(text);
  }

  function handleFormSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    alert('form submitted');
  }

  return (
    <div className='flex flex-col  align-center  h-full w-full'>
      <h1 className='text-2xl font-semibold'>Enter you detais to register</h1>
      <div className='bg-emerald-800 ml-10 mt-10 border border-gray-400 rounded-sm flex flex-col h-[35rem] w-[35rem]'>
        <div className='mt-8  '>
          <TabButton
            onTabChange={handleTabButton}
            text='Profile'
            isActive={true}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Interest'
            isActive={false}
          />
          <TabButton
            onTabChange={handleTabButton}
            text='Settings'
            isActive={false}
          />
        </div>
        <form className='w-full flex-1 flex flex-col justify-between py-4 bg-blue-900'>
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
            {activeTab === 'interest' && <Interest />}
            {activeTab === 'settings' && <SettingsForm />}
          </div>
          <button
            onClick={(e) => handleFormSubmit(e)}
            className='w-24 h-10 font-bold  border border-gray-400 bg-gray-800 ml-6 mt-3 rounded-lg cursor-pointer'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function TabButton({
  text,
  isActive,
  onTabChange,
}: {
  text: string;
  isActive: boolean;
  onTabChange(text: string): void;
}) {
  return (
    <button
      onClick={() => onTabChange(text.toLowerCase())}
      className={`border mr-1  w-20 h-8 font-semibold  border-gray-400 rounded-t-lg cursor-pointer ${
        isActive ? 'bg-gray-950' : 'bg-gray-800'
      }`}
    >
      {text}
    </button>
  );
}

function Interest() {
  return <div>Interest</div>;
}

function ProfileForm({
  name,
  age,
  email,
  setName,
  setAge,
  setEmail,
}: {
  name: string;
  age: number;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className='flex flex-col'>
      {/* <div>
        <label>Name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='ml-4 border border-gray-500 p-1'
          type='text'
          placeholder='Enter your name'
        />
      </div> */}
      <InputComponent
        inputType='text'
        labelText='Name'
        value={name}
        setValue={setName}
        placeholderText={'Enter your name'}
      />
      <div>
        <label>Age: </label>
        <input
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className='ml-4 border border-gray-500 p-1'
          type='number'
          placeholder='Enter your age'
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          className='ml-4 border border-gray-500 p-1'
          type='email'
          placeholder='Enter your email'
        />
      </div>
    </div>
  );
}
function InputComponent({
  inputType,
  labelText,
  value,
  setValue,
  placeholderText,
}: {
  inputType: React.HTMLInputTypeAttribute;
  labelText: string;
  value: string | number;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>;
  placeholderText: string;
}) {
  return (
    <div>
      <label>{labelText}: </label>
      <input
        value={value}
        // onChange={(e) => setValue()}
        className='ml-4 border border-gray-500 p-1'
        type={inputType}
        placeholder={placeholderText}
      />
    </div>
  );
}

function SettingsForm() {
  return <div>Settings</div>;
}
