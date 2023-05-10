import { Either, IllegalArgumentError, Left, Right, Try } from 'funfix-core'

const divide = (x: number, y: number): Either<Error, number> => y == 0 ? Left(new Error("Dude, can't divide by 0")) : Right(Math.trunc(x / y))

const add = (x: number, y: number): number => x + y

describe('Either exercices', () => {
  test('get the result of divide', () => {
    // Divide x = 9 by y = 2
    const eitherResult = divide(9, 2)
    const result: number = eitherResult.get()

    expect(result).toBe(4)
    expect(eitherResult.isRight()).toBeTruthy()
    expect(eitherResult.isLeft()).toBeFalsy()
  })

  test('map the result of divide', () => {
    // Divide x = 9 by y = 2 and add z to the result
    const z: number = 3
    const result: number = divide(9, 2).map(x => add(x, z)).get()

    expect(result).toBe(7)
  })

  test('divide by zero is always a good idea', () => {
    // Divide x by 0 and get the result
    const result: Either<IllegalArgumentError, number> = divide(10, 0)

    expect(result.isLeft()).toBeTruthy()
    expect(result.swap().get().message).toBe("Dude, can't divide by 0")
  })

  test('divide by zero or else', () => {
    // Divide x by 0, on exception returns 0
    const x: number = 1

    const result: number = divide(x, 0).getOrElse(0)

    expect(result).toBe(0)
  })

  test('map the failure', () => {
    // Divide x by 0, log the failure message to the console and get 0
    const x: number = 1

    const result: number = divide(x, 0).fold((left: Error) => { console.error(left.message); return 0 }, (right) => right)

    expect(result).toBe(0)
  })

  test('chain the either', () => {
    // Divide x by y
    // Chain 2 other calls to divide with x = previous Divide result
    // log the failure message to the console
    // Log your success to the console
    // Get the result or 0 if exception
    const x: number = 27
    let y: number = 3

    const result: number = divide(x, y--)
      .chain(n => divide(n, y--))
      .chain(n => divide(n, y--))
      .chain(n => divide(n, y--))
      .chain(n => divide(n, y--))
      .chain(n => divide(n, y--))
      // .toOption()
      .fold(
        (left: Error) => { console.log(left.message); return 0 },
        (right) => { console.log('Success'); return right }
      )
    expect(result).toBe(0)
  })
})
