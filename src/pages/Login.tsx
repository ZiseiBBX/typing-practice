import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer";
import { supabase } from "../services/supabase";
import { errorToast } from "../utils/toast";

function Login() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const toast = useToast()

	const handleSubmit = async () => {
		if (data.email === "" || data.password === "") {
			toast(errorToast("All fields are required"))
			return;
		}

		const { error } = await supabase.auth.signIn({ email: data.email, password: data.password });

		if (error) toast(errorToast(error.message));
		else navigate("/");
	};

	return (
		<PageContainer>
			<Stack w={["95%", "80%"]} textAlign="center" spacing="4" mx="auto">
				<Text fontSize="1.5rem" fontWeight="600">
					Login
				</Text>
				<Input value={data.email} placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
				<Input
					type="password"
					value={data.password}
					placeholder="Password"
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<Button onClick={handleSubmit}>Login</Button>
			</Stack>
		</PageContainer>
	);
}

export default Login;
