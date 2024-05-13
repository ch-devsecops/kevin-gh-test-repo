import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Column } from '@honda-canada/design-system-react';

const PreOrderBannerDropdown = ({ label, options = [], value, onChange, columnWidth }) => {
  if (options.length === 0) return null;

  return (
    <Column width={columnWidth} mb={['default', 0]}>
      {label}
      <Dropdown value={value} placeholderText="" options={options} onChange={onChange} styling="secondary" />
    </Column>
  );
};

PreOrderBannerDropdown.propTypes = {
  label: PropTypes.element,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  columnWidth: PropTypes.arrayOf(PropTypes.number),
};

export default PreOrderBannerDropdown;
