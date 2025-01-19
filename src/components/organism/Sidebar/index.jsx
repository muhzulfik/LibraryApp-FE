import { useEffect, useState } from "react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Avatar,
} from "@chakra-ui/react";
import {
	FiMenu,
	FiChevronDown,
	FiBook,
	FiUser,
	FiClipboard,
	FiArchive,
	FiClock,
} from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

const LinkItems = [
	{ name: "Master Buku", icon: FiBook, href: "/master-buku" },
	{ name: "Master Mahasiswa", icon: FiUser, href: "/master-mahasiswa" },
	{
		name: "Transaksi Peminjaman",
		icon: FiClipboard,
		href: "/transaksi-peminjaman",
	},
	{ name: "Inventory Stok Buku", icon: FiArchive, href: "/inventory-buku" },
	{ name: "History Peminjaman", icon: FiClock, href: "/history-peminjaman" },
];

export default function SidebarWithHeader({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 72 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const [selectMenu, setSelectMenu] = useState([]);
	const [activeMenu, setActiveMenu] = useState();

	const handleActiveMenu = (data) => {
		console.log("data", data);
		let selected = LinkItems.find((val) => val.name === data);
		if (selected && selected.name === selectMenu.name) {
			setSelectMenu([]);
		} else {
			setSelectMenu(selected || []);
			setActiveMenu(null);
		}
	};

	useEffect(() => {
		handleActiveMenu("Dashboard");
	}, []);

	console.log("select menu", selectMenu);
	console.log("ini merupakan active menu", activeMenu);
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 72 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text textStyle={"title-big"}>Library System</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			<Box h="85vh" overflowY="auto">
				{LinkItems?.map((link) => (
					<>
						<NavItem
							icon={link.icon}
							child={link.child?.length > 0}
							onClick={() => handleActiveMenu(link.name)}
							key={link.name}
							href={link.href && link.href}
							bg={selectMenu?.name === link.name && !link.child ? "main" : null}
							color={
								selectMenu?.name === link.name && !link.child ? "white" : null
							}>
							{link.name}
						</NavItem>
						{selectMenu?.name === link.name &&
							selectMenu.child?.map((val) => (
								<RouterLink to={val.href} key={val.href}>
									<Flex
										align="center"
										justify="space-between"
										p="2"
										mx="4"
										my="2"
										borderRadius="lg"
										role="group"
										cursor="pointer"
										_hover={{
											bg: "main",
											color: "white",
										}}
										bg={activeMenu === val.name ? "main" : null}
										color={activeMenu === val.name ? "white" : null}
										{...rest}
										key={val.name} // Add a unique key to each Flex element
										onClick={() => setActiveMenu(val.name)}>
										<Text ml={10} fontSize={"14px"}>
											{val.name}
										</Text>
									</Flex>
								</RouterLink>
							))}
					</>
				))}
			</Box>
		</Box>
	);
};

const NavItem = ({ icon, href, child, onClick, children, ...rest }) => {
	return (
		<Link to={href}>
			<Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
				<Flex
					align="center"
					justify="space-between"
					p="3"
					mx="4"
					my="2"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					_hover={{
						bg: "main",
						color: "white",
					}}
					onClick={onClick}
					{...rest}>
					<Flex align={"center"}>
						{icon && (
							<Icon
								mr="4"
								fontSize="16"
								_groupHover={{
									color: "white",
								}}
								as={icon}
							/>
						)}
						{children}
					</Flex>
					{child && <ChevronDownIcon />}
				</Flex>
			</Box>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const navigate = useNavigate();
	let username = Cookies.get("username");
	const handleClick = () => {
		navigate("/");
		Cookies.remove("authToken");
		Cookies.remove("username");
		Cookies.remove("exp");
	};

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="16"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Box display={{ base: "flex", md: "none" }}>Library System</Box>

			<HStack spacing={{ base: "0", md: "6" }}>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}>
							<HStack>
								<Avatar src="https://bit.ly/broken-link" w={10} h={10} />
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2">
									<Text fontSize="sm">Admin</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}>
							<MenuItem onClick={handleClick}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
