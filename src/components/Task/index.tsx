/* eslint-disable @typescript-eslint/no-explicit-any */
import { PersonCircle, TimeOutline, TrashSharp } from "react-ionicons";
import { TaskT } from "../../types";
import EditModal from "../EditModal";

interface TaskProps {
  task: TaskT;
  provided: any;
  editOpenModal: any;
  deleteOpenModal: any;
}

const Task = ({
  task,
  provided,
  editOpenModal,
  deleteOpenModal,
}: TaskProps) => {
  const { title, description, priority, deadline, image, alt, tags } = task;

  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`w-full cursor-grab  z-20  ${
          priority === "high"
            ? "bg-[#FB2576] opacity-80"
            : priority === "medium"
            ? "bg-[#FF6464] opacity-80"
            : "bg-[#fff] opacity-80"
        } flex flex-col justify-between gap-3 items-start shadow-xl px-3 py-3 backdrop-blur-[25px]`}
      >
        {image && alt && (
          <img src={image} alt={alt} className="w-full h-[170px] " />
        )}
        <div className="flex items-center gap-2 justify-between w-[100%]">
          <div className="flex items-center  gap-2">
            {tags.map((tag) => (
              <span
                key={tag.title}
                className="px-[10px] py-[2px] text-[13px] font-medium"
                style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                {tag.title}
              </span>
            ))}
          </div>
          <div
            className={`w-[90px] h-[25px] text-[13px]  flex justify-center items-center  text-[white] ${
              priority === "high"
                ? "bg-red-500"
                : priority === "medium"
                ? "bg-orange-500"
                : "bg-blue-500"
            }`}
           >
            Low Priority
          </div>
          <div className="w-[100px]  h-[25px] flex gap-1">
          <div className="w-[25px] h-[25px] rounded-full flex justify-center items-center">
          <PersonCircle
          color={`${
            priority === "high" || priority === "medium" ? "white" : "#FB2576"
          }`}
          width={"25px"}
          height={"25px"}
        />
          </div>
          <div className="w-[25px] h-[25px]  rounded-full z-20 flex justify-center items-center">
          <PersonCircle
          color={`${
            priority === "high" || priority === "medium" ? "white" : "#FB2576"
          }`}
          width={"25px"}
          height={"25px"}
        />
          </div>
          <div className="w-[25px] h-[25px]  rounded-full z-20 flex justify-center items-center">
          <PersonCircle
          color={`${
            priority === "high" || priority === "medium" ? "white" : "#FB2576"
          }`}
          width={"25px"}
          height={"25px"}
        />
          </div>

          </div>
         
        </div>
        <div className="w-full flex items-start flex-col gap-0">
          <span
            className={`text-[17px] font-[500] ${
              priority === "high" || priority === "medium"
                ? "text-[white]"
                : "text-[#555]"
            } font-medium `}
          >
            {title}
          </span>
          <span
            className={`text-[13.5px] ${
              priority === "high" || priority === "medium"
                ? "text-[white]"
                : "text-gray-500"
            } font-medium `}
          >
            {description}
          </span>
        </div>
        <div className="w-full border border-dashed"></div>
        <div className="w-full flex items-center justify-between">
          <div className="flex w-[100%] items-center justify-between gap-1">
            <div className="w-[50%] flex gap-1">
              <TimeOutline
                color={`${
                  priority === "high" || priority === "medium"
                    ? "white"
                    : "#666"
                } `}
                width="19px"
                height="19px"
              />
              <span
                className={`text-[13px] ${
                  priority === "high" || priority === "medium"
                    ? "text-[white]"
                    : "text-gray-700"
                }`}
              >
                {deadline} mins
              </span>
            </div>
            <div className="w-[50%] flex justify-end gap-2">
              <div
                className="w-[50px] h-[30px] bg-blue-500 flex justify-center items-center cursor-pointer"
                onClick={() => editOpenModal(task)}
              >
                <p className="text-[white] text-[12px]">Edit</p>
              </div>
              <div
                className={`w-[60px] h-[30px] ${
                  priority === "high" || priority === "medium"
                    ? "bg-[white]"
                    : "bg-[red]"
                } flex justify-center items-center`}
                onClick={() => deleteOpenModal()}
              >
                <p
                  className={`${
                    priority === "high" || priority === "medium"
                      ? "text-[black]"
                      : "text-[white]"
                  } text-[12px]`}
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
