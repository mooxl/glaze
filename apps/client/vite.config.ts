import ImportMetaEnvPlugin from "@import-meta-env/unplugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		ImportMetaEnvPlugin.vite({ example: ".import-meta-env" }),
		TanStackRouterVite({}),
		react(),
		tsconfigPaths(),
	],
});
