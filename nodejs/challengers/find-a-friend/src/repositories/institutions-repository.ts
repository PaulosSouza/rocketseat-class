import { Institution } from "@/models/institution";
import { CreateInstitutionDTO } from "./dtos/create-institution-dto";

export interface InstitutionsRepository {
	create(data: CreateInstitutionDTO): Promise<Institution>;

	findByEmail(email: string): Promise<Institution | null>;
	findById(id: string): Promise<Institution | null>;
}
