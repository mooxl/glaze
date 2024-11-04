import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { cache, queryClient, trpc, trpcClient } from "./lib/trpc";

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	context: {
		cache,
	},
});

const rootElement = document.getElementById("app");
if (!rootElement) {
	throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
	<trpc.Provider client={trpcClient} queryClient={queryClient}>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		</QueryClientProvider>
	</trpc.Provider>,
);

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
