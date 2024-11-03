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
		origin: process.env.SERVER_CLIENT_URL!,
		credentials: true,
	}),
);

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

const port = process.env.CLIENT_SERVER_URL?.split(":").at(-1);
if (!port) throw new Error("Port not defined");
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port: Number.parseInt(port),
});
