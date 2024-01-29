import { FastifyInstance } from "fastify";

import { app } from "@/app";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { register } from "./controllers/register";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", register);
	app.post("/authenticate", authenticate);

	/** Authenticated routes */
	app.get("/me", { onRequest: [verifyJWT] }, profile);
}
