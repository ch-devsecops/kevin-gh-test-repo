import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Box, Icon } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import css from '@styled-system/css';
import get from 'lodash/get';

import { NUMBER_OF_CARDS } from '../../CompareProductsDrawer/service/constants';
import RoutableSitecoreLink from '../../RoutableSitecoreLink';
import { BUILD_AND_PRICE_URL, BOOK_AN_APPOINTMENT_URL } from '../../../utils/constants';
import useSharedApps from '../../../utils/sitecoreContext/useSharedApps';
import {
  createQueryParam,
  getModelComparePath,
  getTestDriveStringVariables,
  getTransmissionKeyFromDefaultTransmission,
} from '../../../utils/urls';
import { useLanguage } from '../../../utils/sitecoreContext';
import { getGtmTagValue, gtmFindADealer, pushGtmCtaClickAddToCompareEvent } from '../../../utils/gtmEvents';
import LocalStorageContext from '../../LocalStorageContext/LocalStorageContext';
import Context from '../service/Context';

const IconWrapper = styled(Box)(
  css({
    svg: {
      height: '10px',
      width: '10px',
    },
  }),
);

const LabelWrapper = styled(Box)(
  css({
    display: 'flex',
    justifyContent: 'center',
  }),
);

const ButtonWrapper = styled(Box)(({ styles }) =>
  css({
    ...styles,
  }),
);

const CtaButton = styled(Button)(
  css({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 's',
    marginRight: ['zero', 's'],
    px: ['s', 'zero', 's'],
    width: ['100%', 'auto', 'auto'],
    ':hover': {
      svg: {
        path: {
          fill: 'white',
        },
      },
      'svg[data-testid="dsr-icon-mapMarker"]': {
        path: {
          fill: 'white',
        },
        circle: {
          fill: 'black',
        },
      },
    },
    // Add styles for the disabled state
    ':disabled': {
      svg: {
        path: {
          fill: 'grey.1', // Set the initial fill color when disabled
        },
        'circle, rect': {
          fill: 'grey.1', // Set the initial fill color for other shapes
        },
      },
    },
    verticalAlign: 'middle',
  }),
);

const nonLinkCtaButton = ({
  trim,
  text,
  gtm,
  styling,
  dataTestId,
  onClick,
  componentType,
  icon,
  toCompareProducts,
  selectedTransmissionKey,
}) => {
  const isDisabled =
    toCompareProducts?.length === NUMBER_OF_CARDS && !toCompareProducts.includes(selectedTransmissionKey);
  return (
    <CtaButton
      disabled={isDisabled}
      onClick={onClick}
      styling={styling}
      data-testid={dataTestId}
      gtmTags={{
        'data-gtm-model': getGtmTagValue(trim?.gtmModelName),
        'data-gtm-trim': getGtmTagValue(trim?.gtmTrimName),
        'data-gtm-body-style': getGtmTagValue(trim?.gtmBodyStyle || gtm?.gtmBodyStyle),
        'data-gtm-interaction-type': getGtmTagValue(gtm?.interactionType),
        'data-gtm-title': getGtmTagValue(gtm?.title),
        'data-gtm-component-type': getGtmTagValue(componentType),
      }}
    >
      {icon}

      {text}
    </CtaButton>
  );
};

