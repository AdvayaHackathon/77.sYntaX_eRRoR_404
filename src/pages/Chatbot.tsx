// src/pages/Chatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Hi! Ask me anything.' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chat', { // Adjust the URL if your backend is different
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error from backend:', errorData);
                setMessages((prev) => [...prev, { role: 'bot', content: `Error: ${errorData.error || 'Failed to get response.'}` }]);
            } else {
                const data = await response.json();
                setMessages((prev) => [...prev, { role: 'bot', content: data.response }]);
            }
        } catch (error: any) {
            console.error('Fetch error:', error);
            setMessages((prev) => [...prev, { role: 'bot', content: 'Error communicating with the server.' }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-start px-4 mt-8">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-center mb-2">Voyager Chatbot 🤖</h2>
                    <div className="h-[28rem] overflow-y-auto bg-gray-50 rounded-xl p-4 space-y-2 shadow-inner">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                                        msg.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-900'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="text-sm text-gray-500 italic">Thinking...</div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything!"
                            className="flex-1"
                        />
                        <Button onClick={handleSend} disabled={loading}>Send</Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Chatbot;