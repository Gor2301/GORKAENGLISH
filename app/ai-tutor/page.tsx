'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hello! I'm your AI English Tutor. I can help you practice English, correct grammar, expand vocabulary, and improve your speaking and writing skills. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          context: 'You are a friendly and encouraging English tutor. Help students learn English, correct grammar, expand vocabulary, improve pronunciation, and practice conversation. Keep responses clear, supportive, and appropriate for their level. Use examples when helpful.',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      // Remove the user message if AI fails
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#EFEAFF] rounded-full">
                  <Sparkles size={40} className="text-[#8A61FF]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                AI <span className="text-[#8A61FF]">Tutor</span>
              </h1>
              <p className="mt-4 text-lg text-[#666666]">
                Practice English with your personal AI tutor. Get instant feedback on grammar, vocabulary, and conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="section-padding bg-[#F8F8F8] pt-0">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E5E6] overflow-hidden">
              {/* Messages Area */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-[#8A61FF]'
                          : 'bg-[#EFEAFF]'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-[#8A61FF]" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-[#8A61FF] text-white rounded-tr-sm'
                          : 'bg-[#F8F8F8] text-[#03010D] rounded-tl-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.role === 'user'
                            ? 'text-white/60'
                            : 'text-[#666666]'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#EFEAFF] rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-[#8A61FF]" />
                    </div>
                    <div className="bg-[#F8F8F8] px-4 py-3 rounded-2xl rounded-tl-sm">
                      <Loader2 size={20} className="animate-spin text-[#8A61FF]" />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-[#E5E5E6] p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    rows={2}
                    className="flex-1 px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isLoading || !input.trim()}
                    className="flex-shrink-0 self-end"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-[#666666] mt-2">
                  💡 Ask me anything! Practice conversation, grammar, vocabulary, or get writing feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}