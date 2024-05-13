import React, { useEffect, useRef, useContext } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import find from 'lodash/find';
import { useTranslation } from 'react-i18next';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { UserLocationContext } from '@honda-canada/user-location';
import { Box, Label, DetachedDropdown, Button, useMediaQueries, Fade } from '@honda-canada/design-system-react';
import TrimImage from './TrimImage';
import SelectTrimOption from './SelectTrimDropdownOption';
import BuildTrimSection from './BuildTrimSection';
import { getBapQueryStringVariables } from '../../../utils/urls';
import { BUILD_AND_PRICE_URL } from '../../../utils/constants';
import useSharedApps from '../../../utils/sitecoreContext/useSharedApps';

const SelectTrimDropdown = ({
  trims,
  firstSelectedTrim,
  setFirstSelectedTrim,
  secondSelectedTrim,
  setSecondSelectedTrim,
  currentDisplayedTrim,
  setCurrentDisplayedTrim,
  isResized,
  areDelaysApplied,
  containerRef,
  paymentOptions,
  financial,
  showInformationalApr,
  isWide,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaQueries();
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const mobileSliderRef = useRef();
  const handleChange = (id, applyChange) => {
    const result = find(trims, { id });
    applyChange(result);
  };
  useEffect(() => {
    if (!mobileSliderRef.current) return undefined;
    mobileSliderRef.current.splide.go(currentDisplayedTrim);

    return () => {};
  }, [currentDisplayedTrim]);

  const bapPathUrl = useSharedApps(BUILD_AND_PRICE_URL);

  const trimOptions = trims.map(trim => ({
    value: trim.id,
    text: (
      <SelectTrimOption
        trim={trim}
        financial={financial}
        paymentOptions={paymentOptions}
        provinceCode={provinceCode}
        showInformationalApr={showInformationalApr}
      />
    ),
  }));

  const renderBuildButton = trim => {
    const button = trim?.isBuildable ? (
      <Button
        as="a"
        styling="secondary"
        aria-label={t('Shared.CompareTrims.buildThisTrimAriaLabel', { trimName: trim.name })}
        href={`${bapPathUrl}${getBapQueryStringVariables(
          trim.modelKey,
          trim.modelYear,
          trim.trimKey,
          trim.transmissionKey,
        )}`}
      >
        {t('Shared.CompareTrims.buildThisTrimLabel')}
      </Button>
    ) : (
      <Box height="45px" />
    );

    if (isMobile) {
      return (
        <BuildTrimSection isResized={isResized} areDelaysApplied={areDelaysApplied}>
          {button}
        </BuildTrimSection>
      );
    }

    return button;
  };

  const renderDropdown = (name, trim, onChange, isActive) => (
    <>
      <Fade
        as={Box}
        width="100%"
        px={['20px', 0]}
        position="relative"
        initialOpacity={isActive ? 1 : 0}
        shouldAnimate={isActive}
        duration="0.1s"
        mb={['s', 'm']}
      >
        <Label mb="2px" htmlFor={name}>
          {t('Shared.CompareTrims.selectTrimLabel')}
        </Label>
        <DetachedDropdown
          defaultValue={trim?.id}
          expandedOptionsClassName="expanded"
          name={name}
          height="58px"
          optionsContainer={containerRef}
          styling="secondary"
          ariaLabel={t('Shared.Common.selectTrimDropdownMenuAria')}
          options={trimOptions}
          onChange={id => handleChange(id, onChange)}
        />
      </Fade>
      <Box
        width="100%"
        px={[0, '50px']}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink="1"
        flexGrow="1"
        minHeight="0"
        position="relative"
      >
        <TrimImage trim={trim} isMobile={isMobile} areDelaysApplied={areDelaysApplied} />
      </Box>

      {renderBuildButton(trim)}
    </>
  );

  const renderDesktop = (
    <>
      <Box
        width={1 / 2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        pr={isWide ? 'default' : 's'}
        pl={isWide && 's'}
      >
        {renderDropdown('firstTrimList', firstSelectedTrim, setFirstSelectedTrim, true)}
      </Box>
      <Box
        width={1 / 2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        pl={isWide ? 'default' : 's'}
        pr={isWide && 's'}
      >
        {renderDropdown('secondTrimList', secondSelectedTrim, setSecondSelectedTrim, true)}
      </Box>
    </>
  );

  const renderMobile = (
    <Box mb={6}>
      <Splide
        options={{
          pagination: false,
          arrows: false,
          autoWidth: true,
          trimSpace: false,
          padding: {
            left: '9vw',
            right: '9vw',
          },
        }}
        ref={mobileSliderRef}
        onMove={(_, slideIndex) => {
          setCurrentDisplayedTrim(slideIndex);
        }}
      >
        <SplideSlide>
          <Box display="flex" flexDirection="column" alignItems="center" height="320px" width="82vw">
            {renderDropdown('firstTrimList', firstSelectedTrim, setFirstSelectedTrim, currentDisplayedTrim === 0)}
          </Box>
        </SplideSlide>
        <SplideSlide>
          <Box display="flex" flexDirection="column" alignItems="center" height="320px" width="82vw">
            {renderDropdown('secondTrimList', secondSelectedTrim, setSecondSelectedTrim, currentDisplayedTrim === 1)}
          </Box>
        </SplideSlide>
      </Splide>
    </Box>
  );

  return isMobile ? renderMobile : renderDesktop;
};

export default withSitecoreContext()(SelectTrimDropdown);
