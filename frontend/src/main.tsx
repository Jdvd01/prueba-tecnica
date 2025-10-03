import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Dashboard, Detail } from "./views";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<Toaster richColors position="top-center" />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/user/:id" element={<Detail />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
