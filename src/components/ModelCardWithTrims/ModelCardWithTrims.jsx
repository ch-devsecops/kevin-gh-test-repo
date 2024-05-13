import React, { useEffect, useContext, useState, useMemo } from 'react';
import { Fade, Box, Optional } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { ModelFiltersContext } from '../ModelFiltersContext';
import { getFilteredModels } from '../ModelFiltersContext/utils';

import ModelCard from './ModelCard';
import Trims from './Trims';
import Products from './Products';
import ExpandButton from './shared/ExpandButton';
import ExteriorDisclaimer from './shared/ExteriorDisclaimer';
import { parseActiveModel } from './service/utils';

import { mapGTMCategory } from '../../utils/sitecoreFields';
import usePriceFlagsForProvince from '../PriceComponent/utils';
import NoFilterResult from './shared/NoFilterResult';
import themeStyles from './ModelCardWithTrims.styles';
import Context from './service/Context';
import { isEmpty } from '../../utils/object';
import { MODEL_YEAR_API_DEFAULT_VALUE } from '../../utils/constants';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import ConfigurationProvider from './service/Provider';

const ModelsContainer = themeStyles.apply(Box, 'ModelsContainer');

const productCardMap = {
  trims: Trims,
  products: Products,
};

const ModelCardWithTrimsUI = ({ fields, componentName }) => {
  const {
    collapseIfFilterChanged,
    hondaExpandProps,
    isExpandedDefault,
    modelCardDescriptionPath,
    modelCardProps,
    priceDetKey,
    priceLabels,
    priceModelKey,
    productsComponent,
    showExpandButton,
    vehicleType,
  } = useContext(Context);
  const ProductsComponent = productCardMap[productsComponent];

  const { showMsrpPrice, showSellingPrice } = usePriceFlagsForProvince();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);
  const modelFiltersContext = useContext(ModelFiltersContext);
  const {
    filter = {},
    setTrimCount,
    modelPrices = {},
    trimCount,
    setModelKeys,
    setVehicleType,
  } = modelFiltersContext || {};
  const categoryName = fields?.data?.value?.model?.fields?.detKey?.value;
  const category = fields?.data?.value?.model?.fields?.name;
  useEffect(() => {
    if (vehicleType) {
      setVehicleType(vehicleType);
    }
  }, []);

  const isFiltered = Object.keys(filter?.values || {})
    .map(filterKey => filter?.values[filterKey])
    .some(filterValue => filterValue?.length > 0);
  const isExteriorColorFiltered = Boolean(filter?.values?.exteriorColor.length);
  const { modelKey, tagline, badgeImage, heroImage, allModelYearTrims, exploreCta } = parseActiveModel(fields?.data);
  const paymentOptions = {
    paymentMethod: fields?.data?.value?.paymentMethod?.value?.toLowerCase() || 'finance',
    paymentFrequency: fields?.data?.value?.paymentFrequency?.value?.toLowerCase() || 'weekly',
  };

  // This function maps prices to models
  const modelsWithPrice = useMemo(() => {
    const modelKeys = Object.keys(modelPrices);
    const mappedPriceToModels = allModelYearTrims?.map(model => {
      if (modelKeys.indexOf(get(model, priceModelKey)) !== -1) {
        // eslint-disable-next-line no-param-reassign
        model.price = modelPrices[get(model, priceModelKey)];
      }
      return model;
    });
    return mappedPriceToModels || [];
  }, [safelyStringifyJSON(modelPrices)]);

  const validModelKeys =
    modelsWithPrice?.map(model => ({
      modelKey: get(model, priceDetKey),
      modelYear: model?.modelYear || MODEL_YEAR_API_DEFAULT_VALUE,
    })) || [];

  useEffect(() => {
    if (validModelKeys.length) {
      setModelKeys({ modelKey, modelIds: uniqBy(validModelKeys.filter(m => !!m.modelKey)) });
    }
  }, [safelyStringifyJSON(modelsWithPrice)]);

  const showInformationalApr = fields?.data?.value?.showInformationalApr?.value === '1';
  const filteredModels = getFilteredModels(
    modelsWithPrice,
    filter?.values,
    filter?.priceRange,
    showMsrpPrice,
    showSellingPrice,
  );

  const filteredModelsCount = filteredModels?.length;
  const filterValuesString = safelyStringifyJSON(filter?.values);
  const gtmCategory = fields?.data?.value?.gtmCategory;
  const gtmModelName = fields?.data?.value?.gtmModelName?.value;
  const gtmBodyStyle = fields?.data?.value?.gtmBodyStyle?.value;
  const productCardGtm = {
    componentName,
    bodyStyle: vehicleType?.toLowerCase(),
  };

  useEffect(() => {
    if ((!filter?.onlyFutureVehicles && !filter?.onlyNsx) || !filter) {
      setTrimCount({ modelKey, count: filteredModelsCount });
    }
    if (collapseIfFilterChanged) {
      setIsExpanded(false);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    filterValuesString,
    filter?.onlyFutureVehicles,
    filter?.onlyNsx,
    !isEmpty(filter?.priceRange),
    filteredModelsCount,
  ]);

  // This component will show up only when the trim count is 0 for all categories

  if (trimCount === 0 && Object.keys(filter?.trimCounts)?.[0] === categoryName && !filter?.onlyFutureVehicles) {
    return <NoFilterResult content={t('Pages.Models.Exploration.filterNoResultsLabel')} />;
  }

  // This component is filterable. See ModelListFilters/reducer.js
  if (!fields || !fields?.data || filter?.onlyFutureVehicles || filter?.onlyNsx) {
    return null;
  }

  return (
    <InView threshold={0.2} triggerOnce>
      {({ inView, ref }) => (
        <div ref={ref}>
          <Optional when={filteredModels?.length > 0}>
            <Fade
              data-gtm-category={mapGTMCategory(gtmCategory)}
              data-gtm-component-type={componentName}
              shouldAnimate={isFiltered}
              initialOpacity={isFiltered ? 0 : 1}
              duration="t6"
              data-testid="ModelCardWithTrims"
            >
              <ModelCard
                tagline={tagline}
                description={get(fields, modelCardDescriptionPath)}
                exploreCta={exploreCta}
                backgroundImageSrc={heroImage}
                badgeImageSrc={badgeImage?.src}
                badgeImageAlt={badgeImage?.alt}
                componentName={componentName}
                gtmCategory={mapGTMCategory(gtmCategory)}
                {...modelCardProps}
              />
              <Optional when={showExpandButton}>
                <ExpandButton
                  category={category}
                  trimCount={filteredModelsCount}
                  isExpanded={isExpanded}
                  onClick={() => setIsExpanded(!isExpanded)}
                  gtmComponentType={componentName}
                  gtmModel={gtmModelName}
                  gtmBodyStyle={gtmBodyStyle}
                  gtmTitle={tagline}
                  gtmCategory={vehicleType || category?.toLowerCase()}
                  {...hondaExpandProps}
                />
              </Optional>
              <ModelsContainer isExpanded={isExpanded}>
                <Optional when={isExteriorColorFiltered}>
                  <ExteriorDisclaimer />
                </Optional>
                <Optional when={isExpanded}>
                  {/* Based on variants */}
                  <ProductsComponent
                    models={filteredModels}
                    componentName={componentName}
                    gtmTags={productCardGtm}
                    priceLabels={priceLabels}
                    paymentOptions={paymentOptions}
                    shouldFetch={inView && isExpanded}
                    showInformationalApr={showInformationalApr}
                  />
                </Optional>
              </ModelsContainer>
            </Fade>
          </Optional>
        </div>
      )}
    </InView>
  );
};

ModelCardWithTrimsUI.propTypes = {
  fields: PropTypes.shape({}),
  componentName: PropTypes.string,
};

const ModelCardWithTrims = ({ variant, vehicleType, priceLabels, ...restProps }) => (
  <ConfigurationProvider variant={variant} vehicleType={vehicleType} priceLabels={priceLabels}>
    <ModelCardWithTrimsUI {...restProps} />
  </ConfigurationProvider>
);

ModelCardWithTrims.propTypes = {
  componentName: PropTypes.string,
  fields: PropTypes.shape({}),
  priceLabels: PropTypes.shape({}),
  variant: PropTypes.string,
  vehicleType: PropTypes.string,
};

export default ModelCardWithTrims;
