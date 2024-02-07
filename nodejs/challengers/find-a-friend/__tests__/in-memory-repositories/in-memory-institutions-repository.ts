import { randomUUID } from "crypto";
import { Institution } from "@/models/institution-model";
import { CreateInstitutionDTO } from "@/repositories/dtos/create-institution-dto";
import { InstitutionsRepository } from "@/repositories/institutions-repository";

export class InstitutionsRepositoryInMemory implements InstitutionsRepository {
	public items: Institution[] = [];

	async create(data: CreateInstitutionDTO): Promise<Institution> {
		const institution: Institution = {
			id: randomUUID(),
			...data,
		};

		this.items.push(institution);

		return institution;
	}
}
