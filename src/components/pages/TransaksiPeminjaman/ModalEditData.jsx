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
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { showAlert } from "../../molecules/SweetAlert";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { addOneDay } from "../../../utils/formatAddOneDay";
import { useTriggerTransaksi } from "../../../store/transaksiPeminjaman";

const ModalEditData = ({ isOpen, onClose, dataDetail }) => {
	const { register, handleSubmit, control, setValue, watch } = useForm();
	const [dataBuku, setDataBuku] = useState();
	const [dataMahasiswa, setDataMahasiswa] = useState();

	const { trigger, setTrigger } = useTriggerTransaksi((state) => state);

	useEffect(() => {
		axiosInstance.get("/MasterBuku").then((res) => {
			setDataBuku(res.data?.data);
		});
		axiosInstance.get("/MasterMahasiswa").then((res) => {
			setDataMahasiswa(res.data?.data);
		});
		if (dataDetail?.tanggalpinjam) {
			setValue(
				"tanggalpinjam",
				new Date(dataDetail.tanggalpinjam).toISOString().split("T")[0]
			);
		}

		if (dataDetail?.tanggalkembali) {
			setValue(
				"tanggalkembali",
				new Date(dataDetail.tanggalkembali).toISOString().split("T")[0]
			);
		}

		setValue("status", dataDetail?.status);
	}, [isOpen]);

	const onSubmit = (data) => {
		let dataIdBuku = data.idbuku?.map((val) => val.value);

		axiosInstance
			.put(`/TransaksiPeminjaman/${dataDetail.idtransaksi}`, {
				nim: data.nim ? data.nim : dataDetail?.nim,
				tanggalpinjam: addOneDay(data.tanggalpinjam),
				tanggalkembali: addOneDay(data.tanggalkembali),
				status: data.status ? data.status : dataDetail?.status,
				idbuku: dataIdBuku ? dataIdBuku : dataDetail?.idbuku,
			})
			.then(() => {
				showAlert("Succes saved", "", "success");
				setTrigger(!trigger);
				onClose();
			});
	};

	return (
		<>
			<Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit - Transaksi</ModalHeader>
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
												label: val.nim,
												value: val.label,
											}))}
											onChange={(val) => field.onChange(val.value)}
											defaultValue={{
												label: dataDetail?.nim,
												value: dataDetail?.nim,
											}}
										/>
									)}
								/>
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Tanggal Pinjam</FormLabel>
								<Input type="date" {...register("tanggalpinjam")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Tanggal Kembali</FormLabel>
								<Input type="date" {...register("tanggalkembali")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Status</FormLabel>
								<Controller
									name="status"
									control={control}
									render={({ field }) => (
										<Select
											options={[
												{
													label: "Dipinjam",
													value: "Dipinjam",
												},
												{
													label: "Dikembalikan",
													value: `Dikembalikan,  ${
														new Date().toISOString().split("T")[0]
													}`,
												},
											]}
											onChange={(val) => field.onChange(val.value)}
											defaultValue={{
												label: dataDetail?.status.split(",")[0],
												value: dataDetail?.status,
											}}
										/>
									)}
								/>
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Judul Buku</FormLabel>
								<Controller
									name="idbuku"
									control={control}
									render={({ field }) => (
										<Select
											isMulti={true}
											options={dataBuku.map((val) => ({
												label: val.judul,
												value: val.idbuku,
											}))}
											onChange={(val) => field.onChange(val)}
											defaultValue={dataBuku
												.filter((val) => dataDetail.idbuku.includes(val.idbuku))
												.map((val) => ({
													label: val.judul,
													value: val.idbuku,
												}))}
										/>
									)}
								/>
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

export default ModalEditData;
