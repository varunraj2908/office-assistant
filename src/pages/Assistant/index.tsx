import { useAITeacher } from "./../../hooks/useAITeacher";
import { useState } from "react";
import { CameraControls, Environment, Float, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, button, useControls } from "leva";
import { Suspense, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AnimatedBg from "./../../AnimatedBg.json";
import AIavatar from "./../../Aiavtar.json";
import VoiceAnimation from "./../../VoiceAnimation.json";
import NuralinkAnimation from "./../../NuralinkAnimation.json";
import Table from "./../../Table.json";
import Lottie from "lottie-react";
import { TypingBox } from "../../components/TypingBox";
import { Teacher } from "../../components/Teacher";
import { degToRad } from "three/src/math/MathUtils.js";

const itemPlacement = {
  default: {
    classroom: {
      position: [0.2, -1.7, -2],
    },
    teacher: {
      position: [-1, -1.7, -3],
    },
    board: {
      position: [0.45, 0.382, -6],
    },
  },
  alternative: {
    classroom: {
      position: [0.3, -1.7, -1.5],
      rotation: [0, degToRad(-90), 0],
      scale: 0.4,
    },
    teacher: { position: [-1, -1.7, -3] },
    board: { position: [1.4, 0.84, -8] },
  },
};

const Assistant = () => {
  const teacher = useAITeacher((state: any) => state.teacher);
  const classroom = useAITeacher((state: any) => state.classroom);

  const fullText =
    "AI, or Artificial Intelligence, is a type of technology that allows computers and machines to think, learn, and make decisions — almost like a human. Instead of just following fixed rules, AI can analyze data, understand patterns, and improve over time. You’ve probably seen AI in action when you talk to voice assistants like Siri or Alexa, when Netflix recommends a movie, or when tools like ChatGPT have conversations with you. Some AI systems can even create things like images, write stories, or drive cars! AI is changing the way we live and work — making life more efficient, but also bringing challenges we need to manage carefully.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

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
      utterance.lang = "en-IN";
      let selectedVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("susan") ||
          v.name.toLowerCase().includes("kendra") ||
          v.name.toLowerCase().includes("siri") ||
          v.name.toLowerCase().includes("linda") ||
          (v.lang === "en-IN" && v.name.toLowerCase().includes("google"))
      );
      if (!selectedVoice) {
        selectedVoice = voices.find((v) => v.lang === "en-IN");
      }
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
        console.warn("Preferred female voice not found. Using default voice.");
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log("Using voice:", selectedVoice.name, selectedVoice.lang);
      }

      utterance.onend = () => {
        console.log("Speech finished.");
      };
      utterance.onerror = (err) => {
        console.error("Speech error:", err.error);
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
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.onresult = (e: SpeechRecognitionResult) => {
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
    <div className=" w-[80%] h-[100%]  ">
      <div className="room relative">
        <Lottie animationData={AnimatedBg} loop={true} className="w-[100%]" />

        <TypingBox prompt={prompt} handleSpeak={handleSpeak} />

        <div
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "0px",
            left: "350px",
          }}
        >
          <Lottie
            animationData={NuralinkAnimation}
            loop={true}
            className="w-[300px] h-[300px] "
          />
        </div>

        <div
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "0px",
            left: "740px",
          }}
        >
          <Lottie
            animationData={NuralinkAnimation}
            loop={true}
            className="w-[300px] h-[300px] "
          />
        </div>

        <div
          className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px]"
          style={{
            width: "300px",
            position: "absolute",
            bottom: "88px",
            right: "18px",
            borderRadius: "10px",
          }}
        >
          <Lottie
            animationData={VoiceAnimation}
            loop={true}
            className="w-[300px] "
          />
        </div>
        <div
          className="bg-[black]"
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
            bottom: "230px",
            right: "90px",
            borderRadius: "100px",
          }}
        >
          <Lottie
            animationData={AIavatar}
            loop={true}
            className="w-[150px] h-[150px] "
          />
        </div>

        <div
          style={{
            width: "500px",
            height: "500px",
            position: "absolute",
            top: "170px",
            left: "580px",
          }}
        >
          <Lottie
            animationData={Table}
            loop={true}
            className="w-[500px] h-[500px] "
          />
        </div>

        <div
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
        >
          <Lottie
            animationData={NuralinkAnimation}
            loop={true}
            className="w-[300px] h-[300px] "
          />
        </div>

        <div
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "0px",
            left: "1100px",
          }}
        >
          <Lottie
            animationData={NuralinkAnimation}
            loop={true}
            className="w-[300px] h-[300px] "
          />
        </div>

        {/* <div
          className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] "
          style={{
            width: "500px",
            height: "120px",
            position: "absolute",
            top: "300px",
            left: "500px",

            borderRadius: "10px",
            zIndex: 99999,
          }}
        >
          
          
          <div className="w-[30px] h-[30px] relative overflow-hidden ml-[-22px] ">
            
            <div
              className="w-[50px] h-[40px] bg-[#640D5F] absolute bottom-[10px] left-[7px]"
              style={{ transform: "rotate(50deg)" }}
            ></div>
          </div>
        </div> */}
      </div>

      <Leva hidden />
      <Canvas
        camera={{
          position: [0, 0, 0.0001],
        }}
      >
        <CameraManager />
        <Suspense>
          <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.8} color="pink" />
            <Teacher
              teacher={teacher}
              key={teacher}
              {...itemPlacement[classroom].teacher}
              scale={2.3}
              rotation-y={degToRad(20)}
            />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Assistant;

