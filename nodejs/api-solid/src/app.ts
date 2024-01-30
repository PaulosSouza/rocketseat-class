import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { env } from "./env";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		const validationErrors = fromZodError(error);

		const issues = validationErrors.details.map((detail) => {
			return {
				property: detail.path,
				message: detail.message,
			};
		});

		return reply.status(400).send({
			message: "Validation Error",
			issues,
		});
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	}

	return reply.status(500).send({ message: "Internal server error" });
});
