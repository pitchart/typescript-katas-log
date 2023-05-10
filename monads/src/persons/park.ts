import {PetType} from "./petType";

export class Park {
    constructor(
        public readonly name: string,
        public readonly authorizedPetsTypes: PetType[] = []
    ) {}
}
