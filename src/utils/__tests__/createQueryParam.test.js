import { createQueryParam } from '../urls';

describe('createQueryParam', () => {
  it('should create a query param when value is not null or undefined', () => {
    expect(createQueryParam('key', 'value')).toBe('&key=value');
  });

  it('should return an empty string when value is null', () => {
    expect(createQueryParam('key', null)).toBe('');
  });

  it('should return an empty string when value is undefined', () => {
    expect(createQueryParam('key', undefined)).toBe('');
  });

  it('should handle values with "#" correctly', () => {
    expect(createQueryParam('key', 'value#123')).toBe('&key=value');
  });
});
