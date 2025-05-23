// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { getRandomColors } from "../../helpers/getRandomColors";
// import { v4 as uuidv4 } from "uuid";

// interface Tag {
//   title: string;
//   bg: string;
//   text: string;
// }

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   handleAddTask?: (taskData: any) => void;
//   currentTask:any
// }

// const EditModal = ({ isOpen, onClose, setOpen,currentTask, handleAddTask }: EditModalProps) => {
//   const initialTaskData = {
//     id: uuidv4()||currentTask?.id,
//     title: ""||currentTask?.title,
//     description: ""||currentTask?.description,
//     priority: ""||currentTask?.priority,
//     deadline: 0||currentTask?.deadline,
//     image: ""||currentTask?.image,
//     alt: "",
//     tags: [] as Tag[]||currentTask?.tags  as Tag[],
//   };

//   const [taskData, setTaskData] = useState(initialTaskData);
//   const [tagTitle, setTagTitle] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         if (e.target) {
//           setTaskData({ ...taskData, image: e.target.result as string });
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleAddTag = () => {
//     if (tagTitle.trim() !== "") {
//       const { bg, text } = getRandomColors();
//       const newTag: Tag = { title: tagTitle.trim(), bg, text };
//       setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
//       setTagTitle("");
//     }
//   };

//   const closeModal = () => {
//     setOpen(false);
//     onClose();
//     setTaskData(initialTaskData);
//   };

//   const handleSubmit = () => {
//     handleAddTask(taskData);
//     closeModal();
//   };

//   return (
//     <div
//       className={`w-screen h-screen place-items-center fixed top-0 left-0 z-30 ${
//         isOpen ? "grid" : "hidden"
//       }`}
//     >
//       <div
//         className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-30"
//         onClick={closeModal}
//       ></div>
//       <div
//         className="md:w-[60vw] w-[100%] h-[80%]  bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 backdrop-blur-md shadow-md z-50  rounded-xl overflow-hidden"
//         style={{
//           border: `2px solid #FF748B`,
//         }}
//       >
//         <div className="w-[100%] h-[30px] flex justify-end">
//           <div className="w-[15px] h-[15px] bg-[red] mr-4 mt-4 rounded-full cursor-pointer"></div>
//         </div>
//         <div className="px-14  pt-2 pb-10 gap-3 flex flex-col items-center">
//           <p className="text-left w-[100%] font-[600] text-[20px] text-[white]">
//             Edit Task
//           </p>
//           <input
//             type="text"
//             name="title"
//             value={taskData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full h-12 px-3 outline-none  border border-slate-300 text-sm font-medium rounded-md"
//           />
//           <input
//             type="text"
//             name="description"
//             value={taskData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full h-12 px-3 outline-none  bg-slate-100 border border-slate-300 text-sm font-medium rounded-md"
//           />
//           <select
//             name="priority"
//             onChange={handleChange}
//             value={taskData.priority}
//             className="w-full h-12 px-2 outline-none  bg-slate-100 border border-slate-300 text-sm rounded-md"
//           >
//             <option value="">Priority</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//           <input
//             type="number"
//             name="deadline"
//             value={taskData.deadline}
//             onChange={handleChange}
//             placeholder="Deadline"
//             className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
//           />
//           <input
//             type="text"
//             value={tagTitle}
//             onChange={(e) => setTagTitle(e.target.value)}
//             placeholder="Tag Title"
//             className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
//           />
//           <button
//             className="w-full h-12 bg-slate-500 text-amber-50 font-medium rounded-md"
//             onClick={handleAddTag}
//           >
//             Add Tag
//           </button>
//           <div className="w-full">
//             {taskData.tags && <span>Tags:</span>}
//             {taskData.tags.map((tag, index) => (
//               <div
//                 key={index}
//                 className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium"
//                 style={{ backgroundColor: tag.bg, color: tag.text }}
//               >
//                 {tag.title}
//               </div>
//             ))}
//           </div>
//           <div className="w-full flex items-center gap-4 justify-between">
//             <input
//               type="text"
//               name="alt"
//               value={taskData.alt}
//               onChange={handleChange}
//               placeholder="Image Alt"
//               className="w-full h-12 px-3 outline-none  bg-slate-100 border border-slate-300 text-sm rounded-md"
//             />
//             <input
//               type="file"
//               id="imageUpload"
//               onChange={handleImageChange}
//               className="hidden"
//             />

//             <label
//               htmlFor="imageUpload"
//               className="cursor-pointer w-[140px] py-2 text-sm bg-slate-500 text-white rounded-md hover:bg-slate-600 transition"
//             >
//               Upload Image
//             </label>
//           </div>
//           <button
//             className="w-full mt-3  h-12 bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] text-blue-50 font-medium rounded-md"
//             onClick={handleSubmit}
//           >
//             Submit Task
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


import React, { useState } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { v4 as uuidv4 } from "uuid";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "";
  deadline: number;
  image: string;
  alt: string;
  tags: Tag[];
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask?: (taskData: Task) => void|any;
  currentTask: Task | null;
}

