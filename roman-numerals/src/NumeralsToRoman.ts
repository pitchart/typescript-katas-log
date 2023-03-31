export class NumeralsToRoman {
    private arabicToRoman = new Map<number, string>([
      [1, 'I'],
      [4, 'IV'],
      [5, 'V'],
      [9, 'IX'],
      [10, 'X'],
        [40, 'XL'],
      [50, 'L'],
        [90, 'XC'],
      [100, 'C'],
        [400, 'CD'],
      [500, 'D'],
        [900, 'CM'],
      [1000, 'M'],
    ]);

    convert(arabicNumber: number) {
      if (arabicNumber > 3000) return '';

      let acc = '';
      for (let key of Array.from(this.arabicToRoman.keys()).reverse()) {
        if (arabicNumber >= key) {
          acc += this.arabicToRoman.get(key).repeat(Math.floor(arabicNumber / key));
          arabicNumber = arabicNumber % key;
        }
      }

      return acc;
    }
}
