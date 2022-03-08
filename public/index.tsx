import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App";
const Index = () => (
	<React.Fragment>
		<App />
	</React.Fragment>
);
ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById("mountNode")
);
