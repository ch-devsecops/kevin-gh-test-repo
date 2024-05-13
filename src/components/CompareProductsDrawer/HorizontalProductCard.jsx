import React, { useContext } from 'react';
import { Box, Copy, Icon, Image, useMediaQueries } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import themeStyles from './ScrollableDrawerCards.styles';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';

const EmptyCard = themeStyles.apply(Box, 'EmptyCard');
const ModelCard = themeStyles.apply(Box, 'ModelCard');
const CardTitle = themeStyles.apply(Copy, 'CardTitle');
const CardImage = themeStyles.apply(Image, 'CardImage');
const IconWrapper = themeStyles.apply(Box, 'IconWrapper');
const CardWrapper = themeStyles.apply(Box, 'CardWrapper');

const HorizontalProductCard = ({ empty, fields, firstProduct, cardIndex }) => {
  const { t } = useTranslation();
  const { removeFromCompareProducts, toCompareProducts } = useContext(LocalStorageContext);
  const { isMobile } = useMediaQueries();

  if (empty) {
    return (
      <ModelCard tabIndex={0}>
        <EmptyCard>{t(`Shared.Common.add${firstProduct}ToCompareLabel`)}</EmptyCard>
      </ModelCard>
    );
  }

  const { modelName, modelPage, primaryThumbnail } = fields;
  const modelPageUrl = modelPage?.field?.fields?.url;
  const alt = primaryThumbnail?.item?.value?.alt;
  const image = primaryThumbnail?.item?.value?.src;
  const detId = toCompareProducts?.[cardIndex];

  return (
    <ModelCard tabIndex={0} data-testid="compare-drawer-product-card">
      <CardWrapper>
        <CardImage src={image} alt={alt} />
        <CardTitle as="a" href={modelPageUrl}>
          {modelName?.value}
        </CardTitle>
      </CardWrapper>
      <IconWrapper
        data-testid="compare-drawer-product-card-close-btn"
        tabIndex={0}
        onClick={() => removeFromCompareProducts(detId)}
      >
        <Icon name="close" iconSize={isMobile ? 'small' : 'default'} />
      </IconWrapper>
    </ModelCard>
  );
};
HorizontalProductCard.propTypes = {
  empty: PropTypes.bool,
  cardIndex: PropTypes.number,
  fields: PropTypes.shape({
    modelPage: PropTypes.shape({
      field: PropTypes.shape({
        fields: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    detIdentifier: PropTypes.shape({
      value: PropTypes.string,
    }),
    modelName: PropTypes.shape({
      value: PropTypes.string,
    }),
    primaryThumbnail: PropTypes.shape({
      item: PropTypes.shape({
        value: PropTypes.shape({
          src: PropTypes.string,
          alt: PropTypes.string,
        }),
      }),
    }),
  }),
};

export default HorizontalProductCard;
