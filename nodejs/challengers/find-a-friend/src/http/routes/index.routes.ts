import { FastifyInstance } from "fastify";
import { institutionsRoutes } from "./insitutions.routes";
import { petsRoutes } from "./pets.routes";

export async function routes(app: FastifyInstance) {
	app.register(institutionsRoutes);
	app.register(petsRoutes);
}
