import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "production"]),
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
	console.error("Invalid environment variables", envParsed.error.format());

	throw new Error("Invalid environment variables");
}

export const env = envParsed.data;
