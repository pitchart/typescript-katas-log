import { RomanNumerals } from './RomanNumerals'

// The symbols “I”, “X”, “C”, and “M” can be repeated three times in succession, but no more
// 3 => III
// 2 => II
// 20 => XX
// 30 => XXX
// 200 => CC
// 300 => CCC
// 2000 => MM
// 3000 => MMM
// 4 => IV
// 9 => IX
// 40 => XL
// 90 => XC
// 400 => CD
// 900 => CM

//“I” can be subtracted from “V” and “X” only
// 99 => XCIX
// 999 => CMXCIX
// 49 => XLIX
// 499 => CDXCIX

// “X” can be subtracted from “L” and “C” only.
// 490 => CDXC
// 990 =>  CMXC

 

describe('Roman Numerals', () => {

  const romanNumerals = new RomanNumerals();
  describe('no need to be able to convert numbers larger than about 3000 and less than equal 0', () => {
    it('Larger than 3000', () => {
      expect(romanNumerals.convert(3001)).toBe('');
    });
    it('Less than equal 0', () => {
      expect(romanNumerals.convert(0)).toBe('');
    });
  })

  // Init symbols
  // 1 => I
  // 5 => V
  // 10 => X
  // 50 => L
  // 100 => C
  // 500 => D
  // 1000 => M
  describe('Init symbols', () => {
    it('1 => I', () => {
      expect(romanNumerals.convert(1)).toBe('I');
    })
    it('5 => V', () => {
      expect(romanNumerals.convert(5)).toBe('V');
    })
    it('10 => X', () => {
      expect(romanNumerals.convert(10)).toBe('X');
    })
  })
})
