import { env } from "@/env";

export default {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "10m",
	},
};
