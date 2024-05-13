import React, { useContext, useEffect, useRef, useState } from 'react';
import { compiler } from 'markdown-to-jsx';
import { useTranslation } from 'react-i18next';
import flatten from 'lodash/flatten';
import uniqBy from 'lodash/unionBy';
import { Box, H3 } from '@honda-canada/design-system-react';
import { ModelExplorationContext } from '../ModelExplorationContext';
import ColorDisplayTabs from './ColorDisplayTabs';
import ColorDisplay from './ColorDisplay';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';

/**
 * @param {array} trims - array of trims from web catalog data
 * @param {string} type - 'interior' or 'exterior'
 * @returns a de-duped, flattened array of colors from all trims
 */
const getAllTrimsColors = (trims, type) =>
  uniqBy(
    flatten(
      trims?.map(trim =>
        flatten(
          trim?.transmissions?.map(transmission =>
            transmission?.items?.[0]?.[type]?.[0]?.colors?.filter(
              color => color?.primaryImage?.item?.value?.src && color?.secondaryImage?.item?.value?.src,
            ),
          ),
        ),
      ),
    ),
    'color.item.fields.detKey.value',
  );

/**
 * @param {array} allTrimColors - array of colours from all trims
 * @param {array} baseTrimColors - array of colours from the base trim
 * @returns Colours with primary and secondary images; base trim's images
 * if there are any, otherwise the first images available from all trim colors.
 */
const getColorsWithImages = (allTrimColors, baseTrimColors) =>
  allTrimColors
    ?.map(trimColor => {
      const baseTrimColor = baseTrimColors?.find(
        baseColor =>
          baseColor.primaryImage.item.value.src &&
          baseColor.color.item.fields.detKey.value === trimColor.color.item.fields.detKey.value,
      );
      const primaryImage = baseTrimColor?.primaryImage || trimColor?.primaryImage;
      const secondaryImage = baseTrimColor?.secondaryImage || trimColor?.secondaryImage;

      if (primaryImage?.item?.value?.src && secondaryImage?.item?.value?.src) {
        return {
          ...trimColor,
          primaryImage,
          secondaryImage,
        };
      }

      return null;
    })
    .filter(color => !!color);

const getPrimaryImages = colors => colors.map(color => color.primaryImage.item.value);

const getSecondaryImages = colors => colors.map(color => color.secondaryImage.item.value);

const getSwatches = (colors, isExterior) =>
  colors?.map(color => ({
    colorKey: color?.color?.item?.fields?.detKey?.value || '',
    name: color?.color?.item?.fields?.colorName?.value || '',
    gtmName: color?.name || '',
    color: isExterior ? color?.color?.item?.fields?.hexValue?.value : '',
    image: !isExterior ? color?.color?.item?.fields?.swatch?.value : '',
  }));

