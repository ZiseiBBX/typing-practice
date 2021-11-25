import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";
import Stat from "../components/Stat";
import { supabase } from "../services/supabase";
import useStore from "../store/store";
import { IStatisticsTable } from "../myTypes";

function Result() {
	const session = useStore((state) => state.session);
	const grossWPM = useStore((state) => state.grossWPM);
	const accuracy = useStore((state) => state.accuracy);
	const fetchStatistics = useStore((state) => state.fetchStatistics);
	const fetchMyStatistics = useStore((state) => state.fetchMyStatistics);
	const setOver = useStore((state) => state.setOver);

	const [show, setShow] = useState(false)

	const navigate = useNavigate();

	useEffect(() => {
		async function insertData() {
			const data: IStatisticsTable = {
				email: session?.user?.email,
				uuid: session?.user?.id,
				username: session?.user?.user_metadata?.username,
				grossWPM: grossWPM,
				accuracy: accuracy,
			};

			const { error } = await supabase.from("statistics").insert(data);

			if (!error) {
				fetchStatistics();
				fetchMyStatistics();
			}
		}

		if (grossWPM !== 0 && accuracy !== 100 && session?.user) {
			if (accuracy > 64) {
				insertData();
			} else {
				setShow(true)
			}
		}

		setOver(false)
	}, []);

	return (
		<Flex height="100%" justifyContent="center" alignItems="center">
			{!show && <Confetti run={true} />}
			<Container textAlign="center">
				{show && <Text mb="4" fontSize="1.2rem" fontWeight="600">Sorry but you do not qualify if your accuracy isn't greater than 65%</Text>}
				{show && <Text mb="4" fontSize="1.2rem" fontWeight="600">Your accuracy is {`${accuracy}`}</Text>}
				{show && <Text fontSize="1.2rem" fontWeight="600">Better luck next time</Text>}
				{!show && <Stack justify="center" textAlign="center" align="center">
					<Text fontSize="2rem" fontWeight="700" mb="4">
						RESULT
					</Text>
					<Stat title="WPM" value={grossWPM.toFixed(2)} />
					<Stat title="Accuracy" value={`${accuracy.toFixed(2)}%`} />
					{!session && (
						<Text fontSize="1rem" fontWeight="600">
							Create an account to keep track of your speedy fingers!
						</Text>
					)}
					<Text mt="10" cursor="pointer" onClick={() => navigate("/")}>
						Go Home
					</Text>
				</Stack>}
			</Container>
		</Flex>
	);
}

export default Result;
