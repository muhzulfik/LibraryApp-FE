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
import { useTriggerMasterMahasiswa } from "../../../store/masterMahasiswa";

let dataDummy = {
	totalCount: 0,
	data: [],
};

const MasterMahasiswaPage = () => {
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

	const { trigger, setTrigger } = useTriggerMasterMahasiswa((state) => state);

	const handleEdit = (id) => {
		axiosInstance.get(`/MasterMahasiswa/${id}`).then((res) => {
			setDataDetail(res.data);
			onOpenEdit();
		});
	};

	const handleDelete = (id) => {
		axiosInstance.delete(`/MasterMahasiswa/${id}`).then((res) => {
			showAlert("Succes Deleted", "", "success");
			setTrigger(!trigger);
		});
	};

	useEffect(() => {
		onOpen();
		axiosInstance
			.get("/MasterMahasiswa", {
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
					<Text textStyle={"title-big"}>Master Mahasiswa</Text>
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
							<Th color={"white"}>NIM</Th>
							<Th color={"white"}>Nama</Th>
							<Th color={"white"}>Fakultas</Th>
							<Th color={"white"}>Jurusan</Th>
							<Th color={"white"}>Status</Th>
							<Th color={"white"}>Action</Th>
						</Tr>
					</Thead>
					<Tbody borderWidth={2}>
						{data?.data?.length > 0 ? (
							<>
								{data?.data?.map((val) => (
									<Tr borderWidth={2} borderColor={"main"}>
										<Td>{val.nim}</Td>
										<Td>{val.nama}</Td>
										<Td>{val.fakultas}</Td>
										<Td>{val.jurusan}</Td>
										<Td>{val.status}</Td>
										<Td>
											<HStack spacing={2}>
												<IconButtonEdit onClick={() => handleEdit(val.nim)} />
												<IconButtonDelete
													onClick={() => handleDelete(val.nim)}
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

export default MasterMahasiswaPage;
