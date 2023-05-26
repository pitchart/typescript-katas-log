import {None, NoSuchElementError, Option, Some} from "funfix-core"
import {Person} from "../src/persons/person";

import { people, parks } from "./fixtures/persons.fixtures";

describe('Option exercices', () => {

    test('Filter a list of persons', () => {
        const persons: Option<string>[] = [None, Some("john doe"), Some("Mary Smith"), None]

        const definedPersons: string[] = []

        expect(definedPersons).toHaveLength(2)
    })

    test("working with null", () => {
        // Instantiate a None Option of string
        // map it to an Upper case function
        // then it must return the string "Ich bin empty" if empty
        const iAmAnOption: Option<string> = None
        const optionValue: string = null

        expect(iAmAnOption.isEmpty()).toBeTruthy()
        expect(optionValue).toBe("Ich bin empty")
    })

    test("find Karadoc", () => {
        // Find Karadoc in the people List or return Perceval
        const foundPersonByLastName = (name: string): Option<string> => Some(new Person('Provençal', 'Le Gaulois').fullName())

        expect(foundPersonByLastName('Karadoc').getOrElse('Perceval')).toBe("Perceval")
    })

    test("find a person or die trying", () => {
        // Find a person matching firstName and lastName
        // throw a NoSuchElementException if not found
        const firstName = "Rick"
        const lastname = "Sanchez"

        const findPersonOrDieTrying = () => null

        expect(findPersonOrDieTrying).toThrow(NoSuchElementError)
    })

    test("chain call", () => {
        // Chain calls to the half method 4 times with start in argument
        // For each half append the value to the concat variable (side effect)

        const half = (x: number): Option<number> => x % 2 == 0 ? Some(x / 2) : None;

        const start: number = 500

        let concatenation = ""


        const result = Some(0)

        expect(result.isEmpty()).toBeTruthy()
        expect(concatenation).toBe("250125")
    })
})
