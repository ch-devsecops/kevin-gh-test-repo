import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, Copy, IconWrapper, Icon, H4, useMediaQueries } from '@honda-canada/design-system-react';
import SelectTrimDropdown from './SelectTrimDropdown';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const StyledBox = styled(Box)(({ theme }) =>
  css({
    boxShadow: 'border-box',
    '&:focus-visible': {
      border: `solid 4px ${theme.colors.aodaFocused}`,
    },
  }),
);

const CompareTrimsHeader = ({
  trims,
  title,
  firstSelectedTrim,
  setFirstSelectedTrim,
  secondSelectedTrim,
  setSecondSelectedTrim,
  currentDisplayedTrim,
  setCurrentDisplayedTrim,
  containerRef,
  paymentOptions,
  showInformationalApr,
  financial,
  hasLeftColumn = true,
  isSticky = true,
  isWide,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaQueries();

  const heading = (
    <Box maxWidth={['190px', 'none']} mb={['10px', 0]} textAlign="center">
      <H4>{title}</H4>
    </Box>
  );

  const leftColumnContent = hasLeftColumn ? (
    <Box>
      {heading}
      <StyledBox
        as="button"
        onClick={() => window.print()}
        display={['none', 'flex']}
        alignItems="center"
        mt={[0, 3]}
        padding="zero"
        border="none"
        background="transparent"
        backgroundImage="none"
      >
        <IconWrapper ml={[0, -4]} pointerEvents="none">
          <Icon name="print" title={t('Shared.CompareTrims.printComparisonLabel')} />
        </IconWrapper>
        <Copy size="backToTop">{t('Shared.CompareTrims.printComparisonLabel')}</Copy>
      </StyledBox>
    </Box>
  ) : null;

  const trimSelector = (isResized = false, areDelaysApplied = false) => (
    <SelectTrimDropdown
      trims={trims}
      firstSelectedTrim={firstSelectedTrim}
      setFirstSelectedTrim={setFirstSelectedTrim}
      secondSelectedTrim={secondSelectedTrim}
      setSecondSelectedTrim={setSecondSelectedTrim}
      currentDisplayedTrim={currentDisplayedTrim}
      setCurrentDisplayedTrim={setCurrentDisplayedTrim}
      isResized={isResized}
      areDelaysApplied={areDelaysApplied}
      containerRef={containerRef}
      paymentOptions={paymentOptions}
      showInformationalApr={showInformationalApr}
      financial={financial}
      isWide={isWide}
    />
  );

  const desktopContent = (
    <DesktopHeader leftColumn={leftColumnContent} rightColumn={trimSelector()} isSticky={isSticky} isWide={isWide} />
  );

  const mobileContent = <MobileHeader heading={heading} trimSelector={trimSelector} isSticky={isSticky} />;

  return isMobile ? mobileContent : desktopContent;
};

export default CompareTrimsHeader;
