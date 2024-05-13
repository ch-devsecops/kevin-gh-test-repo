import React from 'react';
import PropTypes from 'prop-types';

import { ObjectItem } from '../../utils/propTypes';

import { Card, CardMeta } from './Card';
import ActionLink from './ActionLink';

const ArticleCard = ({
  item: { label, stretchedLink, ctaLink: { href, linktype } = {}, image, description } = {},
  parentDisplayName,
  gtmTitle,
  onClick,
} = {}) => {
  const actionLink = () => (
    <ActionLink
      title={label}
      stretchedLink={stretchedLink}
      parentDisplayName={parentDisplayName}
      gtmTitle={gtmTitle}
      href={href}
      linktype={linktype}
      withIcon
      onClick={onClick}
    />
  );

  return (
    <Card cover={image}>
      <CardMeta description={description} action={actionLink()} />
    </Card>
  );
};

ArticleCard.propTypes = {
  item: PropTypes.shape({
    ...ObjectItem,
    // Make Card component clickable by “stretching” a nested link
    stretchedLink: PropTypes.string,
  }),
};

export default ArticleCard;
