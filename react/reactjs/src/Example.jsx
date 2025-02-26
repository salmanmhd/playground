import axios from 'axios';

function Example() {
  async function handleClick() {
    const a = await axios.get('https://picsum.photos/v2/list');
    console.log(a);
  }

  return (
    <div>
      <h1>hi there</h1>
      <button onClick={handleClick}>get data</button>
      <h1>Ashraf</h1>
    </div>
  );
}

export default Example;
