import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({
  messages,
  input,
  setInput,
  sendMessage,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col h-full">

      <h2 className="text-xl font-bold mb-6">
        Conversation
      </h2>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </div>

      <MessageInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
      />

    </div>
  );
}

export default ChatWindow;