import mock from '../mock';
import { getSectionNav, getRouteItems } from '../utils';

const { fields, params } = mock;

describe('getSectionNav', () => {
  it('should return correct values - filteredItems, isInitialPage, parentPath', () => {
    const { filteredItems, isInitialPage, parentPath } = getSectionNav(fields.items, params.pageName);

    expect(filteredItems.length).toBe(2);
    expect(filteredItems[0].name).toBe('Overview');
    expect(filteredItems[0].displayName).toBe('AcuraLink');
    expect(filteredItems[1].name).toBe('Offers');
    expect(filteredItems[1].displayName).toBe('Offers');
    expect(isInitialPage).toBe(true);
    expect(parentPath).toBe('AcuraLink');
  });

  it('should return isInitialPage = false', () => {
    const { isInitialPage } = getSectionNav(fields.items, 'Offers');

    expect(isInitialPage).toBe(false);
  });
});

describe('getRouteItems', () => {
  it('should return correct values (isActive, path) on initial Page (EN / default)', () => {
    const { filteredItems, isInitialPage, parentPath } = getSectionNav(fields.items, params.pageName);

    const expectedResults = [
      {
        isActive: true,
        path: '/en/AcuraLink',
      },
      {
        isActive: false,
        path: '/en/AcuraLink/Offers',
      },
    ];

    // provided 'en' lang
    filteredItems.forEach((item, i) => {
      const { isActive, path } = getRouteItems(item, i, params.pageName, isInitialPage, parentPath, 'en');

      expect(isActive).toBe(expectedResults[i].isActive);
      expect(path).toBe(expectedResults[i].path);
    });

    // default 'en' lang
    filteredItems.forEach((item, i) => {
      const { isActive, path } = getRouteItems(item, i, params.pageName, isInitialPage, parentPath);

      expect(isActive).toBe(expectedResults[i].isActive);
      expect(path).toBe(expectedResults[i].path);
    });
  });

  it('should return correct values (isActive, path) on offers Page (FR)', () => {
    const { filteredItems, isInitialPage, parentPath } = getSectionNav(fields.items, 'Offers');

    const expectedResults = [
      {
        isActive: false,
        path: '/fr/AcuraLink',
      },
      {
        isActive: true,
        path: '/fr/AcuraLink/Offers',
      },
    ];

    filteredItems.forEach((item, i) => {
      const { isActive, path } = getRouteItems(item, i, 'Offers', isInitialPage, parentPath, 'fr');

      expect(isActive).toBe(expectedResults[i].isActive);
      expect(path).toBe(expectedResults[i].path);
    });
  });
});
