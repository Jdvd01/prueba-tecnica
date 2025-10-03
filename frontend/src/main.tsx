import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Dashboard, Orders } from "./views";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/orders" element={<Orders />} />
		</Routes>
	</BrowserRouter>
);
