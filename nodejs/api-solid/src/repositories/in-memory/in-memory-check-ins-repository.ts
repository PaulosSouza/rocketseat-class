import { randomUUID } from "node:crypto";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInsRespository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRespository {
	public items: CheckIn[] = [];

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

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

		if (checkInIndex >= 0) {
			this.items[checkInIndex] = checkIn;
		}

		return checkIn;
	}

	async countByUserId(userId: string): Promise<number> {
		return this.items.filter((item) => item.userId === userId).length;
	}

	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = this.items.find((item) => item.id === id);

		if (!checkIn) {
			return null;
		}

		return checkIn;
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(date).startOf("date");
		const endOfTheDay = dayjs(date).endOf("date");

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.createdAt);
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkIn.userId === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) {
			return null;
		}

		return checkInOnSameDate;
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		return this.items
			.filter((item) => item.userId === userId)
			.slice((page - 1) * 20, page * 20);
	}
}
