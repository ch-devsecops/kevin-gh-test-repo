import * as PropTypes from 'prop-types';
import React from 'react';
import { H4 } from '@honda-canada/design-system-react';
import { getTitleComponent, stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import themeStyles from './DistributerCard.styles';

const StyledH4 = themeStyles.apply(H4, 'StyledH4');

const CardTitle = ({ text, ...rest }) => {
  const Title = getTitleComponent(text, StyledH4);

  return <Title {...rest}>{styledCompiler(stripMarkdownHeading(text))}</Title>;
};

CardTitle.propTypes = { text: PropTypes.string };

export default CardTitle;