const CAMERA_POSITIONS = {
  default: [0, 6.123233995736766e-21, 0.0001],
  loading: [
    0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
  ],
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279],
};

const CAMERA_ZOOMS = {
  default: 1,
  loading: 1.3,
  speaking: 2.1204819420055387,
};

const CameraManager = () => {
  const controls = useRef();
  const loading = useAITeacher((state:any) => state.loading);
  const currentMessage = useAITeacher((state:any) => state.currentMessage);

  useEffect(() => {
    if (loading) {
      controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
    } else if (currentMessage) {
      controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
    }
  }, [loading]);

  useControls("Helper", {
    getCameraPosition: button(() => {
      const position = controls.current.getPosition();
      const zoom = controls.current.camera.zoom;
      console.log([...position], zoom);
    }),
  });

  return (
    <CameraControls
      ref={controls}
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3}
      azimuthRotateSpeed={-0.3}
      mouseButtons={{
        left: 1,
        wheel: 16,
      }}
      touches={{
        one: 32,
        two: 512,
      }}
    />
  );
};

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");

// import * as googleTTS from 'google-tts-api'; // Import the google-tts-api
// import { useAITeacher } from "./../../hooks/useAITeacher";
// import React, { useState, useEffect, useRef,Suspense } from "react";
// import { CameraControls, Environment, Float, useGLTF } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva, button, useControls } from "leva";
// import Lottie from "lottie-react";
// import { TypingBox } from "../../components/TypingBox";
// import { Teacher } from "../../components/Teacher";
// import { degToRad } from "three/src/math/MathUtils.js";
// import AnimatedBg from "./../../AnimatedBg.json";
// import RoundAnimation from "./../../RoundAnimation.json";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import VoiceAnimation from "./../../VoiceAnimation.json";
// import NuralinkAnimation from "./../../NuralinkAnimation.json";
// import Table from "./../../Table.json";

// const itemPlacement = {
//   default: {
//     classroom: {
//       position: [0.2, -1.7, -2],
//     },
//     teacher: {
//       position: [-1, -1.7, -3],
//     },
//     board: {
//       position: [0.45, 0.382, -6],
//     },
//   },
//   alternative: {
//     classroom: {
//       position: [0.3, -1.7, -1.5],
//       rotation: [0, degToRad(-90), 0],
//       scale: 0.4,
//     },
//     teacher: { position: [-1, -1.7, -3] },
//     board: { position: [1.4, 0.84, -8] },
//   },
// };

// const Assistant = () => {
//   const teacher = useAITeacher((state: any) => state.teacher);
//   const classroom = useAITeacher((state: any) => state.classroom);

//   const fullText =
//     "AI, or Artificial Intelligence, is a type of technology that allows computers and machines to think, learn, and make decisions — almost like a human.";
//   const [displayedText, setDisplayedText] = useState("");

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText((prev) => prev + fullText[index]);
//       index++;
//       if (index >= fullText.length) clearInterval(interval);
//     }, 10);
//     return () => clearInterval(interval);
//   }, []);

//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [isReady, setIsReady] = useState(false);
//   const [prompt, setPrompt] = useState("Listening...");

//   const API_KEY = "AIzaSyCSZtZEdzh_w6swZlHzLpxbzGQVsStcbyw";
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   async function run(prompt: string): Promise<string> {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });
//     const result = await chatSession.sendMessage(prompt);
//     return await result.response.text();
//   }

//   function detectLanguage(text: string): string {
//     const malayalamRegex = /[\u0D00-\u0D7F]/;
//     return malayalamRegex.test(text) ? "ml-IN" : "en-IN";
//   }

//   // Replace the speech function with google-tts-api
//   const speakWithGoogleTTS = async (text: string) => {
//     const language = detectLanguage(text);

//     try {
//       // Get the URL for the generated speech using google-tts-api
//       const url = googleTTS.getAudioUrl(text, {
//         lang: language,
//         slow: false,  // Adjust speech speed if needed
//         host: 'https://translate.google.com',
//       });

//       // Play the audio (you can customize this logic as needed)
//       const audio = new Audio(url);
//       audio.play();

//       console.log('Speech started:', url);
//     } catch (error) {
//       console.error('Error generating speech:', error);
//     }
//   };

