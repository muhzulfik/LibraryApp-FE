import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const IconButtonDelete = ({ onClick }) => {
	return (
		<IconButton
			colorScheme="red"
			aria-label=""
			icon={<DeleteIcon />}
			onClick={onClick}
		/>
	);
};

export default IconButtonDelete;
