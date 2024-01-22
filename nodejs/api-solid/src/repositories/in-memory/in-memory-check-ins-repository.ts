import { randomUUID } from "node:crypto";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRespository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRespository {
	private items: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn = {
			id: randomUUID(),
			createdAt: new Date(),
			validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
			gymId: data.gymId,
			userId: data.userId,
		};

		this.items.push(checkIn);

		return checkIn;
	}
}
