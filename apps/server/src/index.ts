import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { appRouter } from "./trpc";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

const port = 8000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
