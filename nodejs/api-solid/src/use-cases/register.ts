import { UsersRepository } from "@/repositories/users-repository";

import type { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserEmailAlreadyExistsError } from "./errors/user-email-already-exists-error";

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
		password,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserEmailAlreadyExistsError();
		}

		const password_hash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		});

		return {
			user,
		};
	}
}
