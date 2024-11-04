import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const pokeSchema = z.object({
	results: z.array(
		z.object({
			name: z.string(),
			url: z.string().url(),
		}),
	),
});

export const Route = createFileRoute("/")({
	loader: async ({ context: { cache } }) => {
		const pokemons = await Promise.all(
			Array.from({ length: 3 }, async () => {
				const randomNumber = Math.floor(Math.random() * 1300) + 1;
				const response = pokeSchema.parse(
					await (
						await fetch(
							`https://pokeapi.co/api/v2/pokemon?offset=${randomNumber}&limit=1`,
						)
					).json(),
				);
				return response.results[0];
			}),
		);
		return pokemons;
	},
	component,
});

function component() {
	const pokemons = Route.useLoaderData();
	return (
		<>
			<h1>Catch your Pokemon</h1>
			<div className="flex justify-around w-full">
				{pokemons.map((pokemon) => (
					<Link
						to="/"
						key={pokemon.name}
						className="h-20 w-20 bg-gradient-to-b from-red-500 from-50% via-cyan-900 border-4 border-black to-stone-100 to-50% rounded-full flex justify-center items-center relative"
					>
						<div className="h-1 w-full bg-black" />
						<div className="h-4 w-4 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black" />
					</Link>
				))}
			</div>
		</>
	);
}
