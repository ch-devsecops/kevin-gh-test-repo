import React from 'react';
import PropTypes from 'prop-types';
import { Box, Copy, Optional } from '@honda-canada/design-system-react';
import themeStyles from './Card.styles';

const Meta = themeStyles.apply(Box, 'Meta');
const MetaTitle = themeStyles.apply(Box, 'MetaTitle');
const MetaDescription = themeStyles.apply(Copy, 'MetaDescription');
const MetaAction = themeStyles.apply(Box, 'MetaAction');

const CardMeta = ({ title, description, action, useCover }) => {
  if (!title && !description && !action) {
    return null;
  }
  return (
    <Meta useCover={useCover} onlyAction={!description && !title}>
      <Optional when={title}>
        <MetaTitle>{title}</MetaTitle>
      </Optional>
      <Optional when={description}>
        <MetaDescription>{description}</MetaDescription>
      </Optional>
      <Optional when={action}>
        <MetaAction>{action}</MetaAction>
      </Optional>
    </Meta>
  );
};

CardMeta.propTypes = {
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  action: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  useCover: PropTypes.bool,
};

export default CardMeta;
