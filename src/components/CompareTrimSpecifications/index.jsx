import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { UserLocationContext } from '@honda-canada/user-location';

import SpecificationsProvider from '../SpecificationsProvider';
import CompareTrims from './CompareTrims';

import { getHydratedTrims } from './util';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getIsSellingPriceProvince } from '../../utils/financeUtils';
import useProductFinancial from '../../utils/hooks/useProductFinancial';

export const CompareTrimsJSS = ({ fields, rendering, sitecoreContext, vehicleType }) => {
  const { t } = useTranslation();
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const { language, provinces } = sitecoreContext;
  const isSellingPriceProvince = getIsSellingPriceProvince(provinceCode, provinces);
  const fieldsValue = fields?.data?.value || {};

  const {
    anchorId,
    gtmTitle,
    gtmCategory,
    compareTrimsTitle,
    modelYear,
    primaryTrim,
    secondaryTrim,
    legalDisclaimer,
    paymentFrequency,
    paymentMethod,
    showInformationalApr,
  } = fieldsValue;

  const { financial, isFetching, setModels } = useProductFinancial({ vehicleType });

  useEffect(() => {
    if (modelYear?.fields?.year?.value) {
      setModels([
        {
          modelYear: modelYear.fields.year.value,
          modelKey: modelYear.fields?.model?.detKey?.value,
        },
      ]);
    }
  }, [modelYear?.fields?.year?.value, modelYear?.fields?.model?.detKey?.value]);

  if (!fields) return null;

  const strings = {
    msrpStartingFromLabel: t('Shared.Common.msrpStartingFromLabel'),
    sellingPriceLabel: t('Shared.Common.sellingPriceLabel'),
  };
  const { fields: modelYearFields } = modelYear || {};
  const { trims, defaultTrim } = modelYearFields;
  const searchParams = new URLSearchParams(
    decodeURIComponent(typeof window === 'undefined' ? '' : window.location.search),
  );
  const firstTrimId = parseInt(
    searchParams.get(language === 'fr' ? 'comparer' : 'compare') || primaryTrim?.fields?.detIdentifier?.value,
    10,
  );

  const paymentOptions = {
    paymentMethod: paymentMethod.value?.toLowerCase(),
    paymentFrequency: paymentFrequency.value?.toLowerCase() || 'weekly',
  };

  if (!financial || isFetching) return null;

  return (
    <SpecificationsProvider trims={trims?.map(trim => trim.detIdentifier?.value)}>
      {({ specifications, isFetching: isSpecificationsFetching }) => {
        if (!specifications || isSpecificationsFetching) return null;
        const hydratedTrims = getHydratedTrims(
          trims,
          modelYear,
          strings,
          isSellingPriceProvince,
          specifications,
          financial,
        );
        if (!hydratedTrims) return null;
        const firstTrim = hydratedTrims.find(trim => trim.id === firstTrimId);
        let secondTrim = hydratedTrims.find(
          trim => trim.id === parseInt(secondaryTrim?.fields?.detIdentifier?.value, 10),
        );
        // If the secondTrim is the same as the first trim, use the default trim.
        if (secondTrim?.id === firstTrim?.id) {
          secondTrim = hydratedTrims.find(trim => trim.id === parseInt(defaultTrim.fields?.detIdentifier?.value, 10));
        }

        // If the second trim is still the same as the first,
        // use the next trim in the list
        if (secondTrim?.id === firstTrim?.id) {
          const secondTrimIndex = hydratedTrims.findIndex(trim => trim.id === secondTrim.id);
          if (hydratedTrims[secondTrimIndex + 1]) {
            secondTrim = hydratedTrims[secondTrimIndex + 1];
          } else {
            // If there's no next trim, log a warning
            // eslint-disable-next-line no-console
            console.warn('No next trim to select');
          }
        }

        // If the second trim is still the same as the first, log a warning
        if (secondTrim?.id === firstTrim?.id) {
          // eslint-disable-next-line no-console
          console.warn(`We are comparing ${secondTrim.id} with ${firstTrim.id}`);
        }
        return (
          <div
            id={anchorId?.value}
            data-gtm-title={gtmTitle?.value}
            data-gtm-category={mapGTMCategory(gtmCategory)}
            data-gtm-component-type={rendering?.componentName}
          >
            <CompareTrims
              trims={hydratedTrims}
              title={compareTrimsTitle?.value}
              firstTrim={firstTrim}
              secondTrim={secondTrim}
              legalDisclaimer={legalDisclaimer?.value}
              paymentOptions={paymentOptions}
              showInformationalApr={showInformationalApr?.value === '1'}
              financial={financial}
              provinces={provinces}
              gtmModelName={modelYear?.fields.model.name}
            />
          </div>
        );
      }}
    </SpecificationsProvider>
  );
};

export default withSitecoreContext()(CompareTrimsJSS);
