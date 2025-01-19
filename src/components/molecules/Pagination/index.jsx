import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";

export const Pagination = ({
	itemsPerPage,
	totalItems,
	currentPage,
	paginate,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	let displayPageNumbers = pageNumbers;

	if (pageNumbers.length > 4) {
		if (currentPage <= 3) {
			displayPageNumbers = pageNumbers.slice(0, 3);
		} else if (currentPage >= pageNumbers.length - 2) {
			displayPageNumbers = pageNumbers.slice(-4);
		} else {
			displayPageNumbers = pageNumbers.slice(currentPage - 1, currentPage + 2);
		}
	}

	return (
		<Box>
			<Flex>
				<Button
					onClick={() => paginate(currentPage - 1)}
					backgroundColor={"#D8D8D8"}
					color={"main"}
					mr={2}
					isDisabled={currentPage > 1 ? false : true}>
					<ChevronLeftIcon w={5} h={5} />
				</Button>

				{displayPageNumbers.map((number) => (
					<Button
						key={number}
						onClick={() => paginate(number)}
						backgroundColor={currentPage === number ? "main" : "#D8D8D8"}
						color={currentPage === number ? "white" : "main"}
						mx={2}>
						{number}
					</Button>
				))}

				{currentPage < pageNumbers.length &&
					currentPage < pageNumbers.length - 2 && (
						<>
							<Text mx={2}>...</Text>
							<Button
								key={pageNumbers.length}
								onClick={() => paginate(pageNumbers.length)}
								backgroundColor={
									currentPage === pageNumbers.length ? "main" : "#D8D8D8"
								}
								color={currentPage === pageNumbers.length ? "white" : "main"}
								mx={2}>
								{pageNumbers.length}
							</Button>
						</>
					)}

				<Button
					onClick={() => paginate(currentPage + 1)}
					backgroundColor={"#D8D8D8"}
					color={"main"}
					ml={2}
					isDisabled={currentPage < pageNumbers.length ? false : true}>
					<ChevronRightIcon w={5} h={5} />
				</Button>
			</Flex>
		</Box>
	);
};
