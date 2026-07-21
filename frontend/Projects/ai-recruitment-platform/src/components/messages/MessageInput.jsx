import { Send } from "lucide-react";

function MessageInput({
  value,
  onChange,
  onSend,
}) {
  return (
    <div className="flex gap-3 mt-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-xl px-4 py-3"
      />

      <button
        onClick={onSend}
        className="bg-indigo-600 text-white px-5 rounded-xl hover:bg-indigo-700"
      >
        <Send size={20} />
      </button>
    </div>
  );
}

export default MessageInput;