import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Practice from "./pages/Practice"
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./services/supabase";
import useStore from "./store/store";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import { AnimatePresence } from "framer-motion";

function App() {
	const setSession = useStore((state) => state.setSession);
	const mySession = useStore(state => state.session)
	const fetchStatistics = useStore(state => state.fetchStatistics)
	const fetchMyStatistics = useStore(state => state.fetchMyStatistics)

	const location = useLocation()

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		fetchStatistics()
		if (mySession?.user) {
			fetchMyStatistics()
		}
	}, [mySession])

	return (
		<Flex direction="column" height="100vh" style={{ overflowY: "hidden" }}>
			<Navbar />
			<Box mt={16} flex="1">
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/result" element={<Result />} />
						<Route path="/practice" element={<Practice/>} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Login />} />
					</Routes>
				</AnimatePresence>
			</Box>
		</Flex>
	);
}

export default App;