const ColorDisplayJSS = ({ fields, params, rendering }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeExteriorColorIndex, setActiveExteriorColor] = useState(0);
  const [activeInteriorColorIndex, setActiveInteriorColor] = useState(0);
  const { anchorId, ctaLink, ctaType, modelYear, title } = fields?.data?.value || {};
  const trim = modelYear?.fields.trims[0];
  const interiorTabTitleRef = useRef();
  const exteriorTabTitleRef = useRef();
  const interiorTitleRef = useRef();
  const exteriorTitleRef = useRef();
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const isShort = params?.styleType === 'Short';
  const { imageMaxWidth, imageAnimation } = params || {};
  const { isDark } = modelExplorationContext;

  const gtmTags = {
    modelName: modelYear?.fields.model?.name?.toLowerCase(),
    trimName: trim?.name?.toLowerCase(),
    bodyStyle:
      trim?.bodyType?.item
        ?.map(item => item.name)
        .toString()
        .toLowerCase() || '',
  };

  const allExteriorColors = getAllTrimsColors(modelYear?.fields?.trims, 'exteriorColors');
  const allInteriorColors = getAllTrimsColors(modelYear?.fields?.trims, 'interiorColors');
  const exteriorColorsWithImages = getColorsWithImages(
    allExteriorColors,
    trim?.transmissions[0]?.items[0]?.exteriorColors[0]?.colors,
  );

  const interiorColorsWithImages = getColorsWithImages(
    allInteriorColors,
    trim?.transmissions[0]?.items[0]?.interiorColors[0]?.colors,
  );

  useEffect(() => {
    interiorTabTitleRef.current = t('Pages.Models.Exploration.interiorLabel');
    exteriorTabTitleRef.current = t('Pages.Models.Exploration.exteriorLabel');
    interiorTitleRef.current = t('Pages.Models.Exploration.interiorColoursLabel');
    exteriorTitleRef.current = t('Pages.Models.Exploration.exteriorColoursLabel');
  }, [trim?.exteriorColors, trim?.interiorColors, trim?.detKey, t]);

  if (!fields || !fields?.data || !fields?.data?.value || !trim) {
    return null;
  }

  const onSelectSwatch = swatch => {
    if (activeCategory === 0) {
      setActiveExteriorColor(swatch);
    } else {
      setActiveInteriorColor(swatch);
    }
  };

  const tabs = [];
  const categories = [];

  if (exteriorColorsWithImages) {
    tabs.push(exteriorTabTitleRef.current);
    categories.push({
      primaryImages: getPrimaryImages(exteriorColorsWithImages, allExteriorColors),
      secondaryImages: getSecondaryImages(exteriorColorsWithImages, allExteriorColors),
      swatches: getSwatches(exteriorColorsWithImages, true),
      tabTitle: exteriorTabTitleRef.current || '',
      title: exteriorTitleRef.current || '',
      gtmName: 'exterior',
    });
  }

  if (interiorColorsWithImages) {
    tabs.push(interiorTabTitleRef.current);
    categories.push({
      primaryImages: getPrimaryImages(interiorColorsWithImages, allInteriorColors),
      secondaryImages: getSecondaryImages(interiorColorsWithImages, allInteriorColors),
      swatches: getSwatches(interiorColorsWithImages, false),
      tabTitle: interiorTabTitleRef.current || '',
      title: interiorTitleRef.current || '',
      gtmName: 'interior',
    });
  }
  const gtmCategory = fields?.data?.value?.gtmCategory;
  const TitleComponent = getTitleComponent(title?.value, H3);

  return (
    <Box
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      id={anchorId?.value}
      backgroundColor={isDark ? 'black' : 'white'}
      maxWidth="1248px !important"
      mt={params?.topMargin ? `${params.topMargin}px` : '0'}
      mb={params?.bottomMargin ? `${params.bottomMargin}px` : '0'}
      mx="auto"
    >
      <TitleComponent color={isDark ? 'white' : undefined} textAlign="center" py="xl" maxWidth="720px" mx="auto">
        {compiler(stripMarkdownHeading(title?.value))}
      </TitleComponent>
      {!isShort && (
        <ColorDisplayTabs tabs={tabs} activeTab={activeCategory} setActiveTab={setActiveCategory} isDark={isDark} />
      )}
      <ColorDisplay
        isShort={isShort}
        title={categories[activeCategory].title}
        primaryImages={categories[activeCategory].primaryImages}
        imageAnimation={imageAnimation?.toLowerCase()}
        imageMaximumWidth={imageMaxWidth}
        secondaryImages={categories[activeCategory].secondaryImages}
        swatches={categories[activeCategory].swatches}
        ctaLink={ctaLink?.item?.value}
        ctaType={ctaType}
        onSelectSwatch={onSelectSwatch}
        selectedSwatch={activeCategory === 0 ? activeExteriorColorIndex : activeInteriorColorIndex}
        isDark={isDark}
        gtmTags={{ ...gtmTags, interactionType: `change ${categories[activeCategory].gtmName} color` }}
      />
    </Box>
  );
};

export default ColorDisplayJSS;
