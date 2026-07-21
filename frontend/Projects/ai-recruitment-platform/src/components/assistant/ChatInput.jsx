import { Send } from "lucide-react";

function ChatInput({ value, onChange, onSend }) {
  return (
    <div className="flex gap-3 mt-6">
      <input
        type="text"
        placeholder="Ask AI anything..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={onSend}
        className="bg-indigo-600 text-white px-5 rounded-xl hover:bg-indigo-700 flex items-center"
      >
        <Send size={20} />
      </button>
    </div>
  );
}

export default ChatInput;