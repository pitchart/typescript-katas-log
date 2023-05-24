import { None, NoSuchElementError, Option, Some } from 'funfix-core'
import { Person } from '../src/persons/person'
import { people } from './fixtures/persons.fixtures'

describe('Option exercices', () => {
  test('Filter a list of persons', () => {
    const persons: Array<Option<string>> = [None, Some('john doe'), Some('Mary Smith'), None]

    const definedPersons: string[] = persons.filter(o => !o.isEmpty()).map(o => o.get())

    expect(definedPersons).toHaveLength(2)
  })

  test('working with null', () => {
    // Instantiate a None Option of string
    // map it to an Upper case function
    // then it must return the string "Ich bin empty" if empty
    const iAmAnOption: Option<string> = None
    const optionValue: string = iAmAnOption.map(s => s.toUpperCase()).getOrElse('Ich bin empty')

    expect(iAmAnOption.isEmpty()).toBeTruthy()
    expect(optionValue).toBe('Ich bin empty')
  })

  test('find Karadoc', () => {
    // Find Karadoc in the people List or return Perceval
    const foundPersonByLastName = (name: string): Option<string> => {
      return Some(new Person('Provençal', 'Le Gaulois').fullName())
        .filter(fullName => {
          return fullName == name
        })
    }

    expect(foundPersonByLastName('Karadoc').getOrElse('Perceval')).toBe('Perceval')
  })

  test('find a person or die trying', () => {
    // Find a person matching firstName and lastName
    // throw a NoSuchElementException if not found
    const firstName = 'Rick'
    const lastName = 'Sanchez'

    const findPersonOrDieTrying = () => Option
      .of(people
        .find(p => p.fullName() == `${firstName} ${lastName}`))

      .getOrElseL(() => {
        throw new NoSuchElementError('miss')
      })

    expect(findPersonOrDieTrying).toThrow(NoSuchElementError)
  })

  test('chain call', () => {
    // Chain calls to the half method 4 times with start in argument
    // For each half append the value to the concat variable (side effect)
    let j = 0
    const half = (x: number): Option<number> => {
      j++
      return x % 2 == 0 ? Some(x / 2) : None
    }

    const start: number = 500

    let concatenation = ''
    let i = 0

    const result = Some(start)
      .chain(half).ap(Option.of((num) => {
        i++
        concatenation += num
        return num
      }))
      .chain(half).ap(Option.of((num) => {
        i++
        concatenation += num
        return num
      }))
      .chain(half).ap(Option.of((num) => {
        i++
        concatenation += num
        return num
      }))
      .chain(half).ap(Option.of((num) => {
        i++
        concatenation += num
        return num
      }))

    expect(result.isEmpty()).toBeTruthy()
    expect(concatenation).toBe('250125')
    expect(i).toBe(2)
    expect(j).toBe(3)
  })
})
