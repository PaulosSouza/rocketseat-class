import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UserEmailAlreadyExistsError } from "./errors/user-email-already-exists-error";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
	it("should be able to register", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

		const { user } = await registerUseCase.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should hash user password upon registration", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

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

	it("should not be able to register with same email twice", async () => {
		const inMemoryUsersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

		const email = "johndoe@example.com";

		await registerUseCase.execute({
			name: "John Doe",
			email,
			password: "123456",
		});

		expect(() =>
			registerUseCase.execute({
				name: "John Doe",
				email,
				password: "123456",
			}),
		).rejects.toBeInstanceOf(UserEmailAlreadyExistsError);
	});
});