const ctaButton = ({ trim, href, text, gtm, styling, linktype, testid, onClick, componentType, icon }) => (
  <CtaButton
    onClick={onClick}
    as={RoutableSitecoreLink}
    styling={styling}
    data-testid={testid}
    gtmTags={{
      'data-gtm-model': getGtmTagValue(trim?.gtmModelName),
      'data-gtm-trim': getGtmTagValue(trim?.gtmTrimName),
      'data-gtm-body-style': getGtmTagValue(trim?.gtmBodyStyle || gtm?.gtmBodyStyle),
      'data-gtm-interaction-type': getGtmTagValue(gtm?.interactionType),
      'data-gtm-title': getGtmTagValue(gtm?.title),
      'data-gtm-component-type': getGtmTagValue(componentType),
    }}
    field={{
      value: {
        linktype,
        href,
        text: icon ? (
          <LabelWrapper>
            {icon}
            {text}
          </LabelWrapper>
        ) : (
          text
        ),
      },
    }}
  />
);
const Ctas = ({ trim, bapUrlParams, isDark, ctaButtons, componentType, category, modelCategory }) => {
  const { toCompareProducts, setToCompareProducts, removeFromCompareProducts } = useContext(LocalStorageContext);
  const language = useLanguage();
  const { t } = useTranslation();
  const testDriveBaseUrl = useSharedApps(BOOK_AN_APPOINTMENT_URL);
  const bapBaseUrl = useSharedApps(BUILD_AND_PRICE_URL);
  const { vehicleType, buttonWrapperStyling, selectedTransmissionKeyPath, selectedTransmissionKeyUseBapUrl } =
    useContext(Context);
  const [isCompareChecked, setIsCompareChecked] = useState(false);

  const urlParams = new URLSearchParams(bapUrlParams);
  const paramsObj = Object.fromEntries(urlParams);
  const selectedTransmissionKey = selectedTransmissionKeyUseBapUrl
    ? getTransmissionKeyFromDefaultTransmission(paramsObj?.transmission_key) || get(trim, selectedTransmissionKeyPath)
    : get(trim, selectedTransmissionKeyPath);

  useEffect(() => {
    if (toCompareProducts.includes(selectedTransmissionKey)) {
      setIsCompareChecked(true);
    } else {
      setIsCompareChecked(false);
    }
  }, [toCompareProducts, bapUrlParams]);

  const onCompareTrim = () => {
    if (!toCompareProducts.includes(selectedTransmissionKey)) {
      setToCompareProducts(selectedTransmissionKey);
    } else {
      removeFromCompareProducts(selectedTransmissionKey);
    }
    setIsCompareChecked(prev => !prev);
  };

  const modelComparePath = getModelComparePath(trim?.specsPath, selectedTransmissionKey, language);

  const testDriveUrlParams = getTestDriveStringVariables(trim?.modelKey, trim?.modelYear, trim?.trimKey);

  const ctaGtmTypeMap = {
    Buildable: {
      interactionType: 'cta: build',
      title: 'trim selector',
    },

    TestDrivable: { interactionType: 'cta: book a test drive', title: 'trim selector' },
    Comparable: { interactionType: 'cta: compare trim', title: 'trim selector' },
    AddToCompare: {
      interactionType: 'cta: compare',
      title: 'added comparison item',
      'data-gtm-component-type': getGtmTagValue(componentType),
    },
    PriceFinance: { interactionType: 'cta: build', gtmBodyStyle: getGtmTagValue(vehicleType) },
    FindDealer: {
      interactionType: 'cta: dealer locator',
      title: 'find a dealer',
      'data-gtm-component-type': getGtmTagValue(componentType),
    },
  };

  const BuildableCTA = useMemo(
    () =>
      trim?.isBuildable &&
      ctaButton({
        trim,
        href: `${bapBaseUrl}${bapUrlParams}`,
        text: t('Pages.Models.Exploration.buildAndPriceButton'),
        gtm: ctaGtmTypeMap.Buildable,
        styling: trim?.isSpecialType || isDark ? 'special' : 'primary',
        linktype: 'external',
        testid: 'cy-trim-cta-build',
      }),
    [trim?.trimKey],
  );
  const TestDrivableCTA = useMemo(
    () =>
      trim?.isTestDrivable &&
      ctaButton({
        trim,
        href: `${testDriveBaseUrl}${testDriveUrlParams}`,
        text: t('Pages.Models.Exploration.bookTestDriveButton'),
        gtm: ctaGtmTypeMap.TestDrivable,
        styling: isDark ? 'secondaryDark' : 'secondary',
        linktype: 'external',
        testid: 'cy-trim-cta-test-drive',
      }),
    [trim?.trimKey],
  );
  const ComparableCTA = useMemo(
    () =>
      trim?.isComparable &&
      ctaButton({
        trim,
        href: modelComparePath,
        text: t('Pages.Models.Exploration.compareTrimButton'),
        gtm: ctaGtmTypeMap.Comparable,
        styling: isDark ? 'secondaryDark' : 'secondary',
        linktype: 'internal',
        testid: 'cy-trim-cta-compare',
      }),
    [trim?.trimKey],
  );

  const categoryQueryParam = createQueryParam('category', modelCategory);
  const modelQueryParam = createQueryParam('model', trim?.detIdentifier);
  const trimQueryParam = createQueryParam('trim', selectedTransmissionKey);
  const yearQueryParam = createQueryParam('year', paramsObj?.model_year);
  const colorQueryParam = createQueryParam('color', paramsObj?.color_key);

  const PriceFinanceCTA = useMemo(
    () =>
      !trim?.hidePriceAndFinance &&
      ctaButton({
        trim,
        href: `${t(
          'Shared.Common.priceAndFinanceUrl',
        )}?vehicleType=${vehicleType}${categoryQueryParam}${yearQueryParam}${modelQueryParam}${trimQueryParam}${colorQueryParam}`,
        text: t('Shared.Common.priceAndFinanceButton'),
        gtm: ctaGtmTypeMap.PriceFinance,
        styling: isDark ? 'tertiary' : 'primary',
        linktype: 'internal',
        testid: 'cy-trim-cta-finance',
      }),
    [trim?.trimKey, bapUrlParams],
  );

  const AddToCompareCTA = useMemo(
    () =>
      nonLinkCtaButton({
        trim,
        text: t(!isCompareChecked ? 'Shared.Common.addToCompareButton' : 'Shared.Common.removeFromCompareButton'),
        gtm: ctaGtmTypeMap.AddToCompare,
        styling: isDark ? 'secondaryDark' : 'secondary',
        dataTestId: 'cy-trim-cta-compare',
        onClick: () => {
          onCompareTrim();
          pushGtmCtaClickAddToCompareEvent(category, trim?.modelName);
        },
        componentType,
        icon: (
          <IconWrapper>
            <Icon
              mr="s"
              name={!isCompareChecked ? 'plus' : 'close'}
              iconSize="small"
              iconColor="black"
              testId={`dsr-icon-${!isCompareChecked ? 'plus' : 'remove'}`}
            />
          </IconWrapper>
        ),
        toCompareProducts,
        selectedTransmissionKey,
      }),
    [trim?.trimKey, isCompareChecked, bapUrlParams, toCompareProducts],
  );

  const FindDealerCTA = useMemo(
    () =>
      ctaButton({
        trim,
        href: t('Shared.Common.dealersPageUrl'),
        text: t('Shared.Common.findDealerButton'),
        gtm: ctaGtmTypeMap.FindDealer,
        styling: isDark ? 'secondaryDark' : 'secondary',
        linktype: 'internal',
        testid: 'cy-trim-cta-dealer',
        onClick: () => gtmFindADealer(componentType, trim?.modelName, category),
        componentType,
        icon: <Icon mr="s" name="mapMarker" iconSize="small" iconColor="black" testId="dsr-icon-mapMarker" />,
      }),
    [trim?.trimKey],
  );

  const ctaMap = {
    Buildable: BuildableCTA,
    TestDrivable: TestDrivableCTA,
    Comparable: ComparableCTA,
    AddToCompare: AddToCompareCTA,
    PriceFinance: PriceFinanceCTA,
    FindDealer: FindDealerCTA,
  };

  return <ButtonWrapper styles={{ ...buttonWrapperStyling }}>{ctaButtons.map(key => ctaMap?.[key])}</ButtonWrapper>;
};

export default Ctas;
