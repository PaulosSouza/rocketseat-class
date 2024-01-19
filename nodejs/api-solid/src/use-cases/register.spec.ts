import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
	it("should hash user password upon registration", async () => {
		const registerUseCase = new RegisterUseCase({});

		const password = "123456";

		const { user } = await registerUseCase.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password,
		});

		const isPasswordCorrectlyHashed = await compare(
			password,
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
});
