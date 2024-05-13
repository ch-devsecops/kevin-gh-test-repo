import React, { useContext } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  COMPONENT_NAME_SITE_LOGO,
  DISPLAY_NAME_LANGUAGE_MENU,
  DISPLAY_NAME_TOP_NAVIGATION,
} from '../../utils/constants';
import { createObjectFromProps } from '../../utils/object';
import { FieldsItemsType } from '../../utils/propTypes';

import HeaderUI from './HeaderUI';
import { LayoutContext } from '../LayoutContext';
import { LANGUAGE_URL } from './service/constants';
import { useConfiguration } from './service/utils';

const reduceItems = (items, { navTypePrimary, navTypeSecondary, navTypeVariable }) => {
  const menuItems = items?.find(i => i.itemDisplayName === DISPLAY_NAME_TOP_NAVIGATION);
  return {
    primaryItems: menuItems?.items?.reduce((acc, item) => {
      if (item?.[navTypeVariable] === navTypePrimary) {
        acc.push(item);
      }
      return acc;
    }, []),
    secondaryItems: menuItems?.items?.reduce((acc, item) => {
      if (item?.[navTypeVariable] === navTypeSecondary) {
        acc.push(item);
      }
      return acc;
    }, []),
  };
};

const Header = ({ fields, rendering, variant }) => {
  const {
    sitecoreContext: { languageSelectors, language, route },
  } = useSitecoreContext();
  const { t } = useTranslation();
  const { layoutName } = useContext(LayoutContext);

  const config = useConfiguration(variant);

  if (!fields) return null;

  const siteLogo = createObjectFromProps(
    route?.placeholders?.header?.find(component => component?.componentName === COMPONENT_NAME_SITE_LOGO),
  );
  const { items } = createObjectFromProps(fields);
  const { primaryItems, secondaryItems } = reduceItems(items, config);

  return (
    <HeaderUI
      gtmTags={{ type: rendering?.componentName }}
      layoutContainer={layoutName}
      languageMenu={{
        itemId: DISPLAY_NAME_LANGUAGE_MENU,
        itemUrl: LANGUAGE_URL,
        itemName: DISPLAY_NAME_LANGUAGE_MENU,
        itemDisplayName: DISPLAY_NAME_LANGUAGE_MENU,
        current: language,
        items: [
          {
            items: languageSelectors?.map(item => ({
              itemId: item.code,
              itemUrl: LANGUAGE_URL,
              itemName: item.code,
              itemDisplayName: item.code,
              label: t(`Shared.Header.${[item.code]}`),
              url: { href: item.url },
            })),
          },
        ],
        label: `${t('Shared.Header.language')}: ${language?.toUpperCase()}`,
      }}
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
      siteLogo={siteLogo}
      config={config}
    />
  );
};

Header.propTypes = {
  variant: PropTypes.string,
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
  fields: PropTypes.shape({
    items: FieldsItemsType,
  }),
};

export default Header;
