import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserEmailAlreadyExistsError } from "./errors/user-email-already-exists-error";
import { RegisterUseCase } from "./register";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(inMemoryUsersRepository);
	});

	it("should be able to register", async () => {
		const { user } = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should hash user password upon registration", async () => {
		const password = "123456";

		const { user } = await sut.execute({
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
		const email = "johndoe@example.com";

		await sut.execute({
			name: "John Doe",
			email,
			password: "123456",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email,
				password: "123456",
			}),
		).rejects.toBeInstanceOf(UserEmailAlreadyExistsError);
	});
});
