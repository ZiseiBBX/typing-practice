import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<CSSReset />
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
