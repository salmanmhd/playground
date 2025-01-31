import { Form, redirect } from 'react-router';

function RegisterPage() {
  return (
    <div className='px-6 py-4'>
      <h1 className='text-3xl'>User Registration:</h1>
      <Form method='POST'>
        <div className='w-96 mt-8 flex justify-between'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            required
            className='w-72 text-black'
            placeholder='enter your name'
          />
        </div>

        <div className='w-96 mt-8 flex justify-between'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            required
            className='w-72 text-black'
            placeholder='abc@example.com'
          />
        </div>
        <button className='w-32 h-10 font-bold border border-gray-400 bg-gray-800 hover:bg-gray-900 ml-12  rounded-lg cursor-pointer mt-12 '>
          Register
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const { name, email } = Object.fromEntries(formData);
  console.log(name, email);
  return redirect(`/user/${email}`);
}
export default RegisterPage;