const EditModal = ({
  isOpen,
  onClose,
  setOpen,
  currentTask,
  handleAddTask,
}: EditModalProps) => {
 
  const initialTaskData: Task = {
    id: uuidv4() || currentTask?.id || "",
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    priority: currentTask?.priority || "",
    deadline: currentTask?.deadline || 0,
    image: currentTask?.image || "",
    alt: currentTask?.alt || "",
    tags: currentTask?.tags || [],
  };

  const [taskData, setTaskData] = useState<Task>(initialTaskData);
  const [tagTitle, setTagTitle] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    if (handleAddTask) {
      handleAddTask(taskData);
    }
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 z-30 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-30"
        onClick={closeModal}
      ></div>
      <div
        className="md:w-[60vw] w-[100%] h-[80%] bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 backdrop-blur-md shadow-md z-50 rounded-xl overflow-hidden"
        style={{
          border: `2px solid #FF748B`,
        }}
      >
        <div className="w-[100%] h-[30px] flex justify-end">
          <div className="w-[15px] h-[15px] bg-[red] mr-4 mt-4 rounded-full cursor-pointer"></div>
        </div>
        <div className="px-14 pt-2 pb-10 gap-3 flex flex-col items-center">
          <p className="text-left w-[100%] font-[600] text-[20px] text-[white]">
            Edit Task
          </p>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full h-12 px-3 outline-none border border-slate-300 text-sm font-medium rounded-md"
          />
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm font-medium rounded-md"
          />
          <select
            name="priority"
            onChange={handleChange}
            value={taskData.priority}
            className="w-full h-12 px-2 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
          >
            <option value="">Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="number"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            placeholder="Deadline"
            className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
          />
          <input
            type="text"
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
            placeholder="Tag Title"
            className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
          />
          <button
            className="w-full h-12 bg-slate-500 text-amber-50 font-medium rounded-md"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
          <div className="w-full">
            {taskData.tags && <span>Tags:</span>}
            {taskData.tags.map((tag, index) => (
              <div
                key={index}
                className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium"
                style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                {tag.title}
              </div>
            ))}
          </div>
          <div className="w-full flex items-center gap-4 justify-between">
            <input
              type="text"
              name="alt"
              value={taskData.alt}
              onChange={handleChange}
              placeholder="Image Alt"
              className="w-full h-12 px-3 outline-none bg-slate-100 border border-slate-300 text-sm rounded-md"
            />
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-[140px] py-2 text-sm bg-slate-500 text-white rounded-md hover:bg-slate-600 transition"
            >
              Upload Image
            </label>
          </div>
          <button
            className="w-full mt-3 h-12 bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] text-blue-50 font-medium rounded-md"
            onClick={handleSubmit}
          >
            Submit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

