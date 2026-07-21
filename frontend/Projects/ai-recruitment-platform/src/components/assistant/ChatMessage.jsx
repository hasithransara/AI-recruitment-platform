function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-xl px-5 py-3 rounded-2xl ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white border border-slate-200"
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;