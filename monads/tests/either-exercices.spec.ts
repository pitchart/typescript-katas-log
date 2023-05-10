import {Either, IllegalArgumentError, Left, Right, Try} from "funfix-core";

const divide = (x: number, y: number): Either<Error, number> => y == 0 ? Left(new Error("Dude, can't divide by 0")) : Right(Math.trunc(x / y));

describe("Either exercices", () =>{
    test("get the result of divide", () => {
        // Divide x = 9 by y = 2
        const eitherResult = Left(new Error(""));
        const result: number = 0

        expect(result).toBe(4);
        expect(eitherResult.isRight()).toBeTruthy();
        expect(eitherResult.isLeft()).toBeFalsy();
    })

    test("map the result of divide", () => {
        // Divide x = 9 by y = 2 and add z to the result
        const z: number = 3
        const result: number = 0

        expect(result).toBe(7);
    })

    test("divide by zero is always a good idea", () => {
        // Divide x by 0 and get the result
        const result: Either<IllegalArgumentError, number> = Right(0)

        expect(result.isLeft()).toBeTruthy();
        expect(result.swap().get().message).toBe("Dude, can't divide by 0")
    })

    test("divide by zero or else", () => {
        // Divide x by 0, on exception returns 0
        const x: number = 1;

        const result: number = -1;

        expect(result).toBe(0);
    })

    test("map the failure", () => {
        // Divide x by 0, log the failure message to the console and get 0
        const x: number = 1;

        const result: number = -1;

        expect(result).toBe(0);
    })

    test("chain the either", () => {
        // Divide x by y
        // Chain 2 other calls to divide with x = previous Divide result
        // log the failure message to the console
        // Log your success to the console
        // Get the result or 0 if exception
        const x: number = 27;
        const y: number = 3;

        const result: number = -1;

        expect(result).toBe(0);
    })
})
