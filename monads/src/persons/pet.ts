import {PetType} from "./petType";

export class Pet {

    constructor(
        public readonly type: PetType,
        public readonly name: string,
        public readonly age: number
    ) {}

}
