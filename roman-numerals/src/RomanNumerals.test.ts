import { RomanNumerals } from './RomanNumerals'

// The symbols “I”, “X”, “C”, and “M” can be repeated three times in succession, but no more
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
    it('50 => L', () => {
      expect(romanNumerals.convert(50)).toBe('L');
    })
    it('100 => C', () => {
      expect(romanNumerals.convert(100)).toBe('C');
    })
    it('500 => D', () => {
      expect(romanNumerals.convert(500)).toBe('D');
    })
    it('1000 => M', () => {
      expect(romanNumerals.convert(1000)).toBe('M');
    })
  })

  describe('Repetitions symbols', () => {
    it('2 => II', () => {
      expect(romanNumerals.convert(2)).toBe('II');
    })
    it('3 => III', () => {
      expect(romanNumerals.convert(3)).toBe('III');
    })
    it('20 => XX', () => {
      expect(romanNumerals.convert(20)).toBe('XX');
    })
    it('30 => XXX', () => {
      expect(romanNumerals.convert(30)).toBe('XXX');
    })
    it('200 => CC', () => {
      expect(romanNumerals.convert(200)).toBe('CC');
    })
    it('300 => CCC', () => {
      expect(romanNumerals.convert(300)).toBe('CCC');
    })
  });
})
