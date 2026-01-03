
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Avatar } from './components/Avatar';
import { ChatWindow } from './components/ChatWindow';
import { Message } from './types';
import { getFashionAdvice, getSpeech, playAudio } from './services/geminiService';

const AmbientLight = 'ambientLight' as any;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Aria. Tell me the occasion and I'll suggest an outfit." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [locationInfo, setLocationInfo] = useState<string>('Unknown location');
  
  const currentAudioRef = useRef<AudioBufferSourceNode | null>(null);

  // Fetch location for context-aware styling
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Providing a descriptive string for the AI to understand the context
          setLocationInfo(`Approximate coordinates: Latitude ${latitude.toFixed(2)}, Longitude ${longitude.toFixed(2)}`);
        } catch (e) {
          console.error("Location error", e);
        }
      }, (err) => {
        console.warn("Location permission denied", err);
      });
    }
  }, []);

  const stopAudio = () => {
    if (currentAudioRef.current) {
      try { currentAudioRef.current.stop(); } catch (e) {}
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const handleSendMessage = async (text: string) => {
    if (isLoading || !text.trim()) return;
    
    // Stop any playing audio
    stopAudio();
    
    // Add user message
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        message: m.content
      }));
      history.push({ role: 'user', message: text });

      // Get text response
      const responseText = await getFashionAdvice(history);
      
      // Add assistant message
      const assistantMessage: Message = { role: 'assistant', content: responseText };
      setMessages(prev => [...prev, assistantMessage]);

      // Get and play speech
      const audioData = await getSpeech(responseText);
      if (audioData) {
        setIsSpeaking(true);
        const source = await playAudio(audioData, () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        });
        if (source) currentAudioRef.current = source;
      }
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col md:flex-row">
      {/* 3D View Container */}
      <div className="flex-1 relative order-2 md:order-1 h-[40vh] md:h-full">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
          <AmbientLight intensity={0.4} />
          <Avatar isSpeaking={isSpeaking} />
          <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          <Environment preset="night" />
        </Canvas>
        
        {/* Floating Title Overlay */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">ARIA</h1>
          <div className="h-1 w-12 bg-[#d4af37] mt-2"></div>
        </div>

        {/* Status Indicator */}
        {isSpeaking && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3 shadow-lg shadow-indigo-500/20">
              <div className="flex gap-1.5 h-4 items-center">
                <div className="w-1 h-full bg-indigo-400 animate-[bounce_0.6s_infinite]"></div>
                <div className="w-1 h-full bg-purple-400 animate-[bounce_0.6s_infinite] [animation-delay:-0.2s]"></div>
                <div className="w-1 h-full bg-indigo-400 animate-[bounce_0.6s_infinite] [animation-delay:-0.4s]"></div>
              </div>
              <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                Aria is speaking
              </span>
            </div>
          </div>
        )}
      </div>

      {/* UI Container */}
      <div className="w-full md:w-[480px] p-4 md:p-8 order-1 md:order-2 flex flex-col gap-6 md:h-full justify-center relative z-20">
        <div className="flex-1 max-h-[650px]">
          <ChatWindow 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="hidden md:flex flex-wrap gap-2 justify-center">
          {['Styling for Paris', 'Wedding Guest', 'Casual Brunch'].map(tag => (
            <button 
              key={tag}
              onClick={() => handleSendMessage(`Style a complete ${tag} outfit for me.`)}
              className="text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none"></div>
    </div>
  );
};

export default App;
