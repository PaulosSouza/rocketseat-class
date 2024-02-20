import { app } from "@/app";
import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker/locale/pt_BR";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateInstitution } from "../utils/create-and-authenticate-institution";

describe("Get Pet Detail (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get pet's details", async () => {
		const { token, institution } = await createAndAuthenticateInstitution(app);

		const pet = await prisma.pet.create({
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
			.get(`/pets/${pet.id}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.pet).toEqual(
			expect.objectContaining({
				name: pet.name,
			}),
		);
	});
});
