import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repositoy";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

type CheckInUseCaseResponse = {
	checkIn: CheckIn;
};

export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRespository,
		private gymsRepository: GymsRepository,
	) {}

	async execute({
		gymId,
		userId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		if (checkInOnSameDay) {
			throw new Error();
		}

		const checkIn = await this.checkInsRepository.create({
			gymId,
			userId,
		});

		return {
			checkIn,
		};
	}
}
