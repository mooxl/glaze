import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppRouter } from "@trpc-router";
import {
	createTRPCQueryUtils,
	createTRPCReact,
	httpBatchLink,
} from "@trpc/react-query";
import { StrictMode } from "react";

export const trpc = createTRPCReact<AppRouter>({});

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:8000/trpc",
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const cache = createTRPCQueryUtils({
	queryClient,
	client: trpcClient,
});

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
			<RouterProvider router={router} />
		</QueryClientProvider>
	</trpc.Provider>,
);

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
