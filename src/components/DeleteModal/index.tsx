interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask?: (taskData: any) => void;
}

const DeleteModal = ({ isOpen , onClose}: EditModalProps) => {
    const closeModal = () => {
        onClose();
        
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
        className="md:w-[25vw] w-[100%] h-[25%]  bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 backdrop-blur-md shadow-md z-50  rounded-xl overflow-hidden"
        style={{
          border: `2px solid #FF748B`,
        }}
      >
        <div className="w-[100%] h-[30px] flex justify-end ">
          <div className="w-[15px] h-[15px] bg-[red] mr-4 mt-4 rounded-full cursor-pointer">
          
          </div>
        </div>
        <div className="w-[100%] h-[80%] flex flex-col items-center justify-center">
        <div className="w-[100%] flex justify-center  mb-5 ">
        <p className="text-[20px] text-[white]">Do You Want To Delete</p>
        </div>
        <div className="w-[100%] gap-3 flex justify-center">
            <button className="px-5 py-2 bg-[green] rounded-sm text-[white] cursor-pointer">No</button>
            <button className="px-5 py-2 bg-[red] rounded-sm text-[white] cursor-pointer">Yes</button>

        </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
