function ConversationItem({ conversation, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(conversation)}
      className={`w-full text-left p-4 rounded-xl mb-3 transition ${
        selected?.id === conversation.id
          ? "bg-indigo-600 text-white"
          : "bg-white hover:bg-slate-100"
      }`}
    >
      <h3 className="font-semibold">{conversation.recruiter}</h3>
      <p className="text-sm opacity-80">{conversation.company}</p>
    </button>
  );
}

export default ConversationItem;