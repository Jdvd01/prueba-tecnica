import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Users, Orders } from "./views";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/users" element={<Users />} />
			<Route path="/orders" element={<Orders />} />
		</Routes>
	</BrowserRouter>
);
