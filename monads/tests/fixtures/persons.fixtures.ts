import {Person} from "../../src/persons/person";
import {PetType} from "../../src/persons/petType";
import {Park} from "../../src/persons/park";

export const people: Person[] = [
    new Person("Mary", "Smith")
        .withPet(PetType.Cat, "Tabby", 2),
    new Person("Bob", "Smith")
        .withPet(PetType.Cat, "Dolly", 3)
        .withPet(PetType.Dog, "Spot", 2),
    new Person("Ted", "Smith")
        .withPet(PetType.Dog, "Spike", 4),
    new Person("Jake", "Snake")
        .withPet(PetType.Snake, "Serpy", 1),
    new Person("Barry", "Bird")
        .withPet(PetType.Bird, "Tweety", 2),
    new Person("Terry", "Turtle")
        .withPet(PetType.Turtle, "Speedy", 1),
    new Person("Harry", "Hamster")
        .withPet(PetType.Hamster, "Fuzzy", 1)
        .withPet(PetType.Hamster, "Wuzzy", 1),
    new Person("John", "Doe")
]

export const parks: Park[] = [
    new Park('Jurassic', [PetType.Bird, PetType.Snake, PetType.Turtle]),
    new Park('Central', [PetType.Bird, PetType.Cat, PetType.Dog]),
    new Park('Hippy', [
        PetType.Bird, PetType.Cat, PetType.Dog,
        PetType.Hamster, PetType.Snake, PetType.Turtle
    ]),
]
