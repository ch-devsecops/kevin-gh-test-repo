import safelyParseJSON from '../safelyParseJSON';
import { jsonMock, malformedJsonMock } from '../__mocks__/safelyParseJSON.mock';

describe('safelyParseJSON', () => {
  it('should return an empty or parsed JSON Object ', () => {
    const value = safelyParseJSON(jsonMock);
    expect(value && typeof value === 'object').toBe(true);
  });

  it('should return parsed JSON Object with key bannerText ', () => {
    const value = safelyParseJSON(jsonMock);
    expect('bannerText' in value).toBe(true);
  });

  it('should return an empty Object ', () => {
    const value = safelyParseJSON(malformedJsonMock);
    expect(Object.keys(value).length === 0).toBe(true);
  });
});
