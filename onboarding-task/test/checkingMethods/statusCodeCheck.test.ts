import { checkStatus } from '../../src/actionCreators/checkStatus';

describe('Correctly decides whether the response from the server is valid', () => {
  const Success = [
    {name: 'OK', code: 200 },
    {name: 'Created', code: 201},
  ];

  const Errors = [
    {name: 'Bad Request', code: 400},
    {name: 'Forbidden', code: 403},
    {name: 'Internal Server Error ', code: 500},
  ];

  const response = (code: number) => new Response({ status: code });
  Success.forEach(testCase => {
    it('returns response when ' + testCase.name + ' statusCode is received', () => {
      const actual = checkStatus(response(testCase.code));

      expect(actual).toBe(true);
    });
  });

  Errors.forEach(testCase => {
    it('throws an error when ' + testCase.name + ' statusCode is received', () => {
      const actual = checkStatus(response(testCase.code));

      expect(actual).toBe(false);
    });
  });
});
