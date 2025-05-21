import { PersonCircle } from "react-ionicons";
import taskImage from "./../../assets/images/task.jpg";

const Chat = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
    <div className="z-10 w-full flex h-[95%] flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 backdrop-blur-md" style={{
      border: `1px solid rgba(255, 193, 180, 0.3)`
    }}>

        <div className="w-[100%] h-[100%] flex rounded-lg  overflow-hidden">
          <div className="w-[24vw] h-[100%] shadow-xl ">
            <div className="w-[100%] h-[90px] flex items-center">
              <p className="text-[20px] pl-2">Chat</p>
            </div>

            <div className="w-[100%] h-[100%]  overflow-scroll opacity-90 ">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]?.map(() => {
                return (
                  <div className="w-[100%] h-[70px] flex">
                    <div className="w-[130px] h-[70px]  flex justify-center items-center">
                      <div className="w-[70px] h-[70px]  rounded-full flex justify-center items-center">
                        <PersonCircle
                          color="#FF748B"
                          width={"45px"}
                          height={"45px"}
                        />
                      </div>
                    </div>
                    <div className="w-[100%] h-[70px] flex items-center">
                      <div>
                        <h2 className="text-[16px] text-[white]">
                          Roshan Muhammed
                        </h2>
                        <h2 className="text-[12px]">i have completed</h2>
                      </div>
                    </div>
                    <div className="w-[130px] h-[70px]"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[66vw] h-[100%] ">
            <div className="w-[100%] h-[70px] shadow-xl">
              <div className="flex items-center h-[70px]">
                <div className="w-[65px] h-[65px]  rounded-full flex justify-center items-center">
                  <PersonCircle color="white" width={"45px"} height={"45px"} />
                </div>
                <h2 className="text-[16px] text-[white] font-[600]">
                  Roshan Muhammed
                </h2>
              </div>
            </div>
            <div className="w-[100%]  h-[100%] py-5 px-2">
              <div className="flex items-center pb-5 gap-2 ">
                <span>
                  <PersonCircle color="white" width={"45px"} height={"45px"} />
                </span>
                <span className="shadow-xl bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] text-[white] px-5 py-2 rounded-lg text-center">
                  welcome to you coming
                </span>
              </div>

              <div className="flex items-start gap-2 pb-2">
                <span>
                  <PersonCircle color="white" width={"45px"} height={"45px"} />
                </span>
                <div className="shadow-xl h-[300px] w-[400px] bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] rounded-lg p-3">
                  <div
                    className=" h-[100%] w-[100%] bg-[red] backdrop-blur-[25px] rounded-md relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${taskImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className=" h-[15%] w-[100%] bg-[white] absolute bottom-0"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-3">
                <span>
                  <PersonCircle color="white" width={"45px"} height={"45px"} />
                </span>
                <span className="shadow-xl max-w-[500px] text-left  bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] text-[white] px-5 py-2 rounded-lg">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has
                </span>
              </div>
              <div className="w-[100%] bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30  backdrop-blur-md h-[70px] mt-10 shadow-xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;