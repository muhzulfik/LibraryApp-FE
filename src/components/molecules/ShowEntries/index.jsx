import { HStack, Select, Text } from "@chakra-ui/react";

const ShowEntries = ({ value, onChange }) => {
	return (
		<HStack>
			<Text fontSize={"18px"}>Show</Text>
			<Select borderColor={"main"} value={value} onChange={onChange}>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
			</Select>
			<Text fontSize={"18px"}>Entries</Text>
		</HStack>
	);
};

export default ShowEntries;
