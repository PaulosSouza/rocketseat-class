import { FastifyInstance } from "fastify";
import { create } from "../controllers/pets/create";
import { getById } from "../controllers/pets/get-by-id";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/pets", create);
	app.get("/pets/:petId", getById);
}
