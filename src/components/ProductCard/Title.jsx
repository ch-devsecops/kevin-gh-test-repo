import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownHeading } from '@honda-canada/design-system-react';

const Title = ({ title, mt }) => (
  <MarkdownHeading mb={['xs', 's']} mt={mt ?? ['s', 'default']} headingOverride="h5">
    {title}
  </MarkdownHeading>
);

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
