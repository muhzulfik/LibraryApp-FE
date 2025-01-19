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
	Select,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { showAlert } from "../../molecules/SweetAlert";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useTriggerInventory } from "../../../store/inventoryBuku";

const ModalAddData = ({ isOpen, onClose }) => {
	const { register, handleSubmit, control, reset } = useForm();
	const [dataBuku, setDataBuku] = useState();

	const { trigger, setTrigger } = useTriggerInventory((state) => state);

	useEffect(() => {
		axiosInstance.get("/MasterBuku").then((res) => {
			setDataBuku(res.data?.data);
		});
	}, [isOpen]);

	const onSubmit = (data) => {
		axiosInstance.post("/InventoryBuku", data).then(() => {
			showAlert("Succes saved", "", "success");
			setTrigger(!trigger);
			reset();
			onClose();
		});
	};

	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	return (
		<>
			<Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Tambah - Inventory Buku</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl mb={4}>
								<FormLabel>Judul Buku</FormLabel>
								<Controller
									name="idbuku"
									control={control}
									render={({ field }) => (
										<Select {...field} placeholder="Select option">
											{dataBuku?.map((val) => (
												<option key={val.idbuku} value={val.idbuku}>
													{val.judul}
												</option>
											))}
										</Select>
									)}
								/>
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Lokasi Rak</FormLabel>
								<Input type="text" {...register("lokasirak")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Jumlah Stok</FormLabel>
								<Input type="text" {...register("jumlahstok")} />
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
