import {
	ChevronDown,
	NotificationsOutline,
	PersonCircle,
	SearchOutline,
	SettingsOutline,
	ShareSocialOutline,
} from "react-ionicons";
import { Notification } from "../Notification";
import { useState } from "react";
import UserList from "../UserList";

const Navbar = () => {
	 const [isOpen, setIsOpen] = useState(false);
	 const [open, setOpen] = useState(false);
	return (
		<>
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] z-30 fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] " style={{
			background:
			"linear-gradient(to right, rgba(255, 155, 119, 0.3), #ffbbc6 ,#eda3be,#f5ddff )",
		  backdropFilter: "blur(25px)",
		}}> 
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="white"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-[white] font-semibold md:text-lg text-sm whitespace-nowrap">
					Board Name
				</span>
				<ChevronDown
					color="white"
					width={"16px"}
					height={"16px"}
				/>
			</div>
			<div className="md:w-[800px] w-[130px] bg-gray-100 rounded-md  px-3 py-[10px] flex items-center gap-2">
				<SearchOutline color={"#999"} />
				<input
					type="text"
					placeholder="Search"
					className="w-full bg-gray-100 outline-none text-[15px]"
				/>
			</div>
			<div className="md:flex hidden items-center gap-4">
			<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer" onClick={()=>{setOpen(!open);setIsOpen(false)}}>
			<PersonCircle
					color={"#444"}
					
				/>
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<ShareSocialOutline color={"#444"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<SettingsOutline color={"#444"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer" onClick={()=>{setIsOpen(!isOpen);setOpen(false)}}>
					<NotificationsOutline color={"#444"} />
				</div>
			</div>
		</div>
		{isOpen &&
		<Notification />}
		{open &&
		<UserList/>}
		</>
	);
};

export default Navbar;