//   async function aiResponse(input: string) {
//     try {
//       const text = await run(input);
//       const cleanText = text
//         .replace(/google/gi, "Varun Raj")
//         .replace(/\*\*/g, "")
//         .replace(/\*/g, "");
//       setPrompt(cleanText);
//       setTimeout(() => speakWithGoogleTTS(cleanText), 200); // Using Google TTS here
//       console.log("AI Response:", cleanText);
//     } catch (error) {
//       console.error("Error in AI response:", error);
//     }
//   }

//   let recognition: SpeechRecognition | null = null;

//   if (typeof window !== "undefined") {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       recognition = new SpeechRecognition();
//       recognition.lang = "en-IN";
//       recognition.onresult = (e: SpeechRecognitionEvent) => {
//         const currentIndex = e.resultIndex;
//         const transcript = e.results[currentIndex][0].transcript;
//         setPrompt(transcript);
//         aiResponse(transcript);
//       };
//     } else {
//       console.error("SpeechRecognition is not supported in this browser.");
//     }
//   }

//   const handleSpeak = () => {
//     if (recognition) {
//       recognition.start();
//     } else {
//       alert("Speech Recognition is not supported in this browser.");
//     }
//   };

//   useEffect(() => {
//     const loadVoices = () => {
//       const availableVoices = window.speechSynthesis.getVoices();
//       if (availableVoices.length > 0) {
//         setVoices(availableVoices);
//         setIsReady(true);
//       }
//     };

//     if (typeof window !== "undefined" && window.speechSynthesis) {
//       window.speechSynthesis.onvoiceschanged = loadVoices;
//       loadVoices();
//     }

//     return () => {
//       if (window.speechSynthesis) {
//         window.speechSynthesis.onvoiceschanged = null;
//       }
//     };
//   }, []);

//   return (
//     <div className="w-[80%] h-[100%]">
//       <div className="room relative">
//         <Lottie animationData={AnimatedBg} loop={true} className="w-[100%]" />
//         <TypingBox prompt={prompt} handleSpeak={handleSpeak} />

//         <div style={{ width: "400px", height: "400px", position: "absolute", top: "0px", left: "350px" }}>
//           <Lottie animationData={NuralinkAnimation} loop className="w-[300px] h-[300px]" />
//         </div>

//         <div style={{ width: "400px", height: "400px", position: "absolute", top: "0px", left: "740px" }}>
//           <Lottie animationData={NuralinkAnimation} loop className="w-[300px] h-[300px]" />
//         </div>

//         <div className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px]" style={{ width: "300px", position: "absolute", bottom: "88px", right: "18px", borderRadius: "10px" }}>
//           <Lottie animationData={VoiceAnimation} loop className="w-[300px]" />
//         </div>

//         <div style={{ width: "500px", height: "500px", position: "absolute", top: "170px", left: "580px" }}>
//           <Lottie animationData={Table} loop className="w-[500px] h-[500px]" />
//         </div>

//         <div style={{ width: "400px", height: "400px", position: "absolute", top: "0px", left: "0px" }}>
//           <Lottie animationData={NuralinkAnimation} loop className="w-[300px] h-[300px]" />
//         </div>

//         <div style={{ width: "400px", height: "400px", position: "absolute", top: "0px", left: "1100px" }}>
//           <Lottie animationData={NuralinkAnimation} loop className="w-[300px] h-[300px]" />
//         </div>
//       </div>

//       <Leva hidden />
//       <Canvas camera={{ position: [0, 0, 0.0001] }}>
//         <CameraManager />
//         <Suspense>
//           <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
//             <Environment preset="sunset" />
//             <ambientLight intensity={0.8} color="pink" />
//             <Teacher
//               teacher={teacher}
//               key={teacher}
//               {...itemPlacement[classroom].teacher}
//               scale={2.3}
//               rotation-y={degToRad(20)}
//             />
//           </Float>
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default Assistant;

// const CAMERA_POSITIONS = {
//   default: [0, 6.123233995736766e-21, 0.0001],
//   loading: [0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058],
//   speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279],
// };

// const CAMERA_ZOOMS = {
//   default: 1,
//   loading: 1.3,
//   speaking: 2.1204819420055387,
// };

// const CameraManager = () => {
//   const controls = useRef();
//   const loading = useAITeacher((state) => state.loading);
//   const currentMessage = useAITeacher((state) => state.currentMessage);

//   useEffect(() => {
//     if (loading) {
//       controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
//       controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
//     } else if (currentMessage) {
//       controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
//       controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
//     }
//   }, [loading]);

//   useControls("Helper", {
//     getCameraPosition: button(() => {
//       const position = controls.current.getPosition();
//       const zoom = controls.current.camera.zoom;
//       console.log([...position], zoom);
//     }),
//   });

//   return (
//     <CameraControls
//       ref={controls}
//       minZoom={1}
//       maxZoom={3}
//       polarRotateSpeed={-0.3}
//       azimuthRotateSpeed={-0.3}
//       mouseButtons={{ left: 1, wheel: 16 }}
//       touches={{ one: 32, two: 512 }}
//     />
//   );
// };

// useGLTF.preload("/models/classroom_default.glb");
// useGLTF.preload("/models/classroom_alternative.glb");
