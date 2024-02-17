import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import jwt from "./config/jwt";
import { routes } from "./http/routes/index.routes";

const app = fastify();

app.register(fastifyJwt, jwt);
app.register(routes);

export { app };
