import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const handleClick = () => setShow(!show);

	const handleSubmit = () => {
		navigate("/master-buku");
	};

	return (
		<Flex>
			<Box
				width="60%"
				height="100vh"
				backgroundImage={`linear-gradient(65deg, #064B82, #02298A, #021B79)`}
				backgroundSize="cover"
				backgroundPosition="center"
				position="relative"
				display={{ sm: "none", md: "block" }}>
				<Flex
					position="absolute"
					top="50%"
					left="30%"
					transform="translate(-50%, -50%)"
					align="center"
					justify="center"
					height="100%"
					width="100%">
					<Box color="white">
						<Text fontSize="28px">Welcome!</Text>
						<Text fontSize="24px">Library System</Text>
					</Box>
				</Flex>
			</Box>
			<Flex
				width={{ sm: "100%", md: "40%" }}
				height="100vh"
				align="center"
				justify="center">
				<Stack spacing="6">
					<Stack spacing="8">
						<Text
							fontFamily={"poppins"}
							fontSize={"24px"}
							fontWeight={"bold"}
							align={"center"}>
							Log in to your account
						</Text>
						<FormControl>
							<FormLabel htmlFor="email">Username</FormLabel>
							<Input
								id="email"
								type="text"
								rounded={"xl"}
								size={"lg"}
								placeholder="Username"
								_placeholder={{ fontSize: "14px" }}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="email">Password</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={show ? "text" : "password"}
									placeholder="Enter Password"
									rounded={"xl"}
									size={"lg"}
									_placeholder={{ fontSize: "14px" }}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<InputRightElement width="4.5rem" mt={1}>
									<Button
										h="2rem"
										size="md"
										onClick={handleClick}
										variant={"transparent"}>
										{show ? <ViewOffIcon /> : <ViewIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Button
							variant={"blue"}
							rounded={"full"}
							onClick={() => handleSubmit()}>
							Login
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
