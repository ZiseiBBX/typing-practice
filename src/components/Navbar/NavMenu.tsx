import { Button } from "@chakra-ui/button";
import { useColorMode, useBreakpointValue } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import { MotionBox, MotionStack } from "../MotionComponents";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import useStore from "../../store/store";

interface INavMenuProps {
	open: boolean;
}

function NavMenu({ open }: INavMenuProps) {
	const { colorMode, toggleColorMode } = useColorMode();
	const displayBP = useBreakpointValue({ base: "none", md: "flex" });
	const opacityBP = useBreakpointValue({ base: 0, md: 1 });

	const navigate = useNavigate();
	const session = useStore(state => state.session)

	const variant: Variants = {
		open: {
			opacity: 1,
			height: "auto",
		},
		close: {
			opacity: opacityBP,
			display: displayBP,
		},
	};

	return (
		<MotionBox display={{ base: open ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
			<MotionStack
				justify={["center", "center", "flex-end", "flex-end"]}
				align="center"
				direction={["column", "column", "row", "row"]}
				spacing={["2", "2", "4", "8"]}
				variants={variant}
				animate={open ? "open" : "close"}
			>
				<NavItem title="Home" path="/" onClick={() => navigate("/")} />
				{!session?.user && <NavItem title="Login" path="/login" onClick={() => navigate("/login")} />}
				{!session?.user && <NavItem title="Register" path="/register" onClick={() => navigate("/register")} />}
				<Button variant="outline" onClick={() => navigate("/practice")}>
					Practice
				</Button>
				{session?.user && <NavItem title="Profile" path="/profile" onClick={() => navigate("/profile")} />}
				{session?.user && <NavItem title="Logout" path="/logout" onClick={() => supabase.auth.signOut()} />}
				<Button aria-label="toggle-mode" onClick={toggleColorMode}>
					{colorMode === "light" ? "Light" : "Dark"}
				</Button>
			</MotionStack>
		</MotionBox>
	);
}

export default NavMenu;
