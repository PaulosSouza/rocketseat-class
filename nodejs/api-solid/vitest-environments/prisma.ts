import { Environment } from "vitest";

export default {
	name: "prisma",
	transformMode: "ssr",
	async setup() {
		console.log("Executou");

		return {
			teardown(global) {},
		};
	},
} as Environment;
