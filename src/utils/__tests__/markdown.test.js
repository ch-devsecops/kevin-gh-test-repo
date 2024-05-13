import mockConsole from 'jest-mock-console';
import { H4 } from '@honda-canada/design-system-react';
import { getTitleComponent } from '../markdown';

describe('getTitleComponent', () => {
  it('should return a styled.h1 if no Markdown heading level is specified', () => {
    const actual = getTitleComponent('My Title');
    const expected = 'styled.h1';

    expect(actual.displayName).toEqual(expected);
  });

  it('should return a styled.h1 if the Markdown heading level is #', () => {
    const actual = getTitleComponent('# My Title');
    const expected = 'styled.h1';

    expect(actual.displayName).toEqual(expected);
  });

  it('should return a styled component for whatever Markdown heading level is provided', () => {
    const actual = getTitleComponent('#### My Title');
    const expected = 'styled.h4';

    expect(actual.displayName).toEqual(expected);
  });

  it('should return a defaultHeader component if no Markdown heading level is specified', () => {
    const actual = getTitleComponent('My Title', H4);
    const expected = 'styled.h4';

    expect(actual.displayName).toEqual(expected);
  });

  describe('invalid Markdown heading', () => {
    const invalidMarkdownHeading = '########### My Title';
    it('should return a paragraph', () => {
      const restoreConsole = mockConsole();

      const actual = getTitleComponent(invalidMarkdownHeading);
      const expected = 'styled.p';

      expect(actual.displayName).toEqual(expected);
      restoreConsole();
    });

    it('should log a warning', () => {
      const restoreConsole = mockConsole();

      getTitleComponent(invalidMarkdownHeading);
      expect(console.warn).toHaveBeenCalledWith('No heading component available for "########### My Title"');
      restoreConsole();
    });
  });
});
