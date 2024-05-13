import React from 'react';
import PropTypes from 'prop-types';

import { PropItemsType, PropItemType } from '../../../utils/propTypes';

import Language from './Language';
import Secondary from './Secondary';

const SecondaryNav = ({ languageMenu, secondaryItems, gtmTags }) => (
  <>
    <Secondary secondaryItems={secondaryItems} gtmTags={gtmTags?.common || gtmTags} />
    <Language languageMenu={languageMenu} gtmTags={gtmTags?.language} />
  </>
);

SecondaryNav.propTypes = {
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
  }),
  secondaryItems: PropItemsType,
  languageMenu: PropItemType,
};

export default SecondaryNav;
