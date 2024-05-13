import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@honda-canada/design-system-react';
import { stripMarkdownHeading } from '../../utils/markdown';

const Cell = ({ label }) => <Markdown fontFamily="bold">{stripMarkdownHeading(label)}</Markdown>;

Cell.propTypes = {
  label: PropTypes.string,
};

export default Cell;
