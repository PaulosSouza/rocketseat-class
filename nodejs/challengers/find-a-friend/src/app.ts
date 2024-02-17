import fastify from "fastify";
import { routes } from "./http/routes/index.routes";

const app = fastify();

app.register(routes);

export { app };
