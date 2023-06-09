const add = (x: number, y: number): number => x + y;
const multiply = (x: number, y: number): number => x * y;
const divide = (x: number, y: number): number => x / y;

describe('Pure functions', () => {
    test('add 1 and double it', () => {
        // Create an add1 function based on add function
        // Create a double function based on multiply
        // Compose the 2 functions together to implement the add1AndDouble function
        const add1AndDouble = (x: number): number => 0;

        expect(add1AndDouble(2)).toBe(6);
    })

    test('add X to Y and double it', () => {
        // Use the Double and the Add function to implement it
        const addXtoYAndDouble = (x: number, y: number): number => 0;

        expect(addXtoYAndDouble(2, 5)).toBe(14);
    })

    test('multiply X by Y then divide by Z', () => {
        // Multiply x by y safely
        // Then Divide the result by z
        // Encapsulate each call inside a Try
        const multiplyXByYThemDivideByZ = (x: number, y: number, z: number): number => 0;

        expect(multiplyXByYThemDivideByZ(9, 3, 5)).toBe(5);
    })

    test('formula', () => {
        // Use the functions defined in this class to implement this formula
        // (2x + y) * (z / 3w)
        const formula = (x: number, y: number, z: number, w: number): number => 0;

        expect(formula(5, 4, 23, 2)).toBe(42);
    })

})
