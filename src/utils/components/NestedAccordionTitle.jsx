import React from 'react';
import PropTypes from 'prop-types';
import { H6 } from '@honda-canada/design-system-react';

const NestedAccordionTitle = ({ children }) => (
  <H6 color="black" fontFamily="bold" paddingY={['s', 'default']}>
    {children}
  </H6>
);

NestedAccordionTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NestedAccordionTitle;
