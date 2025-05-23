export interface JapaneseWord {
  word: string;
  furigana?: string;
  english?: string;
}

export interface FakeAudioPlayer {
  currentTime: number;
  play: () => void;
  pause: () => void;
}

export interface Message {
  id: number;
  question: string;
  answer?: {
    japanese: JapaneseWord[];
    english?: string;
  };
  speech?: string;
  visemes?: [number, string | number][];
  audioPlayer?: HTMLAudioElement | FakeAudioPlayer | null;
}
