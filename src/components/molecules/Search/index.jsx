import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const Search = ({ value, onChange, placeholder }) => {
	return (
		<InputGroup>
			<Input
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				borderColor={"main"}
				color={"main"}
				_placeholder={{ color: "main" }}
			/>
			<InputRightElement>
				<SearchIcon color="main" />
			</InputRightElement>
		</InputGroup>
	);
};

export default Search;
