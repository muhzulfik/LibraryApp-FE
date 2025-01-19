/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../Sidebar";

const LayoutDashboard = () => {
	return (
		<>
			<SidebarWithHeader>
				<Outlet />
			</SidebarWithHeader>
		</>
	);
};

export default LayoutDashboard;
