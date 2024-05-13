import React, { useState, useEffect, useContext } from 'react';
import { Box, Column, Fade, H5, Media, Row, Wrapper, Image, Optional } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';

import Carousel from './Carousel';
import Colours from './Colours';
import Ctas from './Ctas';
import FilterBar from './FilterBar';
import Offers from './Offers';
import Pricing from './Pricing';
import Features from './Features';
import Payment from './Payment';
import Fees from './Fees';
import { getBapQueryStringVariables } from '../../../utils/urls';
import { ErrorStatus } from '../service/constants';
import { useConfiguration } from '../service/utils';
import Context from '../service/Context';
import { ModelExplorationContext } from '../../ModelExplorationContext';
import { useAppName, useLanguage } from '../../../utils/sitecoreContext';
import themeStyles from './Details.styles';

const PaymentAndFeesWrapper = themeStyles.apply(Box, 'PaymentAndFeesWrapper');

const getIsInteriorColorValid = (interiorKey, exteriorKey, exteriorColors) => {
  const selectedExteriorColorObject = exteriorColors.find(c => c.color.item?.fields?.detKey?.value === exteriorKey);
  const validInteriorColorKeys = selectedExteriorColorObject?.interiorColors.items.map(
    c => c.color.item?.fields?.detKey?.value,
  );

  return validInteriorColorKeys?.includes(interiorKey);
};

const getDefaultInteriorColor = (exteriorKey, exteriorColors) => {
  const exteriorColor = exteriorColors[0]?.colors.find(c => c.color.item?.fields?.detKey?.value === exteriorKey);

  const defaultInteriorColor = exteriorColor?.defaultInteriorColor?.item?.fields?.color;

  return defaultInteriorColor?.fields?.detKey?.value;
};

