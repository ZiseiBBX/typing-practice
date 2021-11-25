import { Box } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import { MotionBox } from "../MotionComponents";

interface IBurgerToggle {
	open: boolean;
	toggleNav(): void;
}

const duration = 0.3;

function BurgerToggle({ open, toggleNav }: IBurgerToggle) {
	const topBarVariant: Variants = {
		open: {
			rotate: -45,
			transition: {
				duration: duration,
			},
		},
		close: {
			rotate: 0,
			y: -8,
			transition: {
				duration: duration,
			},
		},
	};

	const middleBarVariant: Variants = {
		open: {
			opacity: 0,
			transition: {
				duration: duration / 2,
			},
		},
		close: {
			opacity: 1,
			transition: {
				duration: duration / 2,
			},
		},
	};

	const bottomBarVariant: Variants = {
		open: {
			rotate: 45,
			transition: {
				duration: duration,
			},
		},
		close: {
			rotate: 0,
			y: 8,
			transition: {
				duration: duration,
			},
		},
	};

	return (
		<Box display={{ base: "block", md: "none" }} position="relative" onClick={toggleNav}>
			<MotionBox
				w="6"
				h="0.5"
				position="absolute"
				bg="white"
				variants={topBarVariant}
				animate={open ? "open" : "close"}
			></MotionBox>
			<MotionBox
				w="6"
				h="0.5"
				position="absolute"
				bg="white"
				transform="auto"
				variants={middleBarVariant}
				animate={open ? "open" : "close"}
			></MotionBox>
			<MotionBox
				w="6"
				h="0.5"
				position="absolute"
				bg="white"
				transform="auto"
				translateY="2"
				variants={bottomBarVariant}
				animate={open ? "open" : "close"}
			></MotionBox>
		</Box>
	);
}

export default BurgerToggle;
