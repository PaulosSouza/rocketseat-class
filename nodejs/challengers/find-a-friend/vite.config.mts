import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		dir: "__tests__",
		environmentMatchGlobs: [
			["__tests__/e2e/**", "./vitest-environments/prisma.ts"],
		],
	},
});
