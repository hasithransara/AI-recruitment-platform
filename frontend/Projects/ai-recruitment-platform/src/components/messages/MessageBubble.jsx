function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-md px-5 py-3 rounded-2xl ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white border"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default MessageBubble;