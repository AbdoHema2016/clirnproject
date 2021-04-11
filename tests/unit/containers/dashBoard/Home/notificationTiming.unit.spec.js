import * as RNLocalize from 'react-native-localize';
jest.mock('react-native-localize', () => ({
  getTimeZone: jest
    .fn()
    .mockReturnValue('Africa/Cairo') //fallback call if the test was called more than mockReturnValueOnce definitions
    .mockReturnValueOnce('Europe/London') //first call
    .mockReturnValueOnce('Asia/Shanghai') //second call
    .mockReturnValueOnce('Europe/Paris'), //third call
}));

describe('notification local timezone ', () => {
  const testCases = [
    {
      timezone: 'Europe/London',
      expected: 'Europe/London',
    },
    {
      timezone: 'Asia/Shanghai',
      expected: 'Asia/Shanghai',
    },
    {
      timezone: 'Europe/Paris',
      expected: 'Europe/Paris',
    },
    {
      timezone: 'Africa/Cairo',
      expected: 'Africa/Cairo',
    },
  ];
  testCases.forEach((testCase) => {
    describe(`called with "${testCase.timezone}"`, () => {
      it(`should return "${testCase.expected}"`, () => {
        const result = RNLocalize.getTimeZone();
        expect(result).toEqual(testCase.expected);
      });
    });
  });
});
