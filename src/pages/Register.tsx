import { Button, Container, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../services/supabase";
import { errorToast } from "../utils/toast";
import { useNavigate } from "react-router";
import { MotionFlex } from "../components/MotionComponents";
import { pageTransitionVariant } from "../utils/animations";
import PageContainer from "../components/PageContainer";

function Register() {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async () => {
		if (data.username === "" || data.email === "" || data.password === "") {
			toast(errorToast("All fields are required"));
			return;
		} else if (data.password !== data.confirmPassword) {
			toast(errorToast("Passwords do not match"));
			return;
		}

		const { error } = await supabase.auth.signUp(
			{ email: data.email, password: data.password },
			{ data: { username: data.username } }
		);

		if (error) toast(errorToast(error.message));
		else navigate("/");
	};

	return (
		<PageContainer>
			<Stack w={["95%", "80%"]} justify="center" mx="auto" spacing="4" textAlign="center">
				<Text fontSize="1.5rem" fontWeight="600">
					Register
				</Text>
				<Input
					value={data.username}
					placeholder="Username"
					onChange={(e) => setData({ ...data, username: e.target.value })}
				/>
				<Input value={data.email} placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
				<Input
					type="password"
					value={data.password}
					placeholder="Password"
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<Input
					type="password"
					value={data.confirmPassword}
					placeholder="Confirm Password"
					onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
				/>
				<Button mt="4" onClick={handleSubmit}>
					Register
				</Button>
			</Stack>
		</PageContainer>
	);
}

export default Register;
