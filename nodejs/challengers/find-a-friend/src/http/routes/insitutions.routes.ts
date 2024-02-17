import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/institutions/authenticate";
import { register } from "../controllers/institutions/register";

export async function institutionsRoutes(app: FastifyInstance) {
	app.post("/institutions", register);
	app.post("/sessions", authenticate);
}
