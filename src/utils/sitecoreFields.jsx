import React from 'react';
import { H1, H2, H3, H4, H5, H6, Image } from '@honda-canada/design-system-react';
import camelCase from 'lodash/camelCase';
import uniqueId from 'lodash/uniqueId';
import CTA from '../components/CTA';
import { getGtmTagValue } from './gtmEvents';
import { CTA_INTERACTION_TYPE_DOWNLOAD } from './constants';

const shouldCtaComponentRender = component =>
  !!component.props?.linkField?.value?.href && !!component.props?.typeField?.value;

/**
 * Provides an array of CTA components for a JSS component.
 * @param ctaLink
 * @param modelName
 * @param trimName
 * @param bodyStyle
 * @param title
 * @param interactionType
 * @param componentType
 * @param downloadLink
 * @returns An array of CTA components
 */

const buildGtmTags = (ctaLink, modelName, trimName, bodyStyle, title, interactionType, componentType, downloadLink) => {
  let gtmTags = {};
  const isDownloadLink = interactionType === CTA_INTERACTION_TYPE_DOWNLOAD;

  if (downloadLink) {
    gtmTags = { src: isDownloadLink && downloadLink };
  }

  if (ctaLink) {
    gtmTags = {
      'aria-label': ctaLink,
    };
  }

  if (modelName) {
    gtmTags = {
      'data-gtm-model': modelName,
      ...gtmTags,
    };
  }

  if (trimName) {
    gtmTags = {
      'data-gtm-trim': trimName,
      ...gtmTags,
    };
  }
  if (bodyStyle) {
    gtmTags = {
      'data-gtm-body-style': bodyStyle,
      ...gtmTags,
    };
  }
  if (title) {
    gtmTags = {
      'data-gtm-title': title,
      ...gtmTags,
    };
  }
  if (interactionType) {
    gtmTags = {
      'data-gtm-interaction-type': interactionType,
      ...gtmTags,
    };
  }
  if (componentType) {
    gtmTags = {
      'data-gtm-component-type': componentType,
      ...gtmTags,
    };
  }
  return gtmTags;
};

export const mapJssFieldsToCtaComponents = (fields, gtmTitle, componentType = undefined) => {
  if (!fields || !fields?.ctaLink1) return [];
  const {
    ctaLink1,
    ctaType1,
    ctaIcon1,
    gtmModelName1,
    gtmTrimName1,
    gtmBodyStyle1,
    gtmTitle1,
    gtmInteractionType1,
    ctaLink2,
    ctaType2,
    ctaIcon2,
    gtmModelName2,
    gtmTrimName2,
    gtmBodyStyle2,
    gtmTitle2,
    gtmInteractionType2,
    ctaLink3,
    ctaType3,
    ctaIcon3,
    gtmModelName3,
    gtmTrimName3,
    gtmBodyStyle3,
    gtmTitle3,
    gtmInteractionType3,
  } = fields;

  const ctas = [
    {
      linkField: ctaLink1,
      typeField: ctaType1,
      iconField: ctaIcon1,
      gtmTags: buildGtmTags(
        ctaLink1?.value?.title,
        gtmModelName1?.value,
        gtmTrimName1?.value,
        gtmBodyStyle1?.value,
        gtmTitle1?.value ? gtmTitle1?.value : gtmTitle,
        gtmInteractionType1?.value,
        componentType,
        ctaLink1?.value?.href,
      ),
    },
    {
      linkField: ctaLink2,
      typeField: ctaType2,
      iconField: ctaIcon2,
      gtmTags: buildGtmTags(
        ctaLink2?.value?.title,
        gtmModelName2?.value,
        gtmTrimName2?.value,
        gtmBodyStyle2?.value,
        gtmTitle2?.value ? gtmTitle2?.value : gtmTitle,
        gtmInteractionType2?.value,
        componentType,
        ctaLink2?.value?.href,
      ),
    },
    {
      linkField: ctaLink3,
      typeField: ctaType3,
      iconField: ctaIcon3,
      gtmTags: buildGtmTags(
        ctaLink3?.value?.title,
        gtmModelName3?.value,
        gtmTrimName3?.value,
        gtmBodyStyle3?.value,
        gtmTitle3?.value ? gtmTitle3?.value : gtmTitle,
        gtmInteractionType3?.value,
        componentType,
        ctaLink3?.value?.href,
      ),
    },
  ]
    .map(cta => <CTA key={uniqueId()} {...cta} data-gtm-title={getGtmTagValue(gtmTitle)} />)
    .filter(shouldCtaComponentRender);
  return ctas;
};

export const mapFieldToDesignSystemImage = (field, disableObjectFit, style) => {
  if (!field?.value?.src) {
    return undefined;
  }

  // TODO: check EE for edit support
  return (
    <Image
      src={field.value.src}
      alt={field.value.alt}
      disableObjectFit={disableObjectFit}
      height={field.value.height}
      width={field.value.width}
      style={style}
    />
  );
};

export const headingMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};

export const getVideoProps = (src, ariaLabel, closeAriaLabel, buttonLabel) => {
  if (!src) {
    return undefined;
  }

  return {
    src,
    ariaLabel,
    closeAriaLabel,
    buttonLabel,
  };
};

export const colourTokenForParam = {
  white: 'white',
  grey: 'grey.5',
  blue: 'blue',
  'dark blue': 'darkBlue',
  black: 'black',
  'honda black': '#000000',
  red: 'red',
};

export const foregroundColourTokenForParam = {
  white: 'black',
  grey: 'black',
  blue: 'white',
  'dark blue': 'white',
  red: 'white',
  black: 'white',
  'honda black': 'white',
};

export const chevronColourTokenForParam = {
  white: 'grey.0',
  grey: 'grey.0',
  blue: 'white',
  'dark blue': 'white',
  red: 'white',
  black: 'white',
  'honda black': 'white',
};

export const getCtaTypeFromBgColor = (bgColor, ctaType) => {
  const acuraDarkBgColors = ['blue', 'dark blue'];
  const otherDarkBgColors = ['black', 'red', 'honda black'];

  if (acuraDarkBgColors.includes(bgColor)) {
    if (ctaType?.toLowerCase() === 'tertiary') return 'tertiaryWhite';

    return 'secondaryDark';
  }

  if (otherDarkBgColors.includes(bgColor)) {
    if (ctaType?.toLowerCase() === 'tertiary') return 'tertiaryWhite';

    return ctaType?.toLowerCase() === 'primary' ? 'primaryDark' : 'secondaryDark';
  }

  return ctaType && camelCase(ctaType);
};

export const mapGTMCategory = field => {
  const value = field?.value || field?.fields?.value?.value;

  if (!value) {
    return 'Others';
  }

  return value;
};

export const getIsDarkMode = route => route?.fields?.isDarkMode?.value || false;
