import {teachers, useAITeacher } from "./../../src/hooks/useAITeacher";

export const BoardSettings = () => {
  const furigana = useAITeacher((state:any) => state.furigana);
  const setFurigana = useAITeacher((state:any) => state.setFurigana);

  const english = useAITeacher((state:any) => state.english);
  const setEnglish = useAITeacher((state:any) => state.setEnglish);

  const teacher = useAITeacher((state:any) => state.teacher);
  const setTeacher = useAITeacher((state:any) => state.setTeacher);

  const speech = useAITeacher((state:any) => state.speech);
  const setSpeech = useAITeacher((state:any) => state.setSpeech);

  const classroom = useAITeacher((state:any) => state.classroom);
  const setClassroom = useAITeacher((state:any) => state.setClassroom);

  return (
    <>
      <div className="absolute right-0 bottom-full flex flex-row gap-10 mb-20">
        {teachers.map((sensei:any, idx:number) => (
          <div
            key={idx}
            className={`p-3 transition-colors duration-500 ${
              teacher === sensei ? "bg-white/80" : "bg-white/40"
            }`}
          >
            <div onClick={() => setTeacher(sensei)}>
              <img
                src={`/images/${sensei}.jpg`}
                alt={sensei}
                className="object-cover w-40 h-40"
              />
            </div>
            <h2 className="text-3xl font-bold mt-3 text-center">{sensei}</h2>
          </div>
        ))}
      </div>
      <div className="absolute left-0 bottom-full flex flex-row gap-2 mb-20">
        <button
          className={` ${
            classroom === "default"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setClassroom("default")}
        >
          Default classroom
        </button>
        <button
          className={` ${
            classroom === "alternative"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setClassroom("alternative")}
        >
          Alternative classroom
        </button>
      </div>
      <div className="absolute left-0 top-full flex flex-row gap-2 mt-20">
        <button
          className={` ${
            speech === "formal"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setSpeech("formal")}
        >
          Formal
        </button>
        <button
          className={` ${
            speech === "casual"
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setSpeech("casual")}
        >
          Casual
        </button>
      </div>
      <div className="absolute right-0 top-full flex flex-row gap-2 mt-20">
        <button
          className={` ${
            furigana
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setFurigana(!furigana)}
        >
          Furigana
        </button>
        <button
          className={`${
            english
              ? "text-white bg-slate-900/40 "
              : "text-white/45 bg-slate-700/20 "
          } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
          onClick={() => setEnglish(!english)}
        >
          English
        </button>
      </div>
    </>
  );
};
