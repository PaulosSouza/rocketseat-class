import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export default function makeSearchPetsUseCaseFactory(): SearchPetsUseCase {
	const prismaPetsRepository = new PrismaPetsRepository();
	const searchPetsUseCase = new SearchPetsUseCase(prismaPetsRepository);

	return searchPetsUseCase;
}
