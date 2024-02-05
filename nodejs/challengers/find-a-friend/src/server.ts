import { app } from "./app";
import { env } from "./env";

async function main() {
	try {
		await app.listen({
			host: "0.0.0.0",
			port: env.PORT,
		});

		console.log("🚀 HTTP Server Running");
	} catch (error) {
		console.error("❌ HTTP Server Failed", { error });
		process.exit(1);
	}
}

main();
