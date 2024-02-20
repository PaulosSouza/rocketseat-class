import { app } from "@/app";
import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker/locale/pt_BR";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateInstitution } from "../utils/create-and-authenticate-institution";

describe("Search Pets (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search pets by city and state", async () => {
		const { token, institution } = await createAndAuthenticateInstitution(app);

		const createdPet = await prisma.pet.create({
			data: {
				name: faker.animal.dog(),
				about: "A beautiful dog",
				autonomy: faker.helpers.enumValue(LEVELS),
				energy: faker.helpers.enumValue(LEVELS),
				size: faker.helpers.enumValue(SIZES),
				environment: faker.helpers.enumValue(SIZES),
				adoptionsRequirements: faker.helpers.uniqueArray(
					faker.word.adjective,
					4,
				),
				images: faker.helpers.uniqueArray(faker.internet.url, 4),
				institutionId: institution.id,
			},
		});

		const response = await request(app.server)
			.get(`/pets?city=${institution.city}&state=${institution.state}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.pets).toEqual([
			expect.objectContaining({
				id: createdPet.id,
				name: createdPet.name,
			}),
		]);
	});

	it("should be able to search pets by its size", async () => {
		const { token, institution } = await createAndAuthenticateInstitution(app);

		const petSize = SIZES.BIG;

		for (let index = 1; index < 3; index++) {
			const size = index !== 3 ? petSize : SIZES.SMALL;

			await prisma.pet.create({
				data: {
					name: faker.animal.dog(),
					about: "A beautiful dog",
					autonomy: faker.helpers.enumValue(LEVELS),
					energy: faker.helpers.enumValue(LEVELS),
					size,
					environment: faker.helpers.enumValue(SIZES),
					adoptionsRequirements: faker.helpers.uniqueArray(
						faker.word.adjective,
						4,
					),
					images: faker.helpers.uniqueArray(faker.internet.url, 4),
					institutionId: institution.id,
				},
			});
		}

		const response = await request(app.server)
			.get(
				`/pets?city=${institution.city}&state=${institution.state}&size=${petSize}`,
			)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(2);
		expect(response.body.pets).toEqual([
			expect.objectContaining({
				size: petSize,
			}),
			expect.objectContaining({
				size: petSize,
			}),
		]);
	});
});
