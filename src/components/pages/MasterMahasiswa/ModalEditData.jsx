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
import { useEffect } from "react";
import axiosInstance from "../../../utils/axios";
import { useTriggerMasterMahasiswa } from "../../../store/masterMahasiswa";

const ModalEditData = ({ isOpen, onClose, dataDetail }) => {
	const { register, handleSubmit, control, setValue, reset } = useForm();

	const { trigger, setTrigger } = useTriggerMasterMahasiswa((state) => state);

	useEffect(() => {
		setValue("nim", dataDetail?.nim);
		setValue("nama", dataDetail?.nama);
		setValue("fakultas", dataDetail?.fakultas);
		setValue("jurusan", dataDetail?.jurusan);
		setValue("status", dataDetail?.status);
	}, [isOpen]);

	const onSubmit = (data) => {
		axiosInstance.put(`/MasterMahasiswa/${dataDetail.nim}`, data).then(() => {
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
					<ModalHeader>Edit - Mahasiswa</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl mb={4}>
								<FormLabel>NIM</FormLabel>
								<Input type="text" {...register("nim")} isDisabled={true} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Nama</FormLabel>
								<Input type="text" {...register("nama")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Fakultas</FormLabel>
								<Input type="text" {...register("fakultas")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Jurusan</FormLabel>
								<Input type="text" {...register("jurusan")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Status</FormLabel>
								<Controller
									name="status"
									control={control}
									render={({ field }) => (
										<Select {...field} placeholder="Select option">
											<option value={"Aktif"}>Aktif</option>
											<option value={"Nonaktif"}>Nonaktif</option>
										</Select>
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
