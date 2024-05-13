import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserLocationContext } from '@honda-canada/user-location';
import { Box, Optional } from '@honda-canada/design-system-react';
import find from 'lodash/find';

import { uniqBy } from 'lodash';
import PackageSelector from './PackageSelector';
import Details from './Details';
import CompareModal from './CompareModal';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import {
  getModelYear,
  getSimplifiedTrimsList,
  getSubPagePath,
  getTrimPricing,
  getModelKey,
  getModelProducts,
} from '../../utils/trimUtils';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getIsSellingPriceProvince, getShowPriceFlags } from '../../utils/financeUtils';
import { useProvinces, useSettings, usePageEditing } from '../../utils/sitecoreContext';
import { serializeFormQuery } from './utils';
import useProductFinancial from '../../utils/hooks/useProductFinancial';
import ConfigurationProvider from './service/ConfigurationProvider';
import Context from './service/Context';
import Disclaimer from '../Disclaimer';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';

export const TrimPackagesUI = ({ fields, componentName }) => {
  const history = useHistory();
  const isPageEditing = usePageEditing();
  const provinces = useProvinces();
  const settings = useSettings();

  const [selectedExteriorColor, setSelectedExteriorColor] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPackageSelectorOpen, setIsPackageSelectorOpen] = useState(false);
  const defaultProvince = settings?.defaultProvince;

  const { vehicleType, paymentOptions } = useContext(Context);
  const { setIsHidden } = useContext(BottomElementContext);

  const { selectedTrim, setSelectedTrim, selectedTransmission, isDark } = useContext(ModelExplorationContext) || {};

  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;
  const isSellingPriceProvince = getIsSellingPriceProvince(provinceCode, provinces);
  const params = typeof document !== 'undefined' ? new URL(document.location).searchParams : null;
  const trimParam = params && params.get('trim');

  const featuresSitecoreItem = find(fields?.data?.value?.trimFeatures, trimFeature =>
    trimFeature?.trims?.fields.find(trim => trim.detKey?.value === selectedTrim?.trimKey),
  );

  const { gtmCategory } = wrapJSSFields(fields);

  const modelYear = getModelYear(fields);
  const modelKey = getModelKey(modelYear);
  const products = getModelProducts(modelYear);
  const specsPath = getSubPagePath(fields, 'specifications');
  const category = fields?.data?.value?.modelYear?.fields?.category?.categoryName?.value;

  // TODO: Cleanup with a proper mapper
  // When a different transmission is selected, all transmission dependent values
  // get updated in the context at ModelExplorationContext.
  const trims = getSimplifiedTrimsList(products, modelYear, specsPath);
  const trimsLength = trims?.length || 0;

  const showInformationalApr = fields?.data?.value?.showInformationalApr?.value === '1'; // needs to check this prop in psp
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(provinceCode, provinces, paymentOptions);

  const { financial, isFetching, hasError, setModels } = useProductFinancial({ vehicleType });

  // useEffect to setIsHidden to false when the component is unmounted
  useEffect(
    // This function will be called when the component is unmounted
    () => () => {
      setIsHidden(false);
    },
    [],
  );

  const handlerSetIsPackageSelectorOpen = value => {
    setIsHidden?.(value);
    setIsPackageSelectorOpen(value);
  };

  useEffect(() => {
    // TODO: Cleanup with a proper mapper
    const models = trims.map(trim => ({
      modelKey: trim.modelKey || modelKey,
      modelYear: modelYear.year?.value,
    }));
    setModels(uniqBy(models, 'modelKey'));
  }, [modelKey, modelYear.year.value]);

  // Cover case to update searchParam when user change trim

  useEffect(() => {
    if (!isPageEditing) {
      if (selectedTrim?.trimKey && selectedTrim?.trimKey !== trimParam) {
        history.replace({
          search: serializeFormQuery(params, { trim: selectedTrim?.trimKey }),
        });
      }
    }
  }, [selectedTrim?.trimKey]);

  // If there is a trim param, select the trim and make sure the package selector is closed.
  // Otherwise, clear any selected trim and make sure the package selector is open.
  useEffect(() => {
    if (trimParam) {
      setSelectedTrim(trims.find(trim => trimParam === trim.trimKey));
      handlerSetIsPackageSelectorOpen(false);
    } else {
      setSelectedTrim(null);
      handlerSetIsPackageSelectorOpen(true);
    }
  }, [trimParam]);

  // If there is only one trim, select it and make sure the package selector is closed.
  useEffect(() => {
    if (trimsLength === 1) {
      setSelectedTrim(trims[0]);
      handlerSetIsPackageSelectorOpen(false);
    }
  }, [trimsLength, isPackageSelectorOpen]);

  // if the compare modal closes, and the package selector is open, and there is a selected trim,
  // close the package selector.
  useEffect(() => {
    if (!isCompareModalOpen && isPackageSelectorOpen && selectedTrim) {
      handlerSetIsPackageSelectorOpen(false);
    }
  }, [isCompareModalOpen]);

  // close trim details if no selected trim or model year changes
  useEffect(() => {
    if (selectedTrim?.trimKey) {
      handlerSetIsPackageSelectorOpen(false);
    } else {
      handlerSetIsPackageSelectorOpen(true);
    }
  }, [selectedTrim?.trimKey, modelYear?.year?.value]);

  // set the default Exterior Color for selected transmission when it changes from the context
  useEffect(() => {
    setSelectedExteriorColor(selectedTrim?.defaultExteriorColorKey);
  }, [selectedTrim?.defaultExteriorColorKey]);

  const selectedTrimWithPricing = selectedTrim && {
    ...selectedTrim,
    pricing: getTrimPricing(financial, selectedTrim, hasError, selectedExteriorColor, selectedTransmission),
    isSellingPriceProvince,
    showMsrpPrice,
    showSellingPrice,
  };

  const gtmCategoryProp = mapGTMCategory(gtmCategory);

  return (
    <Box
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={componentName}
      backgroundColor={isDark ? 'black' : 'default'}
      style={{ isolation: 'isolate' }}
    >
      <PackageSelector
        gtmModelName={modelYear?.model?.name?.toLowerCase()}
        hasError={hasError}
        isFetching={isFetching}
        isOpen={isPackageSelectorOpen}
        selectedTrim={selectedTrimWithPricing}
        setIsCompareModalOpen={setIsCompareModalOpen}
        setIsOpen={handlerSetIsPackageSelectorOpen}
        setSelectedTrim={setSelectedTrim}
        gtmCategoryProp={gtmCategoryProp}
        componentName={componentName}
        trims={trims.map(trim => {
          const trimPricing = getTrimPricing(financial, trim, hasError);
          return {
            ...trim,
            pricing: trimPricing,
            isSellingPriceProvince,
          };
        })}
      />
      <Optional when={selectedTrim?.defaultExteriorColorKey}>
        <Details
          category={mapGTMCategory(gtmCategory)}
          componentType={componentName}
          featuresPath={featuresSitecoreItem?.url}
          hasError={selectedTrimWithPricing?.pricing === null || hasError}
          isFetching={isFetching}
          isPackageSelectorOpen={isPackageSelectorOpen}
          isSellingPriceProvince={isSellingPriceProvince}
          selectedExteriorColor={selectedExteriorColor}
          setSelectedExteriorColor={setSelectedExteriorColor}
          showInformationalApr={showInformationalApr}
          showTrimName={trims.length === 1}
          trim={selectedTrimWithPricing}
          modelCategory={category}
        />
      </Optional>
      <Optional when={!isFetching}>
        <Disclaimer pricing={selectedTrimWithPricing} isSellingProvince={isSellingPriceProvince} />
      </Optional>

      <CompareModal
        closeModal={() => setIsCompareModalOpen(false)}
        financial={financial}
        isOpen={isCompareModalOpen}
        modelName={modelYear?.model?.name}
        selectedTrim={selectedTrimWithPricing}
        selectTrim={setSelectedTrim}
        showInformationalApr={showInformationalApr}
        trims={trims}
      />
    </Box>
  );
};

TrimPackagesUI.propTypes = {
  fields: PropTypes.shape({}),
  componentName: PropTypes.string,
};

const TrimPackages = ({ variant, vehicleType, appNameConfig, ...restProps }) => (
  <ConfigurationProvider variant={variant} vehicleType={vehicleType} appNameConfig={appNameConfig}>
    <TrimPackagesUI {...restProps} />
  </ConfigurationProvider>
);

TrimPackages.propTypes = {
  appNameConfig: PropTypes.shape({
    paymentOptions: PropTypes.shape({
      paymentMethod: PropTypes.string,
      paymentFrequency: PropTypes.string,
    }),
  }),
  fields: PropTypes.shape({}),
  componentName: PropTypes.string,
  variant: PropTypes.string,
  vehicleType: PropTypes.string,
};

export default TrimPackages;
