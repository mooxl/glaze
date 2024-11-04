import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "@trpc-router";
import {
	createTRPCQueryUtils,
	createTRPCReact,
	httpBatchLink,
} from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: `${import.meta.env.CLIENT_SERVER_URL}/trpc`,
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
