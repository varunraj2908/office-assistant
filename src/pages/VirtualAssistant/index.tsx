import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import Voice from "./../../Voice.json"
import Lottie from 'lottie-react';

function VirtualAssistant() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [prompt, setPrompt] = useState("Listening...");

  const API_KEY = "AIzaSyCSZtZEdzh_w6swZlHzLpxbzGQVsStcbyw";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run(prompt: string): Promise<string> {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return await result.response.text();
  }

  function speak(text: string) {
    window.speechSynthesis.cancel();

    const speakText = () => {
      const utterance = new SpeechSynthesisUtterance();

      const maxSpeechLength = 500;
      const trimmedText = text.slice(0, maxSpeechLength);
      utterance.text = trimmedText;
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.lang = "ene-IN";

      let selectedVoice = voices.find((v) => v.lang === "en-IN");
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
        console.warn("Preferred voice not found. Using default voice.");
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        console.log("Speech finished.");
      };

      utterance.onerror = (err) => {
        console.error("Speech error:", err.error);
        console.log("Utterance details:", utterance);
      };

      window.speechSynthesis.speak(utterance);
    };

    if (voices.length === 0) {
      setTimeout(() => {
        const updatedVoices = window.speechSynthesis.getVoices();
        setVoices(updatedVoices);
        speakText();
      }, 300);
    } else {
      speakText();
    }
  }

  async function aiResponse(input: string) {
    try {
      const text = await run(input);
      const cleanText = text
        .replace(/google/gi, "Varun Raj")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      setPrompt(cleanText);
      setTimeout(() => speak(cleanText), 200);
      console.log("AI Response:", cleanText);
    } catch (error) {
      console.error("Error in AI response:", error);
    }
  }

  let recognition: SpeechRecognition | null = null;

  if (typeof window !== "undefined") {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.onresult = (e: SpeechRecognitionEvent) => {
        const currentIndex = e.resultIndex;
        const transcript = e.results[currentIndex][0].transcript;
        setPrompt(transcript);
        aiResponse(transcript);
      };
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  }

  const handleSpeak = () => {
    if (recognition) {
      recognition.start();
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setIsReady(true);
      }
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <div
        className="z-10 w-full flex h-[95%] flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 backdrop-blur-md"
        style={{
          border: `1px solid rgba(255, 193, 180, 0.3)`,
        }}
      >
        <button className="w-[120px] h-[40px] bg-[red] text-white mt-4 ml-4 rounded" onClick={handleSpeak}>
          🎤 Speak
        </button>
        <div className="p-4 text-[12px] font-light text-[white]">{prompt}</div>
        <Lottie animationData={Voice} loop={true} className="w-[200px] h-[200px]"/>
        {!isReady && <p className="text-center text-sm text-gray-600">Loading voices...</p>}
      </div>
    </div>
  );
}

export default VirtualAssistant;







