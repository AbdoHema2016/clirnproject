import {DynamicLinksMethodObj} from '../../../../../../src/containers/dashBoard/Home/Methods/dynamicLinkMethods';

describe('containers/dashBoard/Home/Methods/dynamicLinkMethods', () => {
  describe('#getVenueToken(url)', () => {
    const testCases = [
      {
        url: 'https://testedvenues.me/enter/a2ew?venueToken=a2ew',
        expected: 'a2ew',
      },
      {
        url: 'https://testedme.page.link/wrawrawf2q?venueToken=a123',
        expected: 'a123',
      },
      {
        url: 'https://testedme-business-fe-uat.herokuapp.com/enter/355b',
        expected: '355b',
      },
      {
        url: 'https://tested.me/enter/5gd3',
        expected: '5gd3',
      },
      {
        url: 'https://testedvenues.me/enter/6rr3',
        expected: '6rr3',
      },
      {
        url: 'https://testedme.page.link/wrawrawf2q?venueToken=a123',
        expected: 'a123',
      },
      {
        url: 'https://testedmeme.page.link/355b',
        expected: null,
      },
      {
        url: 'https://tested.me/5gd3',
        expected: null,
      },
    ];

    testCases.forEach((testCase) => {
      describe(`called with "${testCase.url}"`, () => {
        it(`should return "${testCase.expected}"`, () => {
          const result = DynamicLinksMethodObj.getVenueToken(testCase.url);

          expect(result).toEqual(testCase.expected);
        });
      });
    });
  });
});
