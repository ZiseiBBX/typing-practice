import { Box, Flex, Text } from "@chakra-ui/layout";
import NavItem from "./NavItem";
import { useState } from "react";
import NavMenu from "./NavMenu";
import BurgerToggle from "./BurgerToggle";

function Navbar() {
	const [open, setOpen] = useState(false);

	const toggleNav = () => {
		setOpen(!open);
	};

	return (
		<Flex
			as="nav"
			position="fixed"
			wrap="wrap"
			justifyContent="space-between"
			alignItems="center"
			w="100%"
			px="10"
			py="4"
		>
			<Box>
				<Text fontWeight="600" fontSize="1.25rem">
					Typing Practice
				</Text>
			</Box>
			<BurgerToggle open={open} toggleNav={toggleNav} />
			<NavMenu open={open} />
		</Flex>
	);
}

export default Navbar;
