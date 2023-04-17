import ReactDOM from "react-dom/client";
import "@/styles/common.less";
import "@/styles/reset.less";
import "@/styles/global.less";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);
