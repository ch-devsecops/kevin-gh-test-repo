import React, { useEffect, useContext } from 'react';
import { Box, Wrapper, Copy, Media, Fade, Image, H5, Icon, Optional } from '@honda-canada/design-system-react';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import { compiler } from 'markdown-to-jsx';

import { ModelExplorationContext } from '../../ModelExplorationContext';
import LocalStorageContext from '../../LocalStorageContext/LocalStorageContext';
import PriceComponent from '../../PriceComponent';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, PSP_SITE_NAME } from '../../../utils/constants';
import { useAppName } from '../../../utils/sitecoreContext';

import themeStyles from './PackageSelector.styles';
import Context from '../service/Context';

const StyledIcon = themeStyles.apply(Icon, 'StyledIcon');
const ListContainer = themeStyles.apply(Box, 'ListBox');
const ToggleTitleContent = themeStyles.apply(Box, 'ToggleTitleContent');
const TogglePriceContainer = themeStyles.apply(Box, 'TogglePriceContainer');
const PriceContainer = themeStyles.apply(Box, 'PriceContainer');
const ToggleContainer = themeStyles.apply(Box, 'ToggleContainer');
const ToggleWrapperBox = themeStyles.apply(Wrapper, 'ToggleWrapperBox');
const ToggleContent = themeStyles.apply(Box, 'ToggleContent');
const ToggleButton = themeStyles.apply(Box, 'ToggleButton');
const ToggleLabel = themeStyles.apply(Copy, 'ToggleLabel');

// overriding the container styles
const priceComponentStyles = {
  errorStyles: {
    container: {
      alignItems: 'center !important',
    },
  },
};

// hide unwanted DOM elements when open
const toggleDomElements = (isOpen, siteName) => {
  if (typeof document === 'undefined') return;

  const display = isOpen ? 'none' : 'block';

  let footerElement;

  switch (siteName) {
    case ACURA_SITE_NAME:
      footerElement = document.getElementById('footer');
      break;
    case HONDA_SITE_NAME:
      footerElement = document.querySelector('footer.honda-footer');
      break;
    case PSP_SITE_NAME:
      footerElement = document.querySelector('.disclaimer');
      break;
    default:
      return null;
  }

  if (footerElement) footerElement.style.display = display;

  const trimDetailsEl = typeof document !== 'undefined' && document.getElementById('mobile-trim-details');
  if (trimDetailsEl) trimDetailsEl.style.display = display;
};

const ToggleWrapper = ({ children, enabled, hasError, height, isFetching, isOpen, selectedTrim, setIsOpen }) => {
  const { t } = useTranslation();
  const appName = useAppName();
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { selectTrimDropDownLabel } = useContext(Context) || {};
  const { toCompareProducts } = useContext(LocalStorageContext);
  const { setIsTrimSelectorOpen, isDark } = modelExplorationContext;

  // by returning this function, we ensure DOM elements are made visible on unmount
  useEffect(() => () => toggleDomElements(false, appName), []);

  useEffect(() => {
    if (setIsTrimSelectorOpen) setIsTrimSelectorOpen(isOpen);
    toggleDomElements(isOpen, appName);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [isOpen, setIsTrimSelectorOpen, appName]);

  const handleToggle = () => {
    if (selectedTrim && isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const Title = selectedTrim?.nameBadge?.src ? (
    <ToggleTitleContent>
      <Image {...selectedTrim.nameBadge} />
    </ToggleTitleContent>
  ) : (
    selectedTrim && <H5 color={isDark ? 'white' : undefined}>{compiler(selectedTrim.name)}</H5>
  );

  const PricingContainer = selectedTrim ? (
    <PriceContainer>
      <PriceComponent
        prices={{
          allInPrice: {
            value: selectedTrim.pricing?.sellingPrice,
            label: t('Shared.Common.sellingPriceLabel'),
          },
          msrpPrice: {
            value: selectedTrim.pricing?.msrp,
            label: t('Shared.Common.msrpStartingFromLabel'),
          },
          discount: selectedTrim.pricing?.discount,
        }}
        allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
        errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
        hasError={hasError}
        height={['auto', 'auto', undefined]}
        horizontalAlignment="right"
        isFetching={isFetching}
        msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
        suppressDiscount
        priceComponentStyles={priceComponentStyles}
      />
    </PriceContainer>
  ) : null;

  const mobileWrapperHeight = selectedTrim ? '100px' : '45px';

  return (
    <>
      <Optional when={enabled}>
        <ToggleContainer isDark={isDark}>
          <ToggleWrapperBox as="header" mobileWrapperHeight={mobileWrapperHeight}>
            <ToggleContent>
              <ToggleButton
                as="button"
                aria-haspopup="listbox"
                aria-label={selectTrimDropDownLabel}
                aria-expanded={isOpen}
                id="selectTrim"
                data-testid="selectTrim"
                isDark={isDark}
                onClick={handleToggle}
                onKeyDown={keypressCallback(keyCodes.ENTER, () => {
                  handleToggle();
                })}
              >
                <ToggleLabel>{selectTrimDropDownLabel}</ToggleLabel>
                <StyledIcon name="arrowDown" isExpanded={isOpen} isDark={isDark} />
              </ToggleButton>
              <Media greaterThanOrEqual="desktop">
                <Box>{selectedTrim && <Fade duration="t4">{Title}</Fade>}</Box>
              </Media>

              <TogglePriceContainer>{PricingContainer}</TogglePriceContainer>
            </ToggleContent>

            <Media lessThan="desktop">
              <Optional when={selectedTrim}>
                <Fade duration="t4" height="100%" mt="m" display="flex" justifyContent="center">
                  {Title}
                </Fade>
              </Optional>
            </Media>
          </ToggleWrapperBox>
        </ToggleContainer>
      </Optional>
      <ListContainer
        data-testid="list"
        role="list"
        isOpen={isOpen}
        height={height}
        hasCompareProducts={toCompareProducts?.length}
        aria-labelledby="selectTrim"
      >
        {children({ isOpen, setIsOpen })}
      </ListContainer>
    </>
  );
};

export default ToggleWrapper;
