import { NumeralsToRoman } from './NumeralsToRoman'

describe('Roman Numerals', () => {

  const numeralsToRoman = new NumeralsToRoman();
  describe('no need to be able to convert numbers larger than about 3000 and less than equal 0', () => {
    it('Larger than 4000', () => {
      expect(numeralsToRoman.convert(3001)).toBe('');
    });
    it('Less than equal 0', () => {
      expect(numeralsToRoman.convert(0)).toBe('');
    });
  })

  describe('Init symbols', () => {
    it('1 => I', () => {
      expect(numeralsToRoman.convert(1)).toBe('I');
    })
    it('5 => V', () => {
      expect(numeralsToRoman.convert(5)).toBe('V');
    })
    it('10 => X', () => {
      expect(numeralsToRoman.convert(10)).toBe('X');
    })
    it('50 => L', () => {
      expect(numeralsToRoman.convert(50)).toBe('L');
    })
    it('100 => C', () => {
      expect(numeralsToRoman.convert(100)).toBe('C');
    })
    it('500 => D', () => {
      expect(numeralsToRoman.convert(500)).toBe('D');
    })
    it('1000 => M', () => {
      expect(numeralsToRoman.convert(1000)).toBe('M');
    })
  })

  describe('Repetitions symbols', () => {
    it('3 => III', () => {
      expect(numeralsToRoman.convert(3)).toBe('III');
    })
    it('30 => XXX', () => {
      expect(numeralsToRoman.convert(30)).toBe('XXX');
    })
    it('300 => CCC', () => {
      expect(numeralsToRoman.convert(300)).toBe('CCC');
    })
    it('3000 => MMM', () => {
      expect(numeralsToRoman.convert(3000)).toBe('MMM');
    })
    it('4 => IV', () => {
      expect(numeralsToRoman.convert(4)).toBe('IV');
    })
    it('9 => IX', () => {
      expect(numeralsToRoman.convert(9)).toBe('IX');
    })
    it('40 => XL', () => {
      expect(numeralsToRoman.convert(40)).toBe('XL');
    })
    it('90 => XC', () => {
      expect(numeralsToRoman.convert(90)).toBe('XC');
    });
    it('400 => CD', () => {
      expect(numeralsToRoman.convert(400)).toBe('CD');
    })
    it('900 => CM', () => {
      expect(numeralsToRoman.convert(900)).toBe('CM');
    })
  });

  describe('“I” can be subtracted from “V” and “X” only', () => {
    it('49 => XLIX', () => {
      expect(numeralsToRoman.convert(49)).toBe('XLIX');
    })
    it('99 => XCIX', () => {
      expect(numeralsToRoman.convert(99)).toBe('XCIX');
    })
    it('499 => CDXCIX', () => {
      expect(numeralsToRoman.convert(499)).toBe('CDXCIX');
    })
  })

  describe('“X” can be subtracted from “L” and “C” only.', () => {
    it('490 => CDXC', () => {
      expect(numeralsToRoman.convert(490)).toBe('CDXC');
    })
    it('990 =>  CMXC', () => {
      expect(numeralsToRoman.convert(990)).toBe('CMXC');
    })
  })

  describe('“I” can be subtracted from “V” and “X” only', () => {
    it('49 => XLIX', () => {
      expect(numeralsToRoman.convert(49)).toBe('XLIX');
    })
    it('99 => XCIX', () => {
      expect(numeralsToRoman.convert(99)).toBe('XCIX');
    })
    it('499 => CDXCIX', () => {
      expect(numeralsToRoman.convert(499)).toBe('CDXCIX');
    })
  })

  describe('test au pif', () => {
    it('1983 => MCMLXXXIII', () => {
      expect(numeralsToRoman.convert(1983)).toBe('MCMLXXXIII');
    })
    it('2999 => MMCMXCIX', () => {
      expect(numeralsToRoman.convert(2999)).toBe('MMCMXCIX');
    })
  });
})
