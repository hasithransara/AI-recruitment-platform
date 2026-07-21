import ConversationItem from "./ConversationItem";

function ConversationList({
  conversations,
  selected,
  onSelect,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-full">
      <h2 className="text-xl font-bold mb-4">
        Recruiters
      </h2>

      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ConversationList;