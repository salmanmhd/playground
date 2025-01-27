import InputComponent from './InputComponent';

export default function ProfileForm({
  name,
  age,
  email,
  setName,
  setAge,
  setEmail,
}) {
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
