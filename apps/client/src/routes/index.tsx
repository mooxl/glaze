import { trpc } from "@/main";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: async ({ context: { cache } }) => {
		await cache.hello.ensureData();
	},
	component: () => {
		const { data: hello } = trpc.hello.useQuery();
		return (
			<div className="p-2">
				<h3>{hello}</h3>
			</div>
		);
	},
});
