function SuggestionCard({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border rounded-xl p-4 hover:bg-indigo-50 transition text-left"
    >
      {title}
    </button>
  );
}

export default SuggestionCard;