import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const IconButtonEdit = ({ onClick }) => {
	return (
		<IconButton
			colorScheme="green"
			aria-label=""
			icon={<EditIcon />}
			onClick={onClick}
		/>
	);
};

export default IconButtonEdit;
