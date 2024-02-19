import { LEVELS } from "@/enums/levels";
import { SIZES } from "@/enums/sizes";

export interface CreatePetDTO {
	name: string;
	about: string;
	size: SIZES;
	environment: SIZES;
	energy: LEVELS;
	autonomy: LEVELS;
	images: string[];
	adoptionsRequirements: string[];
	institutionId: string;
}
