import { FastifyInstance } from "fastify";
import { create } from "../controllers/pets/create";

export async function petsRoutes(app: FastifyInstance) {
	app.post("/pets", create);
}
