import { Box, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom"

interface INavItem {
	title: string;
	path: string;
	onClick?(): void;
}

function NavItem({ title, path, onClick }: INavItem) {
	const location = useLocation()

	return (
		<Box cursor="pointer" onClick={onClick}>
			<Text fontWeight={location.pathname === path ? "700" : "500"}>{title}</Text>
		</Box>
	);
}

export default NavItem;
