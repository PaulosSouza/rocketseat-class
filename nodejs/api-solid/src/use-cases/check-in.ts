import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
}

type CheckInUseCaseResponse = {
	checkIn: CheckIn;
};

export class CheckInUseCase {
	constructor(private checkInsRepository: CheckInsRespository) {}

	async execute({
		gymId,
		userId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.create({
			gymId,
			userId,
		});

		return {
			checkIn,
		};
	}
}
