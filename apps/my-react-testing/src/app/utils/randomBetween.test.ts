import randomBetween from './randomBetween';

const randomSpy = jest.spyOn(Math, 'random');

describe('randomBetween', () => {
  beforeEach(() => {
    randomSpy.mockClear();
  });

  describe('when Math.random() returns 0', () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0);
    });

    it('called with min=3 and max=5 returns 3', () => {
      expect(randomBetween(3, 5)).toBe(3);
      expect(Math.random).toBeCalledTimes(1);
    });
  });

  describe('when Math.random() returns 0.5', () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0.5);
    });

    it('called with min=3 and max=5 returns 4', () => {
      expect(randomBetween(3, 5)).toBe(4);
      expect(Math.random).toBeCalledTimes(1);
    });
  });

  describe('when Math.random() returns 0.99999', () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0.99999);
    });

    it('called with min=3 and max=5 returns 5', () => {
      expect(randomBetween(3, 5)).toBe(5);
      expect(Math.random).toBeCalledTimes(1);
    });
  });
});
