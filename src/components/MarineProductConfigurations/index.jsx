import React, { useEffect } from 'react';
import ProductConfigurationCard from './ProductConfigurationCard';
import componentProps from './componentProps';
import { MODEL_YEAR_API_DEFAULT_VALUE } from '../../utils/constants';
import useProductFinancial from '../../utils/hooks/useProductFinancial';
import { makeModelConfiguration } from '../../utils/financeUtils';

const MarineProductConfigurations = ({ fields }) => {
  const data = fields?.data?.value?.model?.fields;
  const configurations = data?.configurations?.[0]?.items;
  const detModelKey = data?.detModelKey?.value;
  const {
    financial: { modelConfiguration },
    isFetching,
    hasError,
    setModels,
  } = useProductFinancial({ formatter: makeModelConfiguration });

  useEffect(() => {
    if (detModelKey) {
      setModels([
        {
          modelKey: detModelKey,
          modelYear: MODEL_YEAR_API_DEFAULT_VALUE,
        },
      ]);
    }
  }, [detModelKey]);

  if (!configurations?.length) {
    return null;
  }

  return configurations.map(config => (
    <ProductConfigurationCard
      key={config?.detIdentifier}
      configuration={config}
      detModelKey={detModelKey}
      productPrice={{
        modelConfiguration,
        isFetching,
        hasError,
      }}
    />
  ));
};

MarineProductConfigurations.propTypes = componentProps;

export default MarineProductConfigurations;
