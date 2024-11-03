import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { appRouter } from "./trpc";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.use(logger());

app.use(
	"/trpc/*",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);

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
