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
	Image,
	Center,
} from "@chakra-ui/react";
import loadingBoat from "../../../assets/img/loadingBoat.gif";
import { useEffect, useState } from "react";
import Container from "../../organism/Container";
import { Pagination } from "../../molecules/Pagination";
import Search from "../../molecules/Search";
import ShowEntries from "../../molecules/ShowEntries";
import axiosInstance from "../../../utils/axios";
import IconButtonDelete from "../../atoms/IconButtonDelete";
import noDataImg from "../../../assets/img/noDataImg.svg";
import { showAlert } from "../../molecules/SweetAlert";
import { useTriggerHistory } from "../../../store/historyPeminjaman";

let dataDummy = {
	totalCount: 0,
	data: [],
};

const HistoryPeminjamanPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [data, setData] = useState(dataDummy);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [search, setSearch] = useState("");

	const { trigger, setTrigger } = useTriggerHistory((state) => state);

	const handleDelete = (id) => {
		axiosInstance.delete(`/HistoryPeminjaman/${id}`).then((res) => {
			showAlert("Succes Deleted", "", "success");
			setTrigger(!trigger);
		});
	};

	useEffect(() => {
		onOpen();
		axiosInstance
			.get("/HistoryPeminjaman", {
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
					<Text textStyle={"title-big"}>History Peminjaman</Text>
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
							<Th color={"white"}>NAMA</Th>
							<Th color={"white"}>JUDUL BUKU</Th>
							<Th color={"white"}>TANGGAL PINJAM</Th>
							<Th color={"white"}>TANGGAL KEMBALI</Th>
							<Th color={"white"}>STATUS</Th>
							<Th color={"white"}>Action</Th>
						</Tr>
					</Thead>
					<Tbody borderWidth={2}>
						{data?.data?.length > 0 ? (
							<>
								{data?.data?.map((val) => (
									<Tr borderWidth={2} borderColor={"main"}>
										<Td>{val.nim}</Td>
										<Td>{val.namaMahasiswa}</Td>
										<Td>{val.judulBuku}</Td>
										<Td>
											{new Date(val.tanggalpinjam).toISOString().split("T")[0]}
										</Td>
										<Td>
											{new Date(val.tanggalkembali).toISOString().split("T")[0]}
										</Td>
										<Td>{val.status}</Td>
										<Td>
											<HStack spacing={2}>
												<IconButtonDelete
													onClick={() => handleDelete(val.idhistory)}
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
		</Container>
	);
};

export default HistoryPeminjamanPage;
