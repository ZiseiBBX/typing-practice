import {
	Box,
	Button,
	Divider,
	Text,
	Grid,
	useColorMode,
} from "@chakra-ui/react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";

function Home() {
	const statistics = useStore((state) => state.statistics);
	const session = useStore((state) => state.session);
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	return (
		<PageContainer textAlign="center">
			<Text fontWeight="700" fontSize="1.5rem" mb="4">
				Leaderboard
			</Text>
			<Box border="1px" rounded="md" p="2">
				<Grid templateColumns="repeat(4, 1fr)">
					<Box>
						<Text fontWeight="700">Rank</Text>
					</Box>
					<Box>
						<Text fontWeight="700">Username</Text>
					</Box>
					<Box>
						<Text fontWeight="700">WPM</Text>
					</Box>
					<Box>
						<Text fontWeight="700">Accuracy</Text>
					</Box>
				</Grid>
				<Divider mt="2" mb="2" />
				{statistics.length == 0 && (
					<Box m="10">
						<Text fontSize="1.2rem" fontWeight="600">
							No data
						</Text>
					</Box>
				)}
				{statistics.length > 0 &&
					statistics.map((stat, index) => {
						return (
							<Grid templateColumns="repeat(4, 1fr)" key={stat.id}>
								<Box>
									<Text fontWeight={colorMode === "light" ? "600" : "500"}>{index + 1}</Text>
								</Box>
								<Box>
									<Text fontWeight={colorMode === "light" ? "600" : "500"}>{stat.username}</Text>
								</Box>
								<Box>
									<Text fontWeight={colorMode === "light" ? "600" : "500"}>{stat.grossWPM.toFixed(2)}</Text>
								</Box>
								<Box>
									<Text fontWeight={colorMode === "light" ? "600" : "500"}>{stat.accuracy.toFixed(2)}</Text>
								</Box>
							</Grid>
						);
					})}
			</Box>
			{statistics.filter((stat) => stat.uuid === session?.user?.id).length === 0 && (
				<Text fontSize="1.2rem" fontWeight="600" my="4">
					What are you waiting for? You could be up there!
				</Text>
			)}
			<Button
				my="4"
				onClick={() => {
					navigate("/practice");
				}}
			>
				Practice now!
			</Button>
		</PageContainer>
	);
}

export default Home;
