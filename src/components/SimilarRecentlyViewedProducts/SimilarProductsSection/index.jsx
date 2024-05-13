import React from 'react';
import PropTypes from 'prop-types';
import { H4 } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import GridSection from '../../ProductCardsGrid/GridSection';
import { SIMILAR_PRODUCTS_LIMIT } from '../../../utils/constants';

const Header = ({ name }) => (
  <H4 mt={['m', 'default']} aria-label={name}>
    {name}
  </H4>
);
Header.propTypes = { name: PropTypes.string };

const SimilarProductsSection = ({ models = [], gtmTags, fetchFinancial, ...rest }) => {
  const { t } = useTranslation();
  const modelItemLength = models?.length;

  if (modelItemLength === 0) return null;

  return (
    <GridSection
      models={models?.slice(0, SIMILAR_PRODUCTS_LIMIT)}
      gridTemplateColumnsCount={modelItemLength > SIMILAR_PRODUCTS_LIMIT ? SIMILAR_PRODUCTS_LIMIT : modelItemLength}
      header={<Header name={t('Pages.Models.Exploration.similarProductsLabel')} />}
      textAlign="center"
      display="flex"
      flexDirection="column"
      width={[1, 1, 1 / 2]}
      gtmTags={gtmTags}
      fetchFinancial={fetchFinancial}
      {...rest}
    />
  );
};

SimilarProductsSection.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
  fetchFinancial: PropTypes.bool,
  gtmTags: PropTypes.shape({
    componentName: PropTypes.string,
    title: PropTypes.string,
    compareTitle: PropTypes.string,
    interactionType: PropTypes.string,
    compareInteractionType: PropTypes.string,
  }),
};

export default SimilarProductsSection;
