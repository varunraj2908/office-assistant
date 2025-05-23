/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";

const Home = () => {
  const [columns, setColumns] = useState<Columns>(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [currentTask, setIsCurentTask] = useState<any>("");

  const openModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const editOpenModal = (columnId: any,task:any) => {
    setIsCurentTask(task)
    setSelectedColumn(columnId);
    setOpenEditModal(true);
  };

  const deleteOpenModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };


  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-5 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div
              className="w-full flex flex-col gap-0 relative z-0 "
              key={columnId}
            >
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-3 "
                  >
                    <div className="flex items-center py-[10px] px-3 w-full  shadow-sm text-[#fff] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: any) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: any) => (
                          <>
                            <Task
                              provided={provided}
                              task={task}
                              editOpenModal={() => editOpenModal(columnId, task)}
                              deleteOpenModal={deleteOpenModal}
                            />
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] z-[-1] md:w-[100%] w-full  shadow-xl text-white font-medium text-[15px] bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] pointer-events-auto"
                onClick={() => openModal(columnId)}
              >
                <AddOutline color={"#fff"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />

      <EditModal
        isOpen={openEditModal}
        currentTask={currentTask}
        onClose={closeEditModal}
        setOpen={setOpenEditModal}
        handleAddTask={handleAddTask}
      />

      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        setOpen={setDeleteModal}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
