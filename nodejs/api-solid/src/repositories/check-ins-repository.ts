import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRespository {
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
	save(data: CheckIn): Promise<CheckIn>;

	countByUserId(userId: string): Promise<number>;

	findById(id: string): Promise<CheckIn | null>;
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
	findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
}
