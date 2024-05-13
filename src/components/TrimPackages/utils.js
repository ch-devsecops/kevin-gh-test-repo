import { useContext } from 'react';
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-react';
import { flatten, isEmpty } from 'lodash';
import { ACURA_SITE_NAME } from '../../utils/constants';

/**
 * Maps the fields data for PSP Trimpackages to use a similar object shape for defaultTransmissions.
 *
 * @param {Object} fields - The fields data.
 * @returns {Object} - The fields data with mapped trim packages.
 */
/* eslint-disable no-param-reassign */
export const mapPSPFields = fields => {
  if (!fields?.data?.value || isEmpty(fields?.data?.value)) {
    return {};
  }
  // TODO: Cleanup with a proper mapper
  const mappedTrims = flatten(
    fields?.data?.value.modelYear?.fields?.models?.map(model =>
      flatten(
        model?.trims?.map(trim => {
          trim.defaultTransmission.item = trim.defaultTransmission;
          trim.model = model;
          return trim;
        }),
      ),
    ),
  );

  fields.data.value.modelYear.fields.models.trims = mappedTrims;

  return fields;
};

/**
 * custom hook returns heading font-family for acura and bold font-family otherwise.
 * @returns {string}
 */
export const useAcuraHeadingFontFamily = () => {
  const sitecoreContext = useContext(SitecoreContextReactContext);
  const { context: { site: { name: appName } = {} } = {} } = sitecoreContext || {};
  const isAcuraSite = appName === ACURA_SITE_NAME;
  return isAcuraSite ? 'heading' : 'bold';
};

/**
 * Replace serializeQuery params with new param
 * @param {*} searchParams current search params
 * @param {*} newParam new param to replace
 * @param {*} asString return as string or object
 * @returns
 */
export const serializeFormQuery = (searchParams, newParam, asString = true) => {
  let data = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const pair of searchParams.entries()) {
    data[pair[0]] = pair[1];
  }
  if (newParam) {
    data = { ...data, ...newParam };
  }
  if (asString) {
    return new URLSearchParams(data).toString();
  }
  return data;
};
