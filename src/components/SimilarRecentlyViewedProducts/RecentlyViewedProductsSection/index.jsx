import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { H4 } from '@honda-canada/design-system-react';
import GridSection from '../../ProductCardsGrid/GridSection';
import LocalStorageContext from '../../LocalStorageContext/LocalStorageContext';

const Header = ({ name }) => (
  <H4 mt={['m', 'default']} aria-label={name}>
    {name}
  </H4>
);
Header.propTypes = { name: PropTypes.string };

const RecentlyViewedProductsSection = ({ models = [], gtmTags, getModels, fetchFinancial, ...rest }) => {
  const { t } = useTranslation();
  const [modelsList, setModelsList] = useState([]);
  const { recentlyViewedProducts } = useContext(LocalStorageContext);

  useEffect(() => {
    setModelsList(getModels(recentlyViewedProducts, models));
  }, [recentlyViewedProducts]);

  if (!models?.length) return null;

  return (
    <GridSection
      models={modelsList}
      gridTemplateColumnsCount={modelsList.length}
      header={<Header name={t('Pages.Models.Exploration.recentlyViewedProductsLabel')} />}
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

RecentlyViewedProductsSection.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
  fetchFinancial: PropTypes.bool,
  getModels: PropTypes.func,
  gtmTags: PropTypes.shape({
    componentName: PropTypes.string,
    title: PropTypes.string,
    compareTitle: PropTypes.string,
    interactionType: PropTypes.string,
    compareInteractionType: PropTypes.string,
  }),
};

export default RecentlyViewedProductsSection;
