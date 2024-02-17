import { FastifyInstance } from "fastify";
import { register } from "../controllers/institutions/register";

export async function institutionsRoutes(app: FastifyInstance) {
	app.post("/institutions", register);
}
