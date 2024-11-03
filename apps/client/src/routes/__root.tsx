import type { cache } from "@/main";
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{ cache: typeof cache }>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{" "}
				<Link
					to="/about"
					activeProps={{
						className: "font-bold",
					}}
				>
					About
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
