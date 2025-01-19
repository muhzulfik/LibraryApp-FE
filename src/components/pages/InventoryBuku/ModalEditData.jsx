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
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { useTriggerInventory } from "../../../store/inventoryBuku";

const ModalEditData = ({ isOpen, onClose, dataDetail }) => {
	const { register, handleSubmit, control, setValue, reset } = useForm();
	const [dataBuku, setDataBuku] = useState();

	const { trigger, setTrigger } = useTriggerInventory((state) => state);

	useEffect(() => {
		axiosInstance.get("/MasterBuku").then((res) => {
			setDataBuku(res.data?.data);
		});
		setValue("idbuku", dataDetail?.idbuku);
		setValue("lokasirak", dataDetail?.lokasirak);
		setValue("jumlahstok", dataDetail?.jumlahstok);
	}, [isOpen]);

	const onSubmit = (data) => {
		axiosInstance.put(`/InventoryBuku/${dataDetail.idstok}`, data).then(() => {
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
					<ModalHeader>Edit - Inventory Buku</ModalHeader>
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

export default ModalEditData;
