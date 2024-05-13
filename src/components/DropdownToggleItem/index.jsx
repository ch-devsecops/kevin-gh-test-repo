import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const DropdownToggleItem = ({ rendering, display = 'block' }) => (
  <div style={{ display }}>
    <Placeholder name="toggle-item-content" rendering={rendering} />
  </div>
);

DropdownToggleItem.propTypes = {
  rendering: PropTypes.shape({
    placeholders: PropTypes.shape(),
    title: PropTypes.string,
    gtmTitle: PropTypes.string,
  }),
};

export default DropdownToggleItem;
