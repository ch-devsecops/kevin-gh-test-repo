import React, { useContext } from 'react';
import { Box, Copy, Icon, Image, useMediaQueries } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import themeStyles from './CompareDrawer.styles';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';

const EmptyCard = themeStyles.apply(Box, 'EmptyCard');
const ModelCard = themeStyles.apply(Box, 'ModelCard');
const CardTitle = themeStyles.apply(Copy, 'CardTitle');
const CardImage = themeStyles.apply(Image, 'CardImage');
const IconWrapper = themeStyles.apply(Box, 'IconWrapper');
const CardWrapper = themeStyles.apply(Box, 'CardWrapper');

const MiniatureProductCard = ({ empty, fields, cardIndex }) => {
  const { t } = useTranslation();
  const { removeFromCompareProducts, toCompareProducts } = useContext(LocalStorageContext);
  const { isMobile } = useMediaQueries();

  if (empty) {
    return (
      <ModelCard tabIndex={0}>
        <EmptyCard>{t('Shared.Common.addProductToCompareLabel')}</EmptyCard>
      </ModelCard>
    );
  }

  const { modelName, modelPage, thumbnail } = fields;
  const modelPageUrl = modelPage?.field?.fields?.url;
  const alt = thumbnail?.alt?.value;
  const image = thumbnail?.url;
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
MiniatureProductCard.propTypes = {
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
    thumbnail: PropTypes.shape({
      value: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        ),
      }),
    }),
  }),
};

export default MiniatureProductCard;
