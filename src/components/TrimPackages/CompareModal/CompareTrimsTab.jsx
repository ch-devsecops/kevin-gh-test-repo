import React, { useState, useRef, useContext } from 'react';
import {
  Box,
  Wrapper,
  Row,
  Column,
  H6,
  Copy,
  SwipeContainer,
  useMediaQueries,
  Link,
  Optional,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { UserLocationContext } from '@honda-canada/user-location';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import CompareTrimsHeader from '../../CompareTrimSpecifications/CompareTrimsHeader';
import CompareTrimsMobileFooter from '../../CompareTrimSpecifications/CompareTrimsMobileFooter';
import TrimFeaturesProvider from '../../TrimFeaturesProvider';
import TrimFeaturesList from './TrimFeaturesList';
import { styledCompiler } from '../../../utils/markdown';
import { getIsSellingPriceProvince } from '../../../utils/financeUtils';
import Context from '../service/Context';

import themeStyles from './CompareModal.styles';

const CompareTabContainer = themeStyles.apply(Box, 'CompareTabContainer');
const CompareTabWrapper = themeStyles.apply(Wrapper, 'CompareTabWrapper');
const CompareTabTitleWrapper = themeStyles.apply(Box, 'CompareTabTitleWrapper');
const CompareTabDisclaimerWrapper = themeStyles.apply(Box, 'CompareTabDisclaimerWrapper');
const CompareTabBox = themeStyles.apply(Box, 'CompareTabBox');

const CompareTrimsTab = ({ trims, selectedTrim, financial, sitecoreContext, showInformationalApr }) => {
  const { paymentOptions } = useContext(Context);

  // first trim is the selected trim, or the first trim if none selected
  const firstTrimIndex = selectedTrim ? trims.findIndex(trim => trim.trimKey === selectedTrim?.trimKey) : 0;
  // second trim is the next trim after the selected trim, or the first trim
  const nextTrim = trims[firstTrimIndex + 1] || trims[0];

  const [firstTrim, setFirstTrim] = useState(selectedTrim || trims[0]);
  const [secondTrim, setSecondTrim] = useState(nextTrim);
  const [currentDisplayedTrim, setCurrentDisplayedTrim] = useState(0);
  const containerRef = useRef(null);
  const { t } = useTranslation();
  // CompareTrimsHeader uses useMediaQueries instead of Media, so we follow suit
  const { isMobile } = useMediaQueries();
  const { provinces, settings } = sitecoreContext;
  const defaultProvince = settings?.defaultProvince;
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const showLegalDisclaimer = !getIsSellingPriceProvince(provinceCode || defaultProvince, provinces);

  const linkOverrides = {
    button: {
      component: Link,
      props: {
        color: 'primary',
        fontSize: 'inherit',
        borderBottomColor: 'primary',
        borderBottom: '1px solid !important',
      },
    },
  };

  return (
    <CompareTabContainer ref={containerRef}>
      <CompareTrimsHeader
        trims={trims.map(trim => ({
          ...trim,
          exteriorColorKey: trim?.defaultExteriorColorKey,
          id: trim.detIdentifier,
          transmissionKey: trim.transmissionModelCode,
        }))}
        firstSelectedTrim={{
          ...firstTrim,
          primaryThumbnail: firstTrim?.image,
          id: firstTrim.detIdentifier,
          exteriorColorKey: firstTrim?.defaultExteriorColorKey,
          transmissionKey: firstTrim.transmissionModelCode,
        }}
        setFirstSelectedTrim={setFirstTrim}
        secondSelectedTrim={{
          ...secondTrim,
          primaryThumbnail: secondTrim?.image,
          id: secondTrim.detIdentifier,
          exteriorColorKey: secondTrim?.defaultExteriorColorKey,
          transmissionKey: secondTrim.transmissionModelCode,
        }}
        setSecondSelectedTrim={setSecondTrim}
        containerRef={containerRef}
        currentDisplayedTrim={currentDisplayedTrim}
        financial={financial}
        hasLeftColumn={false}
        isSticky={false}
        isWide
        paymentOptions={paymentOptions}
        setCurrentDisplayedTrim={setCurrentDisplayedTrim}
        showInformationalApr={showInformationalApr}
      />
      <TrimFeaturesProvider trims={[firstTrim.detIdentifier, secondTrim.detIdentifier]}>
        {({ features }) =>
          features ? (
            <CompareTabWrapper gutters={[false, true]}>
              <CompareTabTitleWrapper>
                <H6>{t('Shared.CompareTrims.keyFeaturesLabel')}</H6>
              </CompareTabTitleWrapper>
              {isMobile ? (
                <>
                  <SwipeContainer currentItem={currentDisplayedTrim} updateCurrentItem={setCurrentDisplayedTrim}>
                    <CompareTabBox>
                      <TrimFeaturesList allFeatures={features} trim={firstTrim.detIdentifier} />
                    </CompareTabBox>
                    <CompareTabBox>
                      <TrimFeaturesList allFeatures={features} trim={secondTrim.detIdentifier} />
                    </CompareTabBox>
                  </SwipeContainer>
                  <CompareTrimsMobileFooter
                    currentDisplayedTrim={currentDisplayedTrim}
                    onTrimSelect={setCurrentDisplayedTrim}
                    firstSelectedTrim={firstTrim}
                    secondSelectedTrim={secondTrim}
                  />
                </>
              ) : (
                <Row justifyContent="center">
                  <Column width={[1, 1 / 2]}>
                    <TrimFeaturesList allFeatures={features} trim={firstTrim.detIdentifier} />
                  </Column>
                  <Column width={[1, 1 / 2]}>
                    <TrimFeaturesList allFeatures={features} trim={secondTrim.detIdentifier} />
                  </Column>
                </Row>
              )}
              <CompareTabDisclaimerWrapper>
                <Copy size="legal">
                  <Optional when={showLegalDisclaimer}>
                    {styledCompiler(t('Pages.Models.Exploration.trimWalkCompareTrimsLegalText'), linkOverrides)}
                  </Optional>
                </Copy>
              </CompareTabDisclaimerWrapper>
            </CompareTabWrapper>
          ) : null
        }
      </TrimFeaturesProvider>
    </CompareTabContainer>
  );
};

export default withSitecoreContext()(CompareTrimsTab);
