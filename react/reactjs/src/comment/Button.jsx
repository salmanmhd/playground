import './styles.css';

function Button({ text, handleClick }) {
  return (
    <button
      className='bg-gray-900 rounded-xl px-4 h-8 mr-3 mt-2'
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
