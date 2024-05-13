import { createObjectFromProps } from '../object';
import { varian1MockData, mockSitecoreContext } from '../../stories/Header/componentProps';
import { componentObject } from '../__mocks__/object.mock';

describe('createObjectFromProps', () => {
  it('returns an simpleObject from componentProps SiteLogo', () => {
    const value = createObjectFromProps(mockSitecoreContext.route.placeholders.header[0]);
    expect(value).toEqual(componentObject[1]);
  });

  it('returns an simpleObject from item componentProps', () => {
    const value = createObjectFromProps(varian1MockData);
    expect(value).toEqual(componentObject[0]);
  });

  it('returns an simpleObject from componentProps fields items', () => {
    const value = createObjectFromProps(varian1MockData.fields.items);
    expect(value).toEqual(componentObject[0].items);
  });

  it('returns an simpleObject from componentProps fields one item', () => {
    const value = createObjectFromProps(varian1MockData.fields.items[0]);
    expect(value).toEqual(componentObject[0].items[0]);
  });

  it('returns an simpleObject from icon > fields > value, look careful on imput object ', () => {
    const value = createObjectFromProps({
      icon: {
        id: 'f4b5230a-25a0-4d2e-8b07-cb59dc1a7221444',
        url: '/sitecore/System/Foundation/common/CTA-Icons/Arrow-right',
        name: 'Arrow-right',
        displayName: 'Arrow-right',
        fields: {
          value: 'mapMarker',
        },
      },
    });
    expect(value).toEqual({
      icon: {
        itemId: 'f4b5230a-25a0-4d2e-8b07-cb59dc1a7221444',
        itemUrl: '/sitecore/System/Foundation/common/CTA-Icons/Arrow-right',
        itemName: 'Arrow-right',
        itemDisplayName: 'Arrow-right',
        value: 'mapMarker',
      },
    });
  });

  it('returns an simpleObject from double/triple value', () => {
    const value = createObjectFromProps({
      icon: {
        value: {
          value: {
            value: 'Left',
          },
        },
      },
      image: {
        value: {
          value: 'Left',
        },
      },
      alignment: {
        value: 'Left',
      },
      subMenuType: {
        value: {
          value: 'Left',
          second: 'SubMenuCardItem',
        },
      },
      url: {
        value: {
          href: '',
        },
      },
      isDarkMode: {
        value: false,
      },
      isLightMode: {
        value: true,
      },
    });
    expect(value).toEqual({
      icon: 'Left',
      image: 'Left',
      alignment: 'Left',
      subMenuType: {
        value: 'Left',
        second: 'SubMenuCardItem',
      },
      url: {
        href: '',
      },
      isDarkMode: false,
      isLightMode: true,
    });
  });
});
