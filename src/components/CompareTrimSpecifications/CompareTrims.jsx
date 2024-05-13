import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Box, Media } from '@honda-canada/design-system-react';
import { UserLocationContext } from '@honda-canada/user-location';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import SpecsAccordion from './SpecsAccordion';
import CompareTrimsHeader from './CompareTrimsHeader';
import CompareTrimsMobileFooter from './CompareTrimsMobileFooter';
import LegalDisclaimer from './LegalDisclaimer';
import PrintComparison from './PrintComparison';
import HondaCssOverride from '../../utils/HondaCssOverride';
import { HONDA_SITE_NAME } from '../../utils/constants';
import { getIsSellingPriceProvince } from '../../utils/financeUtils';

const Screen = styled.div`
  @media not screen {
    display: none;
  }
`;

const Print = styled.div`
  @media not print {
    display: none;
  }
`;

const CompareTrims = ({
  trims,
  title,
  firstTrim,
  secondTrim,
  legalDisclaimer,
  paymentOptions,
  showInformationalApr,
  financial,
  provinces,
  sitecoreContext,
  gtmModelName,
}) => {
  const containerRef = useRef(null);
  const [firstSelectedTrim, setFirstSelectedTrim] = useState(firstTrim);
  const [secondSelectedTrim, setSecondSelectedTrim] = useState(secondTrim);
  const [currentDisplayedTrim, setCurrentDisplayedTrim] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const defaultProvince = sitecoreContext?.settings?.defaultProvince;
  const showLegalDisclaimer = !getIsSellingPriceProvince(provinceCode || defaultProvince, provinces);

  const appName = sitecoreContext?.site?.name;

  useEffect(() => {
    if (trims.length) {
      setCurrentDisplayedTrim(0);
    }
  }, [trims]);

  if (!trims.length) {
    return null;
  }
  const gtmTags = {
    trim: `${firstSelectedTrim.gtmName}; ${secondSelectedTrim.gtmName}`,
    model: gtmModelName,
    bodyStyle: firstSelectedTrim.bodyStyle,
    interactionType: 'specifications > learn more',
  };

  return (
    <>
      <Screen>
        <Box display="flex" flexDirection="column" minHeight="auto" ref={containerRef}>
          {appName === HONDA_SITE_NAME && <HondaCssOverride />}
          <CompareTrimsHeader
            title={title}
            trims={trims}
            firstSelectedTrim={firstSelectedTrim}
            setFirstSelectedTrim={setFirstSelectedTrim}
            secondSelectedTrim={secondSelectedTrim}
            setSecondSelectedTrim={setSecondSelectedTrim}
            currentDisplayedTrim={currentDisplayedTrim}
            setCurrentDisplayedTrim={setCurrentDisplayedTrim}
            containerRef={containerRef}
            paymentOptions={paymentOptions}
            showInformationalApr={showInformationalApr}
            financial={financial}
          />
          <Box flex="1 0 auto" width="100%">
            {firstSelectedTrim && setSecondSelectedTrim && (
              <SpecsAccordion
                firstTrim={firstSelectedTrim}
                secondTrim={secondSelectedTrim}
                currentItem={currentDisplayedTrim}
                updateCurrentItem={setCurrentDisplayedTrim}
                gtmTags={gtmTags}
                legalDisclaimer={legalDisclaimer}
              />
            )}
            <InView
              onChange={inView => {
                setIsFooterVisible(inView);
              }}
            >
              {showLegalDisclaimer && <LegalDisclaimer>{legalDisclaimer}</LegalDisclaimer>}
            </InView>
          </Box>
        </Box>
        <Media lessThan="desktop">
          <CompareTrimsMobileFooter
            currentDisplayedTrim={currentDisplayedTrim}
            onTrimSelect={setCurrentDisplayedTrim}
            firstSelectedTrim={firstSelectedTrim}
            secondSelectedTrim={secondSelectedTrim}
            isVisible={isFooterVisible}
          />
        </Media>
      </Screen>
      <Print>
        <PrintComparison
          firstTrim={firstSelectedTrim}
          secondTrim={secondSelectedTrim}
          legalDisclaimer={legalDisclaimer}
        />
      </Print>
    </>
  );
};

const trimProps = {
  id: PropTypes.number,
  isBuildable: PropTypes.bool,
  name: PropTypes.string,
  primaryThumbnail: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

CompareTrims.propTypes = {
  trims: PropTypes.arrayOf(PropTypes.shape(trimProps)),
  title: PropTypes.string,
  firstTrim: PropTypes.shape(trimProps),
  secondTrim: PropTypes.shape(trimProps),
  legalDisclaimer: PropTypes.string,
};

export default withSitecoreContext()(CompareTrims);
