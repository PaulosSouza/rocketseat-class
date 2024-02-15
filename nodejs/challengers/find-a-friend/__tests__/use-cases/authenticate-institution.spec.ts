import { AuthenticateInstitutionUseCase } from "@/use-cases/authenticate-institution";
import { InstitutionEmailAlreadyExists } from "@/use-cases/errors/institution-email-already-exists-error";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InstitutionsRepositoryInMemory } from "../in-memory-repositories/in-memory-institutions-repository";

let institutionsRepository: InstitutionsRepositoryInMemory;
let sut: AuthenticateInstitutionUseCase;

describe("Authenticate Institution Use Case", () => {
	beforeEach(() => {
		institutionsRepository = new InstitutionsRepositoryInMemory();
		sut = new AuthenticateInstitutionUseCase(institutionsRepository);
	});

	it("should be able to authenticate an institution", async () => {
		const password = faker.internet.password();

		const createdInstitution = await institutionsRepository.create({
			email: faker.internet.email(),
			passwordHash: await hash(password, 6),
			ownerName: faker.person.fullName(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city: faker.location.city(),
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			state: faker.location.state(),
			zipCode: faker.location.zipCode(),
		});

		const { institution } = await sut.execute({
			email: createdInstitution.email,
			password,
		});

		expect(createdInstitution.id).toEqual(institution.id);
	});

	it("should not be able to authenticate an institution with wrong email", async () => {
		await expect(() =>
			sut.execute({
				email: faker.internet.email(),
				password: faker.internet.password(),
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate an institution with wrong password", async () => {
		const password = faker.internet.password();

		const createdInstitution = await institutionsRepository.create({
			email: faker.internet.email(),
			passwordHash: await hash(password, 6),
			ownerName: faker.person.fullName(),
			address: faker.location.street(),
			addressNumber: faker.location.buildingNumber(),
			city: faker.location.city(),
			neighborhood: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
			state: faker.location.state(),
			zipCode: faker.location.zipCode(),
		});

		await expect(() =>
			sut.execute({
				email: createdInstitution.email,
				password: faker.internet.password(),
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
