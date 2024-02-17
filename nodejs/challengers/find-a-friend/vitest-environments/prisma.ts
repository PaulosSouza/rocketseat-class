import { randomUUID } from "crypto";
import { env } from "@/env";

import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import type { Environment } from "vitest";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
	if (!env.DATABASE_URL) {
		throw new Error("Please provide a DATABASE_URL environment variable.");
	}

	const url = new URL(env.DATABASE_URL);
	url.searchParams.set("schema", schema);

	return url.toString();
}

export default (<Environment>{
	name: "custom",
	transformMode: "ssr",
	async setup(global, options) {
		const schema = randomUUID();
		const databaseURL = generateDatabaseURL(schema);

		process.env.DATABASE_URL = databaseURL;

		execSync("pnpm prisma migrate deploy");

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				);

				await prisma.$disconnect();
			},
		};
	},
});
