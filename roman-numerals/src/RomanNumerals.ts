export class RomanNumerals {
    private arabicToRoman = new Map<number, string>([
      [1, 'I'],
      [5, 'V'],
      [10, 'X'],
      [50, 'L'],
      [100, 'C'],
      [500, 'D'],
      [1000, 'M'],
    ]);

    convert(arabicNumber: number) {
      if (arabicNumber > 3000) return '';

      for (let key of Array.from(this.arabicToRoman.keys()).reverse()) {
        if (arabicNumber % key === 0) return this.arabicToRoman.get(key).repeat(arabicNumber / key);
      }

      return '';
    }
}
