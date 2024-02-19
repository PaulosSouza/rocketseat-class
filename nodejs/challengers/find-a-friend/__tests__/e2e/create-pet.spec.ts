import { app } from "@/app";
import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";
import { faker } from "@faker-js/faker/locale/pt_BR";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateInstitution } from "../utils/create-and-authenticate-institution";

describe("Create Pet (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a pet", async () => {
		const { token, institution } = await createAndAuthenticateInstitution(app);

		const response = await request(app.server)
			.post("/pets")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: faker.animal.dog(),
				about: "A beautiful dog",
				autonomy: faker.helpers.enumValue(LEVELS),
				energy: faker.helpers.enumValue(LEVELS),
				size: faker.helpers.enumValue(SIZES),
				environment: faker.helpers.enumValue(SIZES),
				adoptions_requirements: faker.helpers.uniqueArray(
					faker.word.adjective,
					4,
				),
				images: faker.helpers.uniqueArray(faker.internet.url, 4),
				institution_id: institution.id,
			});

		expect(response.status).toBe(201);
	});
});
