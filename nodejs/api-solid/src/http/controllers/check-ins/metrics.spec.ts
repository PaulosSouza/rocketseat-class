import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe("Check-in Metrics (e2e)", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get the count of check-ins", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: "Javascript Gym",
				latitude: -18.8484347,
				longitude: -41.9494066,
			},
		});

		await prisma.checkIn.createMany({
			data: [
				{
					gymId: gym.id,
					userId: user.id,
				},
				{
					gymId: gym.id,
					userId: user.id,
				},
			],
		});

		const response = await request(app.server)
			.get("/check-ins/metrics")
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.checkInsCount).toEqual(2);
	});
});
