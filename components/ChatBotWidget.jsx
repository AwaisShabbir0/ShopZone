'use client';
import { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([userMessage]); // Replace previous messages
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { role: 'assistant', content: data.message };
      setMessages([userMessage, botReply]);
    } catch (error) {
      setMessages([
        userMessage,
        { role: 'assistant', content: '❌ Error: Unable to reach AI.' },
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        aria-label="Chat with AI"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl border rounded-xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-3 font-semibold rounded-t-xl">
            🤖 Chat With AI
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-3 bg-gray-50 text-sm scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'ml-auto bg-blue-100 text-blue-800 text-right'
                    : 'mr-auto bg-green-100 text-green-800 text-left'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="flex justify-center">
                <Loader2 className="animate-spin text-green-700" size={18} />
              </div>
            )}
          </div>

          <div className="flex items-center border-t px-3 py-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
