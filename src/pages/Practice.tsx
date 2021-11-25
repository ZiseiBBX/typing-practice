import {
	Box,
	Button,
	Container,
	Flex,
	Stack,
	useColorModeValue,
	Text,
	CircularProgress,
	CircularProgressLabel,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import useStore from "../store/store";
import { MotionFlex, MotionText } from "../components/MotionComponents";
import useKeyPress from "../hooks/useKeyPress";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageContainer from "../components/PageContainer";

function Practice() {
	const active = useStore((state) => state.active);
	const over = useStore((state) => state.over);
	const setOver = useStore((state) => state.setOver);
	const entries = useStore((state) => state.entries);
	const letterIndex = useStore((state) => state.letterIndex);
	const wordIndex = useStore((state) => state.wordIndex);
	const formattedTime = useStore((state) => state.formattedTime);
	const elapsedTime = useStore((state) => state.elapsedTime);
	const grossWPM = useStore((state) => state.grossWPM);

	const initializePractice = useStore((state) => state.initializePractice);
	const updateEntry = useStore((state) => state.updateEntry);
	const getColorVal = useStore((state) => state.getColorVal);
	const backtrack = useStore((state) => state.backtrack);

	const startPractice = useStore((state) => state.startPractice);

	const navigate = useNavigate();

	const bgModeColor = useColorModeValue("#1A202C", "white");
	const textModeColor = useColorModeValue("white", "#1A202C");
	const notVisitedColor = useColorModeValue("white", "#1A202C");
	const progressColor = useColorModeValue("#1A202C", "white");

	const keyPressed = useKeyPress();

	useEffect(() => {
		initializePractice(150);
	}, []);

	useEffect(() => {
		if (over) {
			navigate("/result");
			setOver(false);
		}
	}, [over]);

	useEffect(() => {
		if (keyPressed && active) {
			if (keyPressed.length === 1) {
				updateEntry(keyPressed);
			}
			if (keyPressed === "Backspace") backtrack();
		} else if (keyPressed) {
			if (keyPressed === "Enter") startPractice();
		}
	}, [keyPressed]);

	const letterBackgroundColor = (index: number) => {
		const correct = getColorVal(index)[0];
		const visited = getColorVal(index)[1];

		if (letterIndex === index) return bgModeColor;

		if (!visited) return notVisitedColor;
		if (visited && correct) return "green";
		if (visited && !correct) return "red";
	};

	return (
		<PageContainer>
			<Stack textAlign="center">
				{!active && (
					<Text fontSize="1.5rem" fontWeight="600" mb="4">
						You have one minute
					</Text>
				)}
				{active && (
					<Box>
						<CircularProgress value={100 - (elapsedTime / 1000) * 1.667} color="#1A202C" size="150px" thickness="8px">
							<CircularProgressLabel>
								<Text fontSize="2rem" fontWeight="700">
									{formattedTime}
								</Text>
							</CircularProgressLabel>
						</CircularProgress>
					</Box>
				)}
				<MotionFlex direction="row" alignItems="center" justify="center" textAlign="center">
					<AnimatePresence>
						{active &&
							entries[wordIndex] &&
							entries[wordIndex].word.split("").map((letter, index) => {
								return (
									<MotionText
										animate={{ opacity: 1 }}
										letterSpacing="2px"
										transition={{ type: "linear" }}
										exit={{ opacity: 0, x: 100 }}
										fontSize="2rem"
										fontWeight="600"
										key={`${index}`}
										color={letterIndex === index ? textModeColor : bgModeColor}
										bg={letterBackgroundColor(index)}
									>
										{letter}
									</MotionText>
								);
							})}
					</AnimatePresence>
				</MotionFlex>
				{/* {grossWPM} */}
				{!active && (
					<Button
						mt="4"
						_focus={{ boxshadow: "none" }}
						onClick={() => {
							startPractice();
						}}
					>
						Start Practice
					</Button>
				)}
			</Stack>
		</PageContainer>
	);
}

export default Practice;
