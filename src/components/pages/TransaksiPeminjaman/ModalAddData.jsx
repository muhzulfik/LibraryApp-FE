import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { showAlert } from "../../molecules/SweetAlert";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import { useTriggerTransaksi } from "../../../store/transaksiPeminjaman";

const ModalAddData = ({ isOpen, onClose }) => {
	const { register, handleSubmit, control, reset } = useForm();
	const [dataBuku, setDataBuku] = useState();
	const [dataMahasiswa, setDataMahasiswa] = useState();
	const [validateStatus, setValidateStatus] = useState();
	const [validateDate, setValidateDate] = useState();
	const [validateBuku, setValidateBuku] = useState();

	const { trigger, setTrigger } = useTriggerTransaksi((state) => state);

	useEffect(() => {
		axiosInstance.get("/InventoryBuku").then((res) => {
			setDataBuku(res.data?.data);
		});
		axiosInstance.get("/MasterMahasiswa").then((res) => {
			setDataMahasiswa(res.data?.data);
		});
	}, [isOpen]);

	const onSubmit = (data) => {
		console.log("ini merupakan data", data);
		const tanggalPinjam = new Date(data.tanggalpinjam);
		const tanggalKembali = new Date(data.tanggalkembali);
		const diffTime = Math.abs(tanggalKembali - tanggalPinjam);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		const checkStock = data.idbuku?.find((val) => val.value.stok <= 0);

		if (data.nim?.status == "Nonaktif") {
			setValidateStatus("Mahasiswa harus aktif");
		} else if (diffDays > 14) {
			setValidateDate("Batas peminjaman buku maksimal 14 hari");
		} else if (checkStock) {
			setValidateBuku("Stok Buku Kosong");
		} else {
			let dataIdBuku = data.idbuku?.map((val) => val.value.idbuku);
			axiosInstance
				.post("/TransaksiPeminjaman", {
					nim: data.nim?.nim,
					tanggalpinjam: data.tanggalpinjam,
					tanggalkembali: data.tanggalkembali,
					status: "Dipinjam",
					idbuku: dataIdBuku,
				})
				.then(() => {
					showAlert("Succes saved", "", "success");
					setTrigger(!trigger);
					reset();
					onClose();
					setValidateDate("");
					setValidateStatus("");
					setValidateBuku("");
				});
		}
	};

	useEffect(() => {
		if (!isOpen) {
			reset();
			setValidateDate("");
			setValidateStatus("");
			setValidateBuku("");
		}
	}, [isOpen, reset]);

	console.log(validateStatus);
	console.log(validateDate);

	return (
		<>
			<Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Tambah - Transaksi</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl mb={4}>
								<FormLabel>NIM</FormLabel>
								<Controller
									name="nim"
									control={control}
									render={({ field }) => (
										<Select
											options={dataMahasiswa.map((val) => ({
												label: `${val.nim} - ${val.status}`,
												value: { nim: val.nim, status: val.status },
											}))}
											onChange={(val) => {
												field.onChange(val.value);
												setValidateStatus("");
											}}
										/>
									)}
								/>
								<Text mt={2} color={"red"}>
									{validateStatus}
								</Text>
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Tanggal Pinjam</FormLabel>
								<Input type="date" {...register("tanggalpinjam")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Tanggal Kembali</FormLabel>
								<Input type="date" {...register("tanggalkembali")} />
								<Text mt={2} color={"red"}>
									{validateDate}
								</Text>
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Judul Buku - Stok</FormLabel>
								<Controller
									name="idbuku"
									control={control}
									render={({ field }) => (
										<Select
											isMulti={true}
											options={dataBuku.map((val) => ({
												label: `${val.judulBuku} - ${val.jumlahstok}`,
												value: { idbuku: val.idbuku, stok: val.jumlahstok },
											}))}
											onChange={(val) => {
												field.onChange(val);
												setValidateBuku("");
											}}
										/>
									)}
								/>
								<Text mt={2} color={"red"}>
									{validateBuku}
								</Text>
							</FormControl>
							<Box py={4}>
								<Button
									type="button"
									colorScheme="red"
									mr={3}
									onClick={onClose}>
									Close
								</Button>
								<Button variant="blue" type="submit">
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalAddData;
