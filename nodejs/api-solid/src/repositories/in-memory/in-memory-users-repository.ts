import { randomUUID } from "node:crypto";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = [];

	async findById(id: string): Promise<User | null> {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			createdAt: new Date(),
		};

		this.items.push(user);

		return user;
	}
}
