import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymsUseCase(gymsRepository);
	});

	it("should be able to check-in history", async () => {
		await gymsRepository.create({
			title: "Javascript Gym",
			description: null,
			phone: null,
			latitude: -18.8484347,
			longitude: -41.9494066,
		});

		await gymsRepository.create({
			title: "Typescript Gym",
			description: null,
			phone: null,
			latitude: -18.8484347,
			longitude: -41.9494066,
		});

		const { gyms } = await sut.execute({
			query: "Javascript",
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "Javascript Gym" }),
		]);
	});

	it("should be able to fetch paginated check-in history", async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Javascript Gym ${i.toString().padStart(2, "0")}`,
				description: null,
				phone: null,
				latitude: -18.8484347,
				longitude: -41.9494066,
			});
		}

		const { gyms } = await sut.execute({
			query: "Javascript",
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "Javascript Gym 21" }),
			expect.objectContaining({ title: "Javascript Gym 22" }),
		]);
	});
});
