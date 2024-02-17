import { FastifyInstance } from "fastify";
import { institutionsRoutes } from "./insitutions.routes";

export async function routes(app: FastifyInstance) {
	app.register(institutionsRoutes);
}
