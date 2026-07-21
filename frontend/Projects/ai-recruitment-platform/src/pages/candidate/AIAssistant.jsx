import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ChatMessage from "../../components/assistant/ChatMessage";
import ChatInput from "../../components/assistant/ChatInput";
import SuggestionCard from "../../components/assistant/SuggestionCard";

import messages from "../../data/assistant";

function AIAssistant() {
  const [chat, setChat] = useState(messages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setChat([
      ...chat,
      {
        id: Date.now(),
        sender: "user",
        text: input,
      },
      {
        id: Date.now() + 1,
        sender: "ai",
        text: "This is a demo AI response. Later we'll connect this to a real AI service.",
      },
    ]);

    setInput("");
  };

  const suggestions = [
    "Review my resume",
    "Prepare me for an interview",
    "Recommend jobs",
    "Improve my LinkedIn profile",
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="AI Career Assistant"
        subtitle="Ask career-related questions and get AI guidance."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {suggestions.map((item) => (
          <SuggestionCard
            key={item}
            title={item}
            onClick={() => setInput(item)}
          />
        ))}
      </div>

      <div className="bg-slate-100 rounded-2xl p-6 min-h-[400px]">
        {chat.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            text={message.text}
          />
        ))}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </DashboardLayout>
  );
}

export default AIAssistant;