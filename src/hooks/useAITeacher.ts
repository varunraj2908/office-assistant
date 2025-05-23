// import create from "zustand";

// export const teachers = ["Nanami", "Naoki"];

// export const useAITeacher = create((set, get) => ({
//   messages: [],
//   currentMessage: null,
//   teacher: teachers[0],
//   setTeacher: (teacher:any) => {
//     set(() => ({
//       teacher,
//       messages: get().messages.map((message:any) => {
//         message.audioPlayer = null;
//         return message;
//       }),
//     }));
//   },
//   classroom: "default",
//   setClassroom: (classroom:any) => {
//     set(() => ({
//       classroom,
//     }));
//   },
//   loading: false,
//   furigana: true,
//   setFurigana: (furigana:any) => {
//     set(() => ({
//       furigana,
//     }));
//   },
//   english: true,
//   setEnglish: (english:any) => {
//     set(() => ({
//       english,
//     }));
//   },
//   speech: "formal",
//   setSpeech: (speech) => {
//     set(() => ({
//       speech,
//     }));
//   },
//   askAI: async (question) => {
//     if (!question) {
//       return;
//     }
//     const message = {
//       question,
//       id: get().messages.length,
//     };
//     set(() => ({
//       loading: true,
//     }));

//     const speech = get().speech;

//     // Ask AI
//     const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
//     const data = await res.json();
//     message.answer = data;
//     message.speech = speech;

//     set(() => ({
//       currentMessage: message,
//     }));

//     set((state) => ({
//       messages: [...state.messages, message],
//       loading: false,
//     }));
//     get().playMessage(message);
//   },
//   playMessage: async (message) => {
//     set(() => ({
//       currentMessage: message,
//     }));

//     if (!message.audioPlayer) {
//       set(() => ({
//         loading: true,
//       }));
//       // Get TTS
//       const audioRes = await fetch(
//         `/api/tts?teacher=${get().teacher}&text=${message.answer.japanese
//           .map((word) => word.word)
//           .join(" ")}`
//       );
//       const audio = await audioRes.blob();
//       const visemes = JSON.parse(await audioRes.headers.get("visemes"));
//       const audioUrl = URL.createObjectURL(audio);
//       const audioPlayer = new Audio(audioUrl);

//       message.visemes = visemes;
//       message.audioPlayer = audioPlayer;
//       message.audioPlayer.onended = () => {
//         set(() => ({
//           currentMessage: null,
//         }));
//       };
//       set(() => ({
//         loading: false,
//         messages: get().messages.map((m:any) => {
//           if (m.id === message.id) {
//             return message;
//           }
//           return m;
//         }),
//       }));
//     }

//     message.audioPlayer.currentTime = 0;
//     message.audioPlayer.play();
//   },
//   stopMessage: (message:any) => {
//     message.audioPlayer.pause();
//     set(() => ({
//       currentMessage: null,
//     }));
//   },
// }));


// import create from "zustand";

// // Define the structure of a word in the AI's response
// interface JapaneseWord {
//   word: string;
//   furigana?: string;
//   english?: string;
// }

// // Define the structure of a message
// interface Message {
//   id: number;
//   question: string;
//   answer?: {
//     japanese: JapaneseWord[];
//     english?: string;
//   };
//   speech?: string;
//   visemes?: any;
//   audioPlayer?: HTMLAudioElement | null;
// }

// // Define the structure of the store
// interface AITeacherStore {
//   messages: Message[];
//   currentMessage: Message | null;
//   teacher: string;
//   setTeacher: (teacher: string) => void;

//   classroom: string;
//   setClassroom: (classroom: string) => void;

//   loading: boolean;

//   furigana: boolean;
//   setFurigana: (furigana: boolean) => void;

//   english: boolean;
//   setEnglish: (english: boolean) => void;

//   speech: "formal" | "casual";
//   setSpeech: (speech: "formal" | "casual") => void;

//   askAI: (question: string) => Promise<void>;
//   playMessage: (message: Message) => Promise<void>;
//   stopMessage: (message: Message) => void;
// }



// export const teachers = ["Nanami", "Naoki"];

// export const useAITeacher = create<AITeacherStore>((set, get) => ({
//   messages: [] as Message[],
//   currentMessage: null,
//   teacher: teachers[0],
//   setTeacher: (teacher) => {
//     set(() => ({
//       teacher,
//       messages: get().messages.map((message) => ({
//         ...message,
//         audioPlayer: null,
//       })),
//     }));
//   },

//   classroom: "default",
//   setClassroom: (classroom) => set({ classroom }),

//   loading: false,

//   furigana: true,
//   setFurigana: (furigana) => set({ furigana }),

//   english: true,
//   setEnglish: (english) => set({ english }),

//   speech: "formal",
//   setSpeech: (speech) => set({ speech }),

//   askAI: async (question) => {
//     if (!question) return;

//     const id = get().messages.length;
//     const speech = get().speech;

//     const message: Message = { question, id };

//     set({ loading: true });

//     const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
//     const data = await res.json();

//     message.answer = data;
//     message.speech = speech;

//     set({ currentMessage: message });

//     set((state) => ({
//       messages: [...state.messages, message],
//       loading: false,
//     }));

//     get().playMessage(message);
//   },

//   playMessage: async (message) => {
//     set({ currentMessage: message });

//     if (!message.audioPlayer) {
//       set({ loading: true });

//       const res = await fetch(
//         `/api/tts?teacher=${get().teacher}&text=${message.answer?.japanese
//           .map((w) => w.word)
//           .join(" ")}`
//       );
//       const audio = await res.blob();
//       const visemes = JSON.parse(res.headers.get("visemes") || "[]");

//       const audioUrl = URL.createObjectURL(audio);
//       const audioPlayer = new Audio(audioUrl);

//       message.visemes = visemes;
//       message.audioPlayer = audioPlayer;

//       message.audioPlayer.onended = () => {
//         set({ currentMessage: null });
//       };

//       set((state) => ({
//         loading: false,
//         messages: state.messages.map((m) =>
//           m.id === message.id ? message : m
//         ),
//       }));
//     }

//     message.audioPlayer.currentTime = 0;
//     message.audioPlayer.play();
//   },

//   stopMessage: (message) => {
//     message.audioPlayer?.pause();
//     set({ currentMessage: null });
//   },
// }));


import create from "zustand";
import { Message } from "./../../src/types/Message";

interface AITeacherStore {
  messages: Message[];
  currentMessage: Message | null;
  teacher: string;
  setTeacher: (teacher: string) => void;
  classroom: string;
  setClassroom: (classroom: string) => void;
  loading: boolean;
  furigana: boolean;
  setFurigana: (furigana: boolean) => void;
  english: boolean;
  setEnglish: (english: boolean) => void;
  speech: "formal" | "casual";
  setSpeech: (speech: "formal" | "casual") => void;
  askAI: (question: string) => Promise<void>;
  playMessage: (message: Message) => Promise<void>;
  stopMessage: (message: Message) => void;
}

export const teachers = ["Nanami", "Naoki"];

export const useAITeacher = create<AITeacherStore>((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],

  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => ({
        ...message,
        audioPlayer: null,
      })),
    }));
  },

  classroom: "default",
  setClassroom: (classroom) => set({ classroom }),

  loading: false,

  furigana: true,
  setFurigana: (furigana) => set({ furigana }),

  english: true,
  setEnglish: (english) => set({ english }),

  speech: "formal",
  setSpeech: (speech) => set({ speech }),

  askAI: async (question) => {
    if (!question) return;
    const id = get().messages.length;
    const speech = get().speech;
    const message: Message = { question, id };

    set({ loading: true });

    const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
    const data = await res.json();

    message.answer = data;
    message.speech = speech;

    set({ currentMessage: message });

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));

    get().playMessage(message);
  },

  playMessage: async (message) => {
    set({ currentMessage: message });

    if (!message.audioPlayer) {
      set({ loading: true });

      const res = await fetch(
        `/api/tts?teacher=${get().teacher}&text=${message.answer?.japanese.map((w) => w.word).join(" ")}`
      );
      const audio = await res.blob();
      const visemes = JSON.parse(res.headers.get("visemes") || "[]");
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.visemes = visemes;
      message.audioPlayer = audioPlayer;

      audioPlayer.onended = () => {
        set({ currentMessage: null });
      };

      set((state) => ({
        loading: false,
        messages: state.messages.map((m) => (m.id === message.id ? message : m)),
      }));
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },

  stopMessage: (message) => {
    message.audioPlayer?.pause();
    set({ currentMessage: null });
  },
}));
