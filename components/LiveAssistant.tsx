
import {GoogleGenAI, Modality} from '@google/genai';
import {Loader2, Mic, MicOff, Sparkles, X} from 'lucide-react';
import React from 'react';

const LiveAssistant: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [transcription, setTranscription] = React.useState('');
  const sessionRef = React.useRef<any>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const nextStartTimeRef = React.useRef(0);
  const sourcesRef = React.useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const createBlob = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startSession = async () => {
    setIsConnecting(true);
    const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

    const inputCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)({sampleRate: 16000});
    const outputCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)({sampleRate: 24000});
    audioContextRef.current = outputCtx;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              // Send audio input only after session resolves.
              sessionPromise.then((session) => {
                session.sendRealtimeInput({media: pcmBlob});
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: any) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(
                (prev) => prev + message.serverContent.outputTranscription.text,
              );
            }
            if (message.serverContent?.turnComplete) {
              setTranscription('');
            }
            const audioData =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime,
              );
              const buffer = await decodeAudioData(
                decode(audioData),
                outputCtx,
                24000,
                1,
              );
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () =>
                sourcesRef.current.delete(source),
              );
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach((s) => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => console.error('Live API Error:', e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Kore'}},
          },
          outputAudioTranscription: {},
          systemInstruction:
            'You are AgroSmart AI, a professional agricultural assistant. Help farmers with crop management, weather risks, and market selling times in a simple, friendly manner.',
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    // Properly close the session and release resources.
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
    setIsConnecting(false);
    setTranscription('');
    if (audioContextRef.current) {
      nextStartTimeRef.current = 0;
      sourcesRef.current.forEach((s) => s.stop());
      sourcesRef.current.clear();
    }
  };

  if (!isActive && !isConnecting) {
    return (
      <button
        onClick={startSession}
        className="fixed bottom-8 right-8 w-16 h-16 gradient-bg rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100]"
      >
        <Mic size={32} />
        <span className="absolute -top-12 right-0 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap animate-bounce">
          Talk to Farm Assistant
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[101] bg-emerald-900/90 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300">
      <button
        onClick={stopSession}
        className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={32} />
      </button>

      <div className="relative mb-12">
        <div
          className={`w-32 h-32 rounded-full border-4 border-emerald-400 flex items-center justify-center relative z-10 ${isActive ? 'animate-pulse' : ''}`}
        >
          {isConnecting ? (
            <Loader2 className="animate-spin" size={48} />
          ) : (
            <Mic size={48} />
          )}
        </div>
        {isActive && (
          <>
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-10 delay-300"></div>
          </>
        )}
      </div>

      <div className="text-center space-y-4 max-w-2xl">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          {isConnecting
            ? 'Connecting to AgroSmart AI...'
            : 'AgroSmart AI is Listening'}
          <Sparkles className="text-amber-400" />
        </h3>

        <div className="h-24 flex items-center justify-center overflow-hidden">
          {transcription ? (
            <p className="text-lg text-emerald-100 italic">"{transcription}"</p>
          ) : (
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-6 bg-emerald-300/40 rounded-full animate-pulse"
                  style={{animationDelay: `${i * 150}ms`}}
                ></div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={stopSession}
            className="bg-white text-emerald-800 px-8 py-3 rounded-2xl font-bold hover:bg-emerald-50 transition-colors flex items-center gap-2 mx-auto"
          >
            <MicOff size={20} />
            Stop Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
