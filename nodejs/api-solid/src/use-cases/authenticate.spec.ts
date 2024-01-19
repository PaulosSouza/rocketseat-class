import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentailsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
	it("should be able to register", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await hash("123456", 6),
		});

		const { user } = await sut.execute({
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate with wrong e-mail", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123456",
			}),
		).rejects.toBeInstanceOf(InvalidCredentailsError);
	});

	it("should not be able to authenticate with wrong e-mail", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await hash("123456", 6),
		});

		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123123",
			}),
		).rejects.toBeInstanceOf(InvalidCredentailsError);
	});
});
