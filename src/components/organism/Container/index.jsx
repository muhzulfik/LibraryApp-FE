/* eslint-disable react/prop-types */
import { Box, Stack } from "@chakra-ui/react";
import LoadingOverlay from "../../molecules/LoadingOverlay";

const Container = ({ isLoading, isOpen, onClose, loadingGif, children }) => (
	<>
		{isLoading ? (
			<LoadingOverlay isOpen={isOpen} onClose={onClose} image={loadingGif} />
		) : (
			<Stack px={6} py={4} spacing={8}>
				{children}
			</Stack>
		)}
	</>
);

export default Container;