const Details = ({
  category,
  componentType,
  featuresPath,
  hasError,
  isFetching,
  isPackageSelectorOpen,
  isSellingPriceProvince,
  selectedExteriorColor,
  setSelectedExteriorColor,
  showInformationalApr,
  showTrimName = false,
  trim,
  modelCategory,
}) => {
  const appName = useAppName();
  const language = useLanguage();
  const { variant, vehicleType, paymentOptions } = useContext(Context);
  const { selectedTransmission, setSelectedTransmission, bapUrlParams, setBapUrlParams, isDark } =
    useContext(ModelExplorationContext) || {};

  const {
    defaultInteriorColorKey,
    defaultExteriorColorKey,
    defaultTransmission,
    trimKey,
    modelKey,
    modelYear,
    transmissionModelCode,
  } = trim;

  const [selectedAssetType, setSelectedAssetType] = useState('exterior');
  const [selectedAssetCategory, setSelectedAssetCategory] = useState('studio');
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(defaultInteriorColorKey);
  const [showInteriorError, setShowInteriorError] = useState(ErrorStatus.FALSE);

  const { hasInteriorColors, exteriorColorLabel, showMobilePayment, showFeesLabel, hasColorsAccordion, ctaButtons } =
    useConfiguration(variant);
  const showSellingPrice = trim.isSellingPriceProvince;

  const handleExteriorSelection = key => {
    const isValid = getIsInteriorColorValid(
      selectedInteriorColor,
      key,
      selectedTransmission?.exteriorColors[0]?.colors,
    );
    const defaultInteriorColor = getDefaultInteriorColor(key, selectedTransmission?.exteriorColors);
    setSelectedExteriorColor(key);
    setSelectedAssetType('exterior');
    setShowInteriorError(ErrorStatus.FALSE);

    if (!isValid) {
      setSelectedInteriorColor(defaultInteriorColor);
    }
  };

  const handleInteriorSelection = key => {
    const isValid = getIsInteriorColorValid(
      key,
      selectedExteriorColor,
      selectedTransmission?.exteriorColors[0]?.colors,
    );

    if (isValid) {
      setSelectedAssetType('interior');
      setSelectedInteriorColor(key);
      setShowInteriorError(ErrorStatus.FALSE);
    } else {
      setShowInteriorError(ErrorStatus.TRUE);
    }
  };

  // rough implementation of what a select handler will be without interiors
  const handleAvailableSelection = key => {
    setSelectedExteriorColor(key);
    setSelectedAssetType('exterior');
  };

  // Reset colours to default when trim changes
  useEffect(() => {
    setSelectedTransmission(defaultTransmission);
    setSelectedExteriorColor(defaultExteriorColorKey);
    setSelectedInteriorColor(defaultInteriorColorKey);
    setShowInteriorError(ErrorStatus.FALSE);
    setSelectedAssetType('exterior');
  }, [trimKey]);

  useEffect(() => {
    setSelectedExteriorColor(defaultExteriorColorKey);
    setSelectedInteriorColor(defaultInteriorColorKey);
  }, [selectedTransmission]);

  // Update BAP URL params based on selections
  useEffect(() => {
    if (setBapUrlParams && bapUrlParams) {
      setBapUrlParams(
        getBapQueryStringVariables(
          modelKey,
          modelYear,
          trimKey,
          transmissionModelCode,
          selectedExteriorColor,
          selectedInteriorColor,
        ),
      );
    }
  }, [
    modelKey,
    modelYear,
    trimKey,
    transmissionModelCode,
    selectedExteriorColor,
    selectedInteriorColor,
    setBapUrlParams,
    bapUrlParams,
    selectedTransmission,
  ]);

  const exteriorImages = {
    landscape: selectedExteriorColor
      ? selectedTransmission?.exteriorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedExteriorColor,
        )?.landscapeAssets?.value?.images
      : null,
    studio: selectedExteriorColor
      ? selectedTransmission?.exteriorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedExteriorColor,
        )?.studioAssets?.value?.images
      : null,
    threeSixty: selectedInteriorColor
      ? selectedTransmission?.exteriorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedInteriorColor,
        )?.threeSixtyAssets?.value?.images
      : null,
  };

  const interiorImages = {
    landscape: selectedInteriorColor
      ? selectedTransmission?.interiorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedInteriorColor,
        )?.landscapeAssets?.value?.images
      : null,
    studio: selectedInteriorColor
      ? selectedTransmission?.interiorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedInteriorColor,
        )?.studioAssets?.value?.images
      : null,
    threeSixty: selectedInteriorColor
      ? selectedTransmission?.interiorColors?.[0]?.colors.find(
          color => color?.color?.item?.fields?.detKey?.value === selectedInteriorColor,
        )?.threeSixtyAssets?.value?.images
      : null,
  };

  const exteriorColorSwatches = selectedTransmission?.exteriorColors?.[0]?.colors.map(c => ({
    name: c.color.item?.fields.colorName?.value || c.color.item?.displayName,
    gtmName: c.name?.toLowerCase(),
    color: c.color.item?.fields?.hexValue?.value,
    key: c.color.item?.fields.detKey.value,
    isSelected: c.color.item?.fields.detKey.value === selectedExteriorColor,
    isValid: true,
  }));

  const interiorColorSwatches = selectedTransmission?.interiorColors?.[0]?.colors.map(c => ({
    name: c.color.item?.fields.colorName.value,
    gtmName: c.name?.toLowerCase(),
    color: c.color.item?.fields.hexValue?.value,
    image: <Image {...c.color.item?.fields?.swatch?.value} />,
    key: c.color.item?.fields.detKey.value,
    isSelected: c.color.item?.fields.detKey.value === selectedInteriorColor,
    isValid: getIsInteriorColorValid(
      c.color.item?.fields.detKey.value,
      selectedExteriorColor,
      selectedTransmission?.exteriorColors[0]?.colors,
    ),
  }));

  const carouselImages =
    selectedAssetType === 'interior' ? interiorImages[selectedAssetCategory] : exteriorImages[selectedAssetCategory];
  const showAssetTypeToggle =
    exteriorImages[selectedAssetCategory]?.length > 0 || interiorImages[selectedAssetCategory]?.length > 0;
  const assetsByType = selectedAssetType === 'interior' ? interiorImages : exteriorImages;
  const showStudioTab =
    assetsByType.studio?.length > 0 && (assetsByType.landscape?.length > 0 || assetsByType.threeSixty?.length > 0);
  const showLandscapeTab =
    assetsByType.landscape?.length > 0 && (assetsByType.studio?.length > 0 || assetsByType.threeSixty?.length > 0);
  const showThreeSixtyTab =
    assetsByType.threeSixty?.length > 0 && (assetsByType.studio?.length > 0 || assetsByType.landscape?.length > 0);

  const missingAssetPlaceholderImage = exteriorImages && exteriorImages.studio ? exteriorImages.studio[0] : null;

  if (isPackageSelectorOpen) return null;
  return (
    <>
      <Media lessThan="desktop">
        <Box id="mobile-trim-details">
          <Optional when={!hasInteriorColors}>
            <Box pt="default" />
          </Optional>

          <Optional when={showTrimName}>
            <Fade duration="t4" display="flex" justifyContent="center" pt="default">
              <H5 data-testid="trimName" color={isDark ? 'white' : undefined}>
                {compiler(trim?.name)}
              </H5>
            </Fade>
          </Optional>

          <Pricing
            hasError={hasError}
            isDark={isDark}
            isFetching={isFetching}
            pricing={trim?.pricing}
            selectedTransmission={selectedTransmission}
            setSelectedTransmission={setSelectedTransmission}
            transmissions={trim?.transmissions}
            trimName={trim?.name}
            variant={variant}
          />
          <PaymentAndFeesWrapper showFeesLabel={showFeesLabel}>
            <Optional when={showMobilePayment && !hasError}>
              <Payment
                appName={appName}
                isDark={isDark}
                isSellingPriceProvince={isSellingPriceProvince}
                language={language}
                paymentOptions={paymentOptions}
                showInformationalApr={showInformationalApr}
                trim={{ exteriorColorKey: selectedExteriorColor, ...trim }}
                vehicleType={vehicleType}
              />
            </Optional>
            <Optional when={showFeesLabel}>
              <Fees pricing={trim?.pricing} showSellingPrice={showSellingPrice} language={language} isDark={isDark} />
            </Optional>
          </PaymentAndFeesWrapper>
          <Offers
            isDark={isDark}
            modelKey={trim?.modelKey}
            modelYear={trim?.modelYear}
            transmissionKey={trim?.transmissionKey}
          />
          <Carousel
            images={carouselImages || []}
            missingAssetPlaceholderImage={missingAssetPlaceholderImage}
            isDark={isDark}
            trim={trim}
            category={category}
            vehicleType={vehicleType}
            assetType={selectedAssetType}
          />
          <Optional when={hasInteriorColors}>
            <FilterBar
              assetCategory={selectedAssetCategory}
              assetType={selectedAssetType}
              isDark={isDark}
              onAssetCategoryChange={setSelectedAssetCategory}
              onAssetTypeChange={setSelectedAssetType}
              showAssetTypeToggle={showAssetTypeToggle}
            />
          </Optional>

          <Optional when={exteriorColorSwatches && interiorColorSwatches}>
            <Colours
              exteriorColorLabel={exteriorColorLabel}
              exteriorSwatches={exteriorColorSwatches}
              gtmBodyStyle={trim?.gtmBodyStyle}
              gtmModelName={trim?.gtmModelName}
              gtmTrimName={trim?.gtmTrimName}
              hasColorsAccordion={hasColorsAccordion}
              hasInteriorColors={hasInteriorColors}
              interiorSwatches={interiorColorSwatches}
              isDark={isDark}
              setSelectedExteriorColor={handleExteriorSelection}
              setSelectedInteriorColor={handleInteriorSelection}
              setShowInteriorError={setShowInteriorError}
              showInteriorError={showInteriorError}
            />
          </Optional>
          <Optional when={!hasInteriorColors}>
            <Colours
              exteriorColorLabel={exteriorColorLabel}
              exteriorSwatches={exteriorColorSwatches}
              gtmBodyStyle={trim?.gtmBodyStyle}
              gtmModelName={trim?.gtmModelName}
              gtmTrimName={trim?.gtmTrimName}
              hasColorsAccordion={hasColorsAccordion}
              hasInteriorColors={hasInteriorColors}
              isDark={isDark}
              setSelectedExteriorColor={handleAvailableSelection}
            />
          </Optional>

          <Ctas
            bapUrlParams={bapUrlParams}
            category={category}
            componentType={componentType}
            ctaButtons={ctaButtons}
            isDark={isDark}
            selectedExteriorColor={selectedExteriorColor}
            selectedInteriorColor={selectedInteriorColor}
            trim={trim}
            vehicleType={vehicleType}
            modelCategory={modelCategory}
          />
          {featuresPath && <Features path={featuresPath} />}
        </Box>
      </Media>
      <Media greaterThanOrEqual="desktop">
        <Optional when={hasInteriorColors}>
          <FilterBar
            assetCategory={selectedAssetCategory}
            assetType={selectedAssetType}
            isDark={isDark}
            onAssetCategoryChange={setSelectedAssetCategory}
            onAssetTypeChange={setSelectedAssetType}
            showAssetTypeToggle={showAssetTypeToggle}
            showLandscapeTab={showLandscapeTab}
            showStudioTab={showStudioTab}
            showThreeSixtyTab={showThreeSixtyTab}
          />
        </Optional>

        <Optional when={!hasInteriorColors}>
          <Box pt="xxl" />
        </Optional>

        <Wrapper data-testid="cy-trim-details-wrapper">
          <Row pb="m">
            <Column width={[2 / 3]}>
              <Carousel
                images={carouselImages || []}
                missingAssetPlaceholderImage={missingAssetPlaceholderImage}
                isDark={isDark}
                trim={trim}
                category={category}
                vehicleType={vehicleType}
                assetType={selectedAssetType}
              />
              <Ctas
                bapUrlParams={bapUrlParams}
                category={category}
                componentType={componentType}
                ctaButtons={ctaButtons}
                isDark={isDark}
                trim={trim}
                vehicleType={vehicleType}
                modelCategory={modelCategory}
              />
            </Column>
            <Column width={[1 / 3]}>
              <Pricing
                hasError={hasError}
                isDark={isDark}
                isFetching={isFetching}
                pricing={trim?.pricing}
                selectedTransmission={selectedTransmission}
                setSelectedTransmission={setSelectedTransmission}
                transmissions={trim?.transmissions}
                trimName={trim?.name}
                variant={variant}
              />
              <PaymentAndFeesWrapper showFeesLabel={showFeesLabel}>
                <Optional when={!hasError}>
                  <Payment
                    appName={appName}
                    isDark={isDark}
                    isSellingPriceProvince={isSellingPriceProvince}
                    language={language}
                    paymentOptions={paymentOptions}
                    showInformationalApr={showInformationalApr}
                    trim={{ exteriorColorKey: selectedExteriorColor, ...trim }}
                    vehicleType={vehicleType}
                  />
                </Optional>
                <Optional when={showFeesLabel}>
                  <Fees
                    pricing={trim?.pricing}
                    showSellingPrice={showSellingPrice}
                    language={language}
                    isDark={isDark}
                  />
                </Optional>
              </PaymentAndFeesWrapper>

              <Offers
                isDark={isDark}
                modelKey={trim.modelKey}
                modelYear={trim.modelYear}
                transmissionKey={trim.transmissionKey}
              />
              <Optional when={exteriorColorSwatches && interiorColorSwatches}>
                <Colours
                  exteriorColorLabel={exteriorColorLabel}
                  exteriorSwatches={exteriorColorSwatches}
                  gtmBodyStyle={trim?.gtmBodyStyle}
                  gtmModelName={trim?.gtmModelName}
                  gtmTrimName={trim?.gtmTrimName}
                  hasInteriorColors={hasInteriorColors}
                  interiorSwatches={interiorColorSwatches}
                  isDark={isDark}
                  setSelectedExteriorColor={handleExteriorSelection}
                  setSelectedInteriorColor={handleInteriorSelection}
                  setShowInteriorError={setShowInteriorError}
                  showInteriorError={showInteriorError}
                />
              </Optional>

              <Optional when={!hasInteriorColors}>
                <Colours
                  exteriorColorLabel={exteriorColorLabel}
                  exteriorSwatches={exteriorColorSwatches}
                  gtmBodyStyle={trim?.gtmBodyStyle}
                  gtmModelName={trim?.gtmModelName}
                  gtmTrimName={trim?.gtmTrimName}
                  hasInteriorColors={hasInteriorColors}
                  isDark={isDark}
                  setSelectedExteriorColor={handleAvailableSelection}
                />
              </Optional>
            </Column>
          </Row>
        </Wrapper>
        <Optional when={featuresPath}>
          <Features path={featuresPath} />
        </Optional>
      </Media>
    </>
  );
};

export default Details;
