import {
	Box,
	Divider,
	Flex,
	HStack,
	Spacer,
	Text,
	useDisclosure,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Button,
	Image,
	Center,
} from "@chakra-ui/react";
import loadingBoat from "../../../assets/img/loadingBoat.gif";
import { useEffect, useState } from "react";
import Container from "../../organism/Container";
import { Pagination } from "../../molecules/Pagination";
import ModalAddData from "./ModalAddData";
import Search from "../../molecules/Search";
import ShowEntries from "../../molecules/ShowEntries";
import axiosInstance from "../../../utils/axios";
import IconButtonEdit from "../../atoms/IconButtonEdit";
import IconButtonDelete from "../../atoms/IconButtonDelete";
import ModalEditData from "./ModalEditData";
import noDataImg from "../../../assets/img/noDataImg.svg";
import { showAlert } from "../../molecules/SweetAlert";
import { useTriggerInventory } from "../../../store/inventoryBuku";

let dataDummy = {
	totalCount: 0,
	data: [],
};

const InventoryBukuPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onClose: onCloseAdd,
	} = useDisclosure();
	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onClose: onCloseEdit,
	} = useDisclosure();
	const [data, setData] = useState(dataDummy);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [dataDetail, setDataDetail] = useState();

	const { trigger, setTrigger } = useTriggerInventory((state) => state);

	const handleEdit = (id) => {
		axiosInstance.get(`/InventoryBuku/${id}`).then((res) => {
			setDataDetail(res.data);
			onOpenEdit();
		});
	};

	const handleDelete = (id) => {
		axiosInstance.delete(`/InventoryBuku/${id}`).then((res) => {
			showAlert("Succes Deleted", "", "success");
			setTrigger(!trigger);
		});
	};

	useEffect(() => {
		onOpen();
		axiosInstance
			.get("/InventoryBuku", {
				params: {
					PageSize: itemsPerPage,
					PageNumber: currentPage,
					SearchAll: search,
				},
			})
			.then((res) => {
				setData(res.data);
				setIsLoading(false);
			});
	}, [itemsPerPage, currentPage, search, trigger]);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<Container
			isLoading={isLoading}
			isOpen={isOpen}
			onClose={onClose}
			loadingGif={loadingBoat}>
			<Flex align={"center"}>
				<Box>
					<Text textStyle={"title-big"}>Inventory Buku</Text>
				</Box>
				<Spacer />
				<Box>
					<Button
						variant={"blue"}
						textStyle={"text-medium-white"}
						onClick={() => onOpenAdd()}>
						Add New
					</Button>
				</Box>
			</Flex>
			<Divider size={"md"} borderColor={"main"} />
			<Flex align={"center"}>
				<ShowEntries
					value={itemsPerPage}
					onChange={(e) => setItemsPerPage(e.target.value)}
				/>
				<Spacer />
				<Box>
					<Search
						placeholder={"Search"}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Box>
			</Flex>
			<TableContainer>
				<Table variant="simple" borderWidth={2} borderColor={"main"}>
					<Thead borderWidth={2} background={"main"} borderColor={"main"}>
						<Tr>
							<Th color={"white"}>Judul Buku</Th>
							<Th color={"white"}>Lokasi Rak</Th>
							<Th color={"white"}>Jumlah Stok</Th>
							<Th color={"white"}>Action</Th>
						</Tr>
					</Thead>
					<Tbody borderWidth={2}>
						{data?.data?.length > 0 ? (
							<>
								{data?.data?.map((val) => (
									<Tr borderWidth={2} borderColor={"main"}>
										<Td>{val.judulBuku}</Td>
										<Td>{val.lokasirak}</Td>
										<Td>{val.jumlahstok}</Td>
										<Td>
											<HStack spacing={2}>
												<IconButtonEdit
													onClick={() => handleEdit(val.idstok)}
												/>
												<IconButtonDelete
													onClick={() => handleDelete(val.idstok)}
												/>
											</HStack>
										</Td>
									</Tr>
								))}
							</>
						) : (
							<Tr>
								<Td colSpan={5}>
									<Center>
										<Image
											src={noDataImg}
											alt="logo login"
											rounded="6px"
											w={180}
											h={180}
										/>
									</Center>
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</TableContainer>
			<Flex justifyContent="flex-end">
				<Pagination
					itemsPerPage={itemsPerPage}
					totalItems={data?.totalCount}
					currentPage={currentPage}
					paginate={paginate}
				/>
			</Flex>
			<ModalAddData isOpen={isOpenAdd} onClose={onCloseAdd} />
			<ModalEditData
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				dataDetail={dataDetail}
			/>
		</Container>
	);
};

export default InventoryBukuPage;
