import { CheckInsRespository } from "@/repositories/check-ins-repository";

interface GetUserMetricsRequest {
	userId: string;
}

type GetUserMetricsResponse = {
	checkInsCount: number;
};

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRespository) {}

	async execute({
		userId,
	}: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId);

		return {
			checkInsCount,
		};
	}
}
