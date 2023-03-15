import { RomanNumerals } from './RomanNumerals'

describe('Roman Numerals', () => {

  const romanNumerals = new RomanNumerals();
  describe('no need to be able to convert numbers larger than about 3000 and less than equal 0', () => {
    it('Larger than 4000', () => {
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
    it('3 => III', () => {
      expect(romanNumerals.convert(3)).toBe('III');
    })
    it('30 => XXX', () => {
      expect(romanNumerals.convert(30)).toBe('XXX');
    })
    it('300 => CCC', () => {
      expect(romanNumerals.convert(300)).toBe('CCC');
    })
    it('3000 => MMM', () => {
      expect(romanNumerals.convert(3000)).toBe('MMM');
    })
    it('4 => IV', () => {
      expect(romanNumerals.convert(4)).toBe('IV');
    })
    it('9 => IX', () => {
      expect(romanNumerals.convert(9)).toBe('IX');
    })
    it('40 => XL', () => {
      expect(romanNumerals.convert(40)).toBe('XL');
    })
    it('90 => XC', () => {
      expect(romanNumerals.convert(90)).toBe('XC');
    });
    it('400 => CD', () => {
      expect(romanNumerals.convert(400)).toBe('CD');
    })
    it('900 => CM', () => {
      expect(romanNumerals.convert(900)).toBe('CM');
    })
  });

  describe('“I” can be subtracted from “V” and “X” only', () => {
    it('49 => XLIX', () => {
      expect(romanNumerals.convert(49)).toBe('XLIX');
    })
    it('99 => XCIX', () => {
      expect(romanNumerals.convert(99)).toBe('XCIX');
    })
    it('499 => CDXCIX', () => {
      expect(romanNumerals.convert(499)).toBe('CDXCIX');
    })
  })

  describe('“X” can be subtracted from “L” and “C” only.', () => {
    it('490 => CDXC', () => {
      expect(romanNumerals.convert(490)).toBe('CDXC');
    })
    it('990 =>  CMXC', () => {
      expect(romanNumerals.convert(990)).toBe('CMXC');
    })
  })

  describe('“I” can be subtracted from “V” and “X” only', () => {
    it('49 => XLIX', () => {
      expect(romanNumerals.convert(49)).toBe('XLIX');
    })
    it('99 => XCIX', () => {
      expect(romanNumerals.convert(99)).toBe('XCIX');
    })
    it('499 => CDXCIX', () => {
      expect(romanNumerals.convert(499)).toBe('CDXCIX');
    })
  })

  describe('test au pif', () => {
    it('1983 => MCMLXXXIII', () => {
      expect(romanNumerals.convert(1983)).toBe('MCMLXXXIII');
    })
    it('3999 => MMMCMXCIX', () => {
      expect(romanNumerals.convert(3999)).toBe('MMMCMXCIX');
    })
  });
})
