import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";

import ConversationList from "../../components/messages/ConversationList";
import ChatWindow from "../../components/messages/ChatWindow";

import conversations from "../../data/messages";
import chatMessages from "../../data/chatMessages";

function Messages() {
  const [selected, setSelected] = useState(conversations[0]);
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "user",
        text: input,
      },
    ]);

    setInput("");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Messages"
        subtitle="Communicate with recruiters."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <ConversationList
          conversations={conversations}
          selected={selected}
          onSelect={setSelected}
        />

        <div className="lg:col-span-2">
          <ChatWindow
            messages={messages}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Messages;