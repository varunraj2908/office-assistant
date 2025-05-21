


import { Link, useLocation } from "react-router-dom";
import {
  AppsOutline,
  ChatboxEllipsesOutline,
  GridOutline,
  LogOutOutline,
} from "react-ionicons";

const Sidebar = () => {
  const location = useLocation();
  const navLinks = [
    { title: "Chat", icon: <ChatboxEllipsesOutline color="black" width="22px" height="22px" />, url: "/chat" },
    { title: "Task", icon: <AppsOutline color="white" width="22px" height="22px" />, url: "/task" },
    { title: "Ai Assistant", icon: <GridOutline color="black" width="22px" height="22px" />, url: "/assistant" },
    // { title: "Virtual Assistant", icon: <GridOutline color="black" width="22px" height="22px" />, url: "/virtual-assistant" },
  ];

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col z-20">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px]" style={{ background: "linear-gradient(to right, #f5ddff, #eda3be, #ffbbc6, rgba(255, 155, 119, 0.3))", backdropFilter: "blur(25px)" }}>
        <span className="text-white font-extrabold text-2xl md:block hidden">MeetUp</span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">L.</span>
      </div>

      <div className="w-full h-[calc(100vh-70px)]  flex flex-col md:items-start items-center gap-2 border-slate-300 py-5 md:px-3 px-3 relative" style={{ background: "linear-gradient(to right, #f5ddff, #eda3be, #ffbbc6, rgba(255, 155, 119, 0.3))", backdropFilter: "blur(25px)" }}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.url; 
          return (
            <Link
              to={link.url}
              key={link.title}
              className={`flex items-center gap-2 w-full px-2 py-3 cursor-pointer ${
                isActive ? "bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] pointer-events-auto" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className={`font-medium text-[15px] md:block hidden ${isActive ? "text-[white]" : "text-[black]"}`}>
                {link.title}
              </span>
            </Link>
          );
        })}

        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gradient-to-r from-[#BA39EF] via-[#BF074c] to-[#FF748B] backdrop-blur-[25px] pointer-events-auto">
          <LogOutOutline color={"white"}/>
          <span className="font-medium text-[15px] text-[white] md:block hidden ">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


