import { Failure, IllegalArgumentError, Option, Success, Try } from "funfix-core";

describe("Try exercices", () => {
  const divide = (x: number, y: number): number => Math.trunc(x / y);
  const tryDivide = (x: number, y: number): Try<number> =>
    Try.of<number>(() => {
      if (y === 0) throw new IllegalArgumentError("Impossible to divide by 0");
      return divide(x, y);
    });

  test("get the result of divide", () => {
    // Divide x = 9 by y = 2
    const tryResult: Try<number> = tryDivide(9, 2);
    const result = tryResult.get();

    expect(result).toBe(4);
    expect(tryResult.isSuccess()).toBeTruthy();
    expect(tryResult.isFailure()).toBeFalsy();
  });

  test("map the result of divide", () => {
    // Divide x = 9 by y = 2 and add z to the result
    const z: number = 3;
    const tryResult: Try<number> = tryDivide(9, 2).map((r) => r + z);
    const result = tryResult.get();

    expect(result).toBe(7);
  });

  test("divide by zero is always a good idea", () => {
    // Divide x by 0, on exception returns 0
    const x: number = 1;
    const result = tryDivide(x, 0).getOrElse(0);

    expect(result).toBe(0);
  });

  test("map the failure", () => {
    // Divide x by 0, log the failure message to the console and get 0
    const x: number = 1;

    const result: number = tryDivide(x, 0)
      .recover((e) => {
        console.log(e);
        return 0;
      })
      .get();

    expect(result).toBe(0);
  });

  test("map the success", () => {
    // Divide x by y
    // log the failure message to the console
    // Log your success to the console
    // Get the result or 0 if exception
    const x: number = 8;
    const y: number = 4;

    const result: number = tryDivide(x, y).fold(
      (left) => {
        console.log(left);
        return 0;
      },
      (right) => {
        console.log(right);
        return right;
      }
    );

    expect(result).toBe(2);
  });

  test("chain the try", () => {
    // Divide x by y
    // Chain 2 other calls to divide with x = previous Divide result
    // log the failure message to the console
    // Log your success to the console
    // Get the result or 0 if exception
    const x: number = 27;
    const y: number = 3;

    const result: number = tryDivide(x, y)
      .chain((r) => tryDivide(r, y))
      .chain((r) => tryDivide(r, y))
        .fold(left => {
            console.log(left);
            return 0;
        }, right => {
            console.log(right);
            return right;
      })

    expect(result).toBe(1);
  });

  test("try and return an option", () => {
    // Create a optionDivide function that return an Option on divide
    // If something fails -> return None
    // Can be useful sometimes
    const x: number = 9;
    const y: number = 3;
    const result: Option<number> = tryDivide(x, y).toOption();

    expect(result.get()).toBe(3);
  });
});
