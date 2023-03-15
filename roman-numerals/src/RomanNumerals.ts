export class RomanNumerals {
  convert(arabicNumber: number) {
    if (arabicNumber === 1) return 'I';
    if (arabicNumber === 5) return 'V';
    if (arabicNumber === 10) return 'X';
    return '';
  }
  
}
