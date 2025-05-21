import Lottie from "lottie-react";
import { useAITeacher } from "./../hooks/useAITeacher";
import AIavatar from "./../Aiavtar.json";
import { useState, useEffect } from "react";

interface TypeingProps {
  handleSpeak: () => void;
  prompt:any
}

export const TypingBox = ({ handleSpeak,prompt }: TypeingProps) => {
  const loading = useAITeacher((state: any) => state.loading);
  const [question, setQuestion] = useState("");
  const [mouthShape, setMouthShape] = useState("mouthA");
  const [audioPlayer] = useState<any>(null);
  const [visemes] = useState<any[]>([]);
  console.log("=================yyyyyyyyy",prompt)
  const ask = () => {
    if (!question.trim()) return;
    const set = useAITeacher.getState();
    const text1 = 
      "Hello good morning";
      const text2 = 
      "my name is Aira how is going today";
      const text3 = 
      "haii varun what is your task today";
    const visemes = generateFakeVisemes(text1);
    const audioPlayer = createFakeAudioPlayer(text1);

    const message = {
      question,
      id: Date.now(),
      answer: {
        english: text1,
        japanese: text1.split(" ").map((word) => ({ word })),
      },
      visemes,
      audioPlayer,
    };

    set.loading = true;
    set.currentMessage = message;
    set.messages = [...set.messages, message];
    set.loading = false;
    audioPlayer.play();
    setQuestion("");
  };

  useEffect(() => {
    if (!audioPlayer || visemes.length === 0) return;
    let lastVisemeTime = -1;
    const interval = setInterval(() => {
      const currentTime = audioPlayer.currentTime * 1000;

      for (let i = visemes.length - 1; i >= 0; i--) {
        const [time, shape] = visemes[i];
        if (time <= currentTime && time !== lastVisemeTime) {
          setMouthShape(shape);
          lastVisemeTime = time;
          break;
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [audioPlayer, visemes]);

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
      className="absolute w-full bottom-0 flex px-5 pt-3 flex-col"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="gap-3 flex">
          <input
            className="flex-grow bg-slate-800/60 p-2 px-4  text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60 border border-[white]"
            placeholder="Ask Something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") ask();
            }}
          />
          <button
            className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] p-2 px-4 rounded-none border border-[white] text-white flex justify-between items-center gap-2"
            onClick={ask}
          >
            <div
              className="bg-[black]"
              style={{
                width: "30px",
                height: "30px",

                borderRadius: "100%",
                zIndex: 0,
              }}
            >
              <Lottie
                animationData={AIavatar}
                loop={true}
                className="w-[30px] h-[30px] "
              />
            </div>
            Ask To Assistant
          </button>
          <button
            className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] p-2 px-4 rounded-none border border-[white] text-white flex justify-between items-center gap-2"
            onClick={handleSpeak}
          >
            <div
              className="bg-[black]"
              style={{
                width: "30px",
                height: "30px",

                borderRadius: "100%",
                zIndex: 0,
              }}
            >
              <Lottie
                animationData={AIavatar}
                loop={true}
                className="w-[30px] h-[30px] "
              />
            </div>
            <p> Ask to AI</p>
          </button>
        </div>
      )}
      <div className="text-center mt-4">
        <div className={`mouth-shape ${mouthShape}`}></div>
      </div>
    </div>
  );
};

function generateFakeVisemes(text: string) {
  const phonemes = [
    "mouthA",
    "mouthO",
    "mouthU",
    "mouthE",
    "mouthI",
    0,
    1,
    2,
    3,
    4,
    5,
  ];
  const result = [];
  let time = 0;

  for (let i = 0; i < text.length; i++) {
    const phoneme = phonemes[i % phonemes.length];
    result.push([time, phoneme]);
    time += 150;
  }

  return result;
}

function createFakeAudioPlayer(text: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  const voices = synth.getVoices();
  const femaleIndian = voices.find(
    (v) => v.lang === "en-IN" && /female|woman|zira|heli/i.test(v.name)
  );
  const femaleEnglish = voices.find(
    (v) => v.lang.startsWith("en") && /female|woman|zira|heli/i.test(v.name)
  );
  utterance.voice = femaleIndian || femaleEnglish || voices[0];
  const start = Date.now();
  const fakePlayer = {
    currentTime: 0,
    play: () => {
      const interval = setInterval(() => {
        fakePlayer.currentTime = (Date.now() - start) / 1000;
      }, 50);

      utterance.onend = () => {
        clearInterval(interval);
        useAITeacher?.setState?.(() => ({
          currentMessage: null,
        }));
        
      };
      synth.speak(utterance);
    },
    pause: () => synth.cancel(),
  };

  return fakePlayer;
}

// import Lottie from "lottie-react";
// import { useAITeacher } from "./../hooks/useAITeacher";
// import AIavatar from "./../Aiavtar.json";
// import { useState, useEffect } from "react";

// interface TypingProps {
//   handleSpeak: () => void;
//   prompt: any;
// }

// export const TypingBox = ({ handleSpeak, prompt }: TypingProps) => {
//   const loading = useAITeacher((state: any) => state.loading);
//   const [question, setQuestion] = useState("");
//   const [mouthShape, setMouthShape] = useState("mouthA");
//   const [audioPlayer] = useState<any>(null);
//   const [visemes, setVisemes] = useState<any[]>([]);

