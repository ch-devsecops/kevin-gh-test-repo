import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { UserLocationContext } from '@honda-canada/user-location';
import { Wrapper, Fade } from '@honda-canada/design-system-react';

import { uniqBy } from 'lodash';
import TrimCardsSlider from './TrimCardsSlider';
import SpecificationsUI from './SpecificationsUI';

import ConfigurationProvider from './service/ConfigurationProvider';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getPriceTooltipLabelKey, getShowPriceFlags } from '../../utils/financeUtils';
import { styledCompiler } from '../../utils/markdown';
import { useSettings, useProvinces, useLanguage } from '../../utils/sitecoreContext';

import Context from './service/Context';
import { getHydratedTrims } from './service/utils';

import { LegalDisclaimer } from './TrimSpecifications.styles';

export const TrimSpecificationsUI = ({ tabsParams = {}, fields, componentName }) => {
  const { t } = useTranslation();
  const language = useLanguage();

  const configurationProvider = useContext(Context);
  const { isDark, setSelectedTrim, setCurrentSlide, setModels, financial } = configurationProvider || {};

  const { defaultProvince } = useSettings();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;

  const provinces = useProvinces();

  const msrpStartingFromLabel = t('Shared.Common.msrpStartingFromLabel');
  const sellingPriceLabel = t('Shared.Common.sellingPriceLabel');
  const specificationRefs = useRef([]);

  const { anchorId, gtmCategory, legalDisclaimer, ctaLink, modelYear, collapseLabel, expandLabel } = fields;

  const { isInit, setIsInit, setActiveTab } = tabsParams;
  const { fields: { year, trims, model } = {} } = modelYear || {};
  const trimKeysString = trims?.map(trim => trim.trimKey).toString();

  const priceTooltipLabel = t(getPriceTooltipLabelKey(provinceCode, provinces));
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(provinceCode, provinces);

  // If there's a `compare` querystring param, set active tab to 1.
  // If there's a `trim` querystring param, set the current slide to that
  useEffect(() => {
    if (typeof document !== 'undefined' && isInit) {
      const params = new URL(document.location).searchParams;
      const compareTrimsParam = params.get(language === 'fr' ? 'comparer' : 'compare');
      const selectedTrimParam = params.get('trim');

      if (compareTrimsParam) {
        setActiveTab(1);
        setIsInit(false);
      } else if (selectedTrimParam) {
        setSelectedTrim(selectedTrimParam);
        const selectedTrimIndex = trims?.findIndex(trim => trim.detIdentifier.value === selectedTrimParam);
        if (selectedTrimIndex > 0) {
          setCurrentSlide(selectedTrimIndex);
          setIsInit(false);
        }
      }
    }
  }, [trimKeysString, isInit, setActiveTab, setIsInit, language]);

  // TODO: Cleanup with a proper mapper
  // compulsory for auto
  const detModelKey = model?.detKey?.value;

  useEffect(() => {
    if (detModelKey) {
      // TODO: Cleanup with a proper mapper
      const models = trims.map(trim => ({ modelKey: trim.model?.detKey.value || detModelKey, modelYear: year?.value }));
      setModels(uniqBy(models, 'modelKey'));
    }
  }, [detModelKey, year?.value]);

  const hydratedTrims = getHydratedTrims(
    trims,
    year?.value,
    detModelKey,
    financial,
    msrpStartingFromLabel,
    sellingPriceLabel,
    priceTooltipLabel,
    showMsrpPrice,
    showSellingPrice,
  );

  return (
    <Fade
      id={anchorId?.value}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={componentName}
      initialOpacity={0}
      duration="t1"
      backgroundColor={isDark ? 'black' : 'white'}
    >
      <Wrapper pb={['80vh', 'default']} gutters={[false, false]}>
        <TrimCardsSlider
          ctaLink={ctaLink}
          trims={hydratedTrims}
          specificationRefs={specificationRefs}
          componentName={componentName}
        />
        <SpecificationsUI
          specificationRefs={specificationRefs}
          trims={trims}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
          componentName={componentName}
          year={year?.value}
        />
        <LegalDisclaimer size="legal" isDark={isDark}>
          {styledCompiler(legalDisclaimer?.value)}
        </LegalDisclaimer>
      </Wrapper>
    </Fade>
  );
};

TrimSpecificationsUI.propTypes = {
  componentName: PropTypes.string,
  fields: PropTypes.shape({}),
  tabsParams: PropTypes.shape({
    isInit: PropTypes.bool,
    setIsInit: PropTypes.func,
    setActiveTab: PropTypes.func,
  }),
};

const TrimSpecifications = ({ variant, vehicleType, appNameConfig, componentName, ...restProps }) => (
  <ConfigurationProvider variant={variant} vehicleType={vehicleType} appNameConfig={appNameConfig}>
    <TrimSpecificationsUI {...restProps} componentName={componentName} />
  </ConfigurationProvider>
);

TrimSpecifications.propTypes = {
  appNameConfig: PropTypes.shape({
    paymentOptions: PropTypes.shape({
      paymentMethod: PropTypes.string,
      paymentFrequency: PropTypes.string,
    }),
  }),
  componentName: PropTypes.string,
  fields: PropTypes.shape({}),
  tabsParams: PropTypes.shape({
    isInit: PropTypes.bool,
    setIsInit: PropTypes.func,
    setActiveTab: PropTypes.func,
  }),
  variant: PropTypes.string,
  vehicleType: PropTypes.string,
};

export default TrimSpecifications;
