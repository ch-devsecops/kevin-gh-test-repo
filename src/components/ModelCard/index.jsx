import React, { useContext } from 'react';
import { Box, Image, Wrapper, Row, Column, Slide, Fade, useMediaQueries } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { UserLocationContext } from '@honda-canada/user-location';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { InView } from 'react-intersection-observer';
import Content from './Content';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getShowPriceFlags, getPriceTooltipLabelKey } from '../../utils/financeUtils';

const containerAlignment = {
  left: ['column-reverse', 'row-reverse'],
  right: ['column-reverse', 'row'],
};

const imageAlignment = {
  right: ['0', '32%'],
  left: ['0', '12px'],
};

const contentContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
};

const ModelCardJSS = ({ fields, params, rendering, sitecoreContext }) => {
  const { language, settings } = sitecoreContext;
  const defaultProvince = settings?.defaultProvince;
  const { isMobile } = useMediaQueries();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;
  const { provinces } = sitecoreContext;
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(provinceCode, provinces);
  const { t } = useTranslation();

  if (!fields || !fields?.data || !fields?.data?.value) {
    return null;
  }
  const {
    trim,
    isSpecialTrimAvailable,
    modelImage,
    modelNameBadge,
    ctaLink1,
    ctaType1,
    ctaLink2,
    ctaType2,
    specialPriceLabel,
    specialPriceModel,
    gtmTitle,
    gtmCategory,
  } = fields?.data?.value || {};

  if (!trim || !trim.fields) {
    return null;
  }

  const { defaultTransmission, modelYear } = trim?.fields || {};
  const model = {
    modelKey: trim?.fields?.model?.fields?.detKey?.value,
    modelYear: modelYear?.year?.value,
    nameBadge: modelNameBadge?.item?.value,
    gtmName: trim?.fields?.model?.fields?.name?.toLowerCase(),
  };

  const specialTrim = modelYear?.trims?.find(trimObj => trimObj.specialVehicleType.item !== null);

  const trimObj = {
    specialTrimType: isSpecialTrimAvailable.item.value,
    tagline: modelYear.tagline.value,
    nameBadge: isSpecialTrimAvailable?.item?.value ? specialTrim?.nameBadge?.item?.value : '',
    gtmName: trim?.fields?.name?.toLowerCase(),
    bodyStyle:
      trim?.fields?.bodyType?.item
        ?.map(item => item.name)
        ?.toString()
        ?.toLowerCase() || '',
  };

  const alignment = params?.contentAlignment?.toLowerCase() || 'right';

  return (
    <Box
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      paddingTop={['20px', '20px']}
      paddingBottom={['30px', '30px']}
      bg="grey.5"
    >
      <Wrapper pb="20px" pt={[0, '20px']} px="0 !important">
        <Row>
          <InView threshold={0.35} triggerOnce>
            {({ inView, ref }) => (
              <Column
                ref={ref}
                width="100%"
                position="relative"
                alignContent="center"
                display="flex"
                alignItems="center"
                minHeight={['539px', '477px']}
                flexDirection={containerAlignment[alignment]}
              >
                <Fade shouldAnimate={inView} initialOpacity={0} delay={!isMobile ? '.25s' : ''} duration="t4">
                  <Slide
                    direction="up"
                    distance="50px"
                    shouldAnimate={inView}
                    duration="t4"
                    delay={!isMobile ? '.25s' : ''}
                    alignSelf="center"
                    width={['100%', '67%']}
                    height={['260px', '477px']}
                    position="absolute"
                    top={0}
                    right={0}
                    left={imageAlignment[alignment]}
                  >
                    <Image {...modelImage?.item?.value} />
                  </Slide>
                </Fade>

                <Fade
                  shouldAnimate={inView}
                  initialOpacity={0}
                  duration="t4"
                  px={['10px', 'zero']}
                  py="l"
                  width={['100%', '350px', '466px']}
                  height={['315px', '408px']}
                  {...contentContainerStyles}
                >
                  <Slide
                    direction="up"
                    distance="50px"
                    shouldAnimate={inView}
                    duration="t4"
                    {...contentContainerStyles}
                  >
                    <Content
                      hasSpecialTrimAvailable={isSpecialTrimAvailable.item.value}
                      trim={trimObj}
                      model={model}
                      transmission={defaultTransmission.fields}
                      modelYear={modelYear}
                      language={language}
                      buildCta={ctaLink1}
                      buildCtaType={ctaType1}
                      exploreCta={ctaLink2}
                      exploreCtaType={ctaType2}
                      specialPriceLabel={specialPriceLabel?.value}
                      specialPriceTransmission={specialPriceModel?.transmission}
                      gtmTitle={gtmTitle?.value}
                      shouldFetchFinancials={inView}
                      priceTooltipLabel={t(getPriceTooltipLabelKey(provinceCode, provinces))}
                      showMsrpPrice={showMsrpPrice}
                      showSellingPrice={showSellingPrice}
                    />
                  </Slide>
                </Fade>
              </Column>
            )}
          </InView>
        </Row>
      </Wrapper>
    </Box>
  );
};

export default withSitecoreContext()(ModelCardJSS);
