class RomanToNumerals {
  private romanToNumerals: Map<string, number> = new Map<string, number>([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);
  convert(romanNumber: string): number {
    return this.romanToNumerals.get(romanNumber);
  }
}

const romanToNumerals = new RomanToNumerals();

describe("RomanToNumerals", () => {
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

// The symbols “I”, “X”, “C”, and “M” can be repeated three times in succession, but no more.
// II => 2
// III => 3
// IV => 4
// XX => 20
// XXX => 30
// XL => 40
// CC => 200
// CCC => 300
// CD => 400
// MM => 2000
// MMM => 3000

// “I” can be subtracted from “V” and “X” only
// IV => 4
// IX => 9

// “X” can be subtracted from “L” and “C” only
// XL => 40
// XC => 90

// “C” can be subtracted from “D” and “M” only
// CD => 400
// CM => 900

// A number written in Arabic numerals can be broken into digits. For example, 1903 is composed of 1 (one thousand), 9 (nine hundreds), 0 (zero tens), and 3 (three units). To write the Roman numeral, each of the nonzero digits should be treated separately. In the above example, 1,000 = M, 900 = CM, and 3 = III. Therefore, 1903 = MCMIII
// XI => 11
// CI => 101
// CXI => 111
// CCCIII => 303
// MCMIII => 1903
