import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Optional, Wrapper } from '@honda-canada/design-system-react';

import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

import Container from './MarineCategory.styles';

const MarineCategory = ({ fields, rendering }) => {
  const { t } = useTranslation();

  if (!fields) return null;

  const models = fields?.data?.value?.category?.fields?.models;
  const gtmTags = {
    componentName: rendering?.componentName,
    bodyStyle: fields?.data?.value?.category?.fields?.categoryName?.value,
  };
  const priceLabels = {
    allInPrice: { label: t('Shared.Common.sellingPriceStartingFromLabel') },
  };

  return (
    <Wrapper data-testid="marine-category-wrapper" data-gtm-component-type={rendering?.componentName}>
      <Container>
        <DesktopLayout models={models} gtmTags={gtmTags} priceLabels={priceLabels} />
        <Optional when={models?.length}>
          <MobileLayout models={models} gtmTags={gtmTags} priceLabels={priceLabels} />
        </Optional>
      </Container>
    </Wrapper>
  );
};

MarineCategory.propTypes = {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        category: PropTypes.shape({
          fields: PropTypes.shape({
            categoryName: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        }),
      }),
    }),
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};
export default MarineCategory;
