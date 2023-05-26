import {PetType} from "./petType";
import {Pet} from "./pet";

export class Person {
    constructor(public readonly firstname: string, public readonly lastname: string, public readonly pets: Pet[] = []) {}

    fullName = (): string => `${this.firstname} ${this.lastname}`

    named = (fullName: string): boolean => fullName === this.fullName()

    withPet = (type: PetType, name: string, age: number) => {
        this.pets.push(new Pet(type, name, age))
        return this
    }

    getPetTypes = (): PetType[] => [... new Set(this.pets.flatMap((p: Pet) => p.type))]

    hasPetType = (type: PetType): boolean => this.getPetTypes().some((t: PetType ) => t === type)

    isPetPerson = (): boolean => this.getNumberOfPets() >= 1

    getNumberOfPets = () => this.pets.length
}
