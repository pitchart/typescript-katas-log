class RomanToNumerals {
    private romanToNumerals: Map<string, number> = new Map<string, number>([
        ["I", 1],
        ['IV', 4],
        ["V", 5],
        ['IX', 9],
        ["X", 10],
        ["XL", 40],
        ["L", 50],
        ["XC", 90],
        ["C", 100],
        ["CD", 400],
        ["D", 500],
        ["CM", 900],
        ["M", 1000],
    ]);

    convert(romanNumber: string): number {
        for (let key of Array.from(this.romanToNumerals.keys()).reverse()) {
            if (romanNumber.startsWith(key))
            return this.romanToNumerals.get(key) *  (romanNumber.match(new RegExp(key, "g")) || []).length;
        }
    }
}

const romanToNumerals = new RomanToNumerals();

describe("RomanToNumerals", () => {
    describe("Symbols", () => {

        test("I => 1", () => {
            expect(romanToNumerals.convert("I")).toBe(1);
        });
        test("V => 5", () => {
            expect(romanToNumerals.convert("V")).toBe(5);
        });
        test("X => 10", () => {
            expect(romanToNumerals.convert("X")).toBe(10);
        });
        test("L => 50", () => {
            expect(romanToNumerals.convert("L")).toBe(50);
        });
        test('C => 100', () => {
            expect(romanToNumerals.convert("C")).toBe(100);
        });
        test('D => 500', () => {
            expect(romanToNumerals.convert("D")).toBe(500);
        });
        test('M => 1000', () => {
            expect(romanToNumerals.convert("M")).toBe(1000);
        });
    });
    describe("Repeated symbols", () => {

        test("II => 2", () => {
            expect(romanToNumerals.convert("II")).toBe(2);
        });

        test("III => 3", () => {
            expect(romanToNumerals.convert("III")).toBe(3);
        });

        test("XX => 20", () => {
            expect(romanToNumerals.convert("XX")).toBe(20);
        });
        test("XXX => 30", () => {
            expect(romanToNumerals.convert("XXX")).toBe(30);
        });

        test("CC => 200", () => {
            expect(romanToNumerals.convert("CC")).toBe(200);
        });

        test("MM => 2000", () => {
            expect(romanToNumerals.convert("MM")).toBe(2000);
        });

    });
    describe("“I” can be subtracted from “V” and “X” only", () => {
        test("IV => 4", () => {
            expect(romanToNumerals.convert("IV")).toBe(4);
        });
        test("IX => 9", () => {
            expect(romanToNumerals.convert("IX")).toBe(9);
        });
    });

    describe("“X” can be subtracted from “L” and “C” only", () => {
        test("XL => 40", () => {
            expect(romanToNumerals.convert("XL")).toBe(40);
        });
        test("XC => 90", () => {
            expect(romanToNumerals.convert("XC")).toBe(90);
        });
    });

    describe("“C” can be subtracted from “D” and “M” only", () => {
        test("CD => 400", () => {
            expect(romanToNumerals.convert("CD")).toBe(400);
        });
        test("CM => 900", () => {
            expect(romanToNumerals.convert("CM")).toBe(900);
        });
    });

    describe("Final tests en vrac", () => {
        test("XI => 11", () => {
            expect(romanToNumerals.convert("XI")).toBe(11);
        });
    });

});

// A number written in Arabic numerals can be broken into digits. For example, 1903 is composed of 1 (one thousand), 9 (nine hundreds), 0 (zero tens), and 3 (three units). To write the Roman numeral, each of the nonzero digits should be treated separately. In the above example, 1,000 = M, 900 = CM, and 3 = III. Therefore, 1903 = MCMIII
// XI => 11
// CI => 101
// CXI => 111
// CCCIII => 303
// MCMIII => 1903
