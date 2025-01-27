export default function TabButton({ text, isActive, onTabChange }) {
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
