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
import { useForm } from "react-hook-form";
import { showAlert } from "../../molecules/SweetAlert";
import axiosInstance from "../../../utils/axios";
import { useEffect } from "react";
import { useTriggerMasterBuku } from "../../../store/masterBuku";

const ModalAddData = ({ isOpen, onClose }) => {
	const { register, handleSubmit, reset } = useForm();

	const { trigger, setTrigger } = useTriggerMasterBuku((state) => state);

	const onSubmit = (data) => {
		axiosInstance.post("/MasterBuku", data).then(() => {
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
					<ModalHeader>Tambah - Buku</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl mb={4}>
								<FormLabel>Judul Buku</FormLabel>
								<Input type="text" {...register("judul")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Pengarang</FormLabel>
								<Input type="text" {...register("pengarang")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Penerbit</FormLabel>
								<Input type="text" {...register("penerbit")} />
							</FormControl>
							<FormControl mb={4}>
								<FormLabel>Tahun Terbit</FormLabel>
								<Input type="text" {...register("tahunterbit")} />
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
