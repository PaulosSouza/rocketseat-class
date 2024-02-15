import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { SearchPetsUseCase } from "@/use-cases/search-pets";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";
import { PetsRepositoryInMemory } from "../in-memory-repositories/in-memory-pets-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let petsRepository: PetsRepositoryInMemory;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		petsRepository = new PetsRepositoryInMemory(institutionsRepository);
		sut = new SearchPetsUseCase(petsRepository);
	});

	it("should be able to search pets by city and state", async () => {
		const city = faker.location.city();
		const state = faker.location.state();

		const petName = faker.animal.dog();

		const institution = await institutionsRepository.create({
			ownerName: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city,
			state,
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			zipCode: faker.location.zipCode(),
			passwordHash: faker.internet.password(),
		});

		await petsRepository.create({
			name: petName,
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoption_requirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institution_id: institution.id,
		});

		await petsRepository.create({
			name: petName,
			about: "A beautiful dog",
			autonomy: faker.helpers.enumValue(LEVELS),
			energy: faker.helpers.enumValue(LEVELS),
			size: faker.helpers.enumValue(SIZES),
			environment: faker.helpers.enumValue(SIZES),
			adoption_requirements: faker.helpers.uniqueArray(faker.word.adjective, 4),
			images: faker.helpers.uniqueArray(faker.internet.url, 4),
			institution_id: institution.id,
		});

		const { pets } = await sut.execute({
			city,
			state,
		});

		expect(pets).toHaveLength(2);
		expect(pets).toEqual([
			expect.objectContaining({ name: petName }),
			expect.objectContaining({ name: petName }),
		]);
	});
});