//   const ask = () => {
//     if (!question.trim()) return;

//     const set = useAITeacher.getState();
//     const texts = [
//       prompt,
//       "Hello good morning",
//       "My name is Aira, how is it going today?",
//       "Hi Roshan Muhammed, what is your task today?"
//     ];
//     const visemesList = texts.map(text => generateFakeVisemes(text));
//     const audioPlayers = texts.map(text => createFakeAudioPlayer(text));

//     const messages = texts.map((text, index) => ({
//       question,
//       id: Date.now() + index,
//       answer: {
//         english: text,
//         japanese: text.split(" ").map((word) => ({ word })),
//       },
//       visemes: visemesList[index],
//       audioPlayer: audioPlayers[index],
//     }));

//     set.loading = true;
//     set.currentMessage = messages[0];
//     set.messages = [...set.messages, ...messages];
//     set.loading = false;

//     playSequentially(audioPlayers, visemesList);
//     setQuestion("");
//   };
//   const playSequentially = (audioPlayers: any[], visemesList: any[]) => {
//     let currentIndex = 0;

//     const playNext = () => {
//       if (currentIndex < audioPlayers.length) {
//         const player = audioPlayers[currentIndex];
//         const viseme = visemesList[currentIndex];
//         player.play();
//         setMouthShape(viseme[0][1]);
//         currentIndex++;
//         setTimeout(playNext, player.duration * 1000);
//       }
//     };

//     playNext();
//   };

//   useEffect(() => {
//     if (!audioPlayer || visemes.length === 0) return;

//     let lastVisemeTime = -1;
//     const interval = setInterval(() => {
//       const currentTime = audioPlayer.currentTime * 1000;

//       for (let i = visemes.length - 1; i >= 0; i--) {
//         const [time, shape] = visemes[i];
//         if (time <= currentTime && time !== lastVisemeTime) {
//           setMouthShape(shape);
//           lastVisemeTime = time;
//           break;
//         }
//       }
//     }, 50);

//     return () => clearInterval(interval);
//   }, [audioPlayer, visemes]);

//   return (
//     <div
//       style={{
//         backgroundColor: "rgba(255, 0, 0, 0.5)",
//         zIndex: 1000,
//         pointerEvents: "auto",
//       }}
//       className="absolute w-full bottom-0 flex px-5 pt-3 flex-col"
//     >
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <span className="relative flex h-4 w-4">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
//           </span>
//         </div>
//       ) : (
//         <div className="gap-3 flex">
//           <input
//             className="flex-grow bg-slate-800/60 p-2 px-4  text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60 border border-[white]"
//             placeholder="Ask Something..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") ask();
//             }}
//           />
//           <button
//             className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] p-2 px-4 rounded-none border border-[white] text-white flex justify-between items-center gap-2"
//             onClick={ask}
//           >
//             <div
//               className="bg-[black]"
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 borderRadius: "100%",
//                 zIndex: 0,
//               }}
//             >
//               <Lottie
//                 animationData={AIavatar}
//                 loop={true}
//                 className="w-[30px] h-[30px] "
//               />
//             </div>
//             Ask To Assistant
//           </button>
//           <button
//             className="bg-gradient-to-r from-[#640D5F] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] p-2 px-4 rounded-none border border-[white] text-white flex justify-between items-center gap-2"
//             onClick={handleSpeak}
//           >
//             <div
//               className="bg-[black]"
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 borderRadius: "100%",
//                 zIndex: 0,
//               }}
//             >
//               <Lottie
//                 animationData={AIavatar}
//                 loop={true}
//                 className="w-[30px] h-[30px] "
//               />
//             </div>
//             <p> Ask to AI</p>
//           </button>
//         </div>
//       )}
//       <div className="text-center mt-4">
//         <div className={`mouth-shape ${mouthShape}`}></div>
//       </div>
//     </div>
//   );
// };

// function generateFakeVisemes(text: string) {
//   const phonemes = [
//     "mouthA",
//     "mouthO",
//     "mouthU",
//     "mouthE",
//     "mouthI",
//     0,
//     1,
//     2,
//     3,
//     4,
//     5,
//   ];
//   const result = [];
//   let time = 0;

//   for (let i = 0; i < text.length; i++) {
//     const phoneme = phonemes[i % phonemes.length];
//     result.push([time, phoneme]);
//     time += 150;
//   }

//   return result;
// }

// function createFakeAudioPlayer(text: string) {
//   const synth = window.speechSynthesis;
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-IN";
//   utterance.rate = 1;
//   const voices = synth.getVoices();
//   const femaleIndian = voices.find(
//     (v) => v.lang === "en-IN" && /female|woman|zira|heli/i.test(v.name)
//   );
//   const femaleEnglish = voices.find(
//     (v) => v.lang.startsWith("en") && /female|woman|zira|heli/i.test(v.name)
//   );
//   utterance.voice = femaleIndian || femaleEnglish || voices[0];
  
//   const start = Date.now();
//   const fakePlayer = {
//     currentTime: 0,
//     play: () => {
//       const interval = setInterval(() => {
//         fakePlayer.currentTime = (Date.now() - start) / 1000;
//       }, 50);

//       utterance.onend = () => {
//         clearInterval(interval);
//       };
//       synth.speak(utterance);
//     },
//     pause: () => synth.cancel(),
//     duration: utterance.text.length / 4,
//   };

//   return fakePlayer;
// }
