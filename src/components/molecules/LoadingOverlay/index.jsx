// LoadingModal.jsx
import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Image,
} from "@chakra-ui/react";

const LoadingOverlay = ({ isOpen, onClose, image }) => {
	return (
		<Modal isCentered size="xs" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay backdropFilter="blur(4px)" />
			<ModalContent bg="transparent" shadow="none">
				<ModalBody textAlign="center">
					<Image src={image} alt="logo login" rounded="6px" />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default LoadingOverlay;
