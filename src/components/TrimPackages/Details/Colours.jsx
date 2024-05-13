import React from 'react';
import { Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import ColourSwatches from './ColourSwatches';

const Colors = ({
  exteriorColorLabel,
  exteriorSwatches = [],
  gtmBodyStyle,
  gtmModelName,
  gtmTrimName,
  hasColorsAccordion,
  interiorSwatches = [],
  isDark,
  setSelectedExteriorColor,
  setSelectedInteriorColor,
  setShowInteriorError,
  showInteriorError,
}) => {
  const { t } = useTranslation();
  const showExteriorColorSwatches = !!exteriorSwatches.length;
  const showInteriorColorSwatches = !!interiorSwatches.length;

  return (
    <>
      <Optional when={showExteriorColorSwatches}>
        <ColourSwatches
          swatches={exteriorSwatches}
          gtmModelName={gtmModelName}
          gtmTrimName={gtmTrimName}
          gtmBodyStyle={gtmBodyStyle}
          gtmInteractionType="change exterior color"
          title={exteriorColorLabel}
          setSelected={setSelectedExteriorColor}
          isDark={isDark}
          hasColorsAccordion={hasColorsAccordion}
        />
      </Optional>

      <Optional when={showInteriorColorSwatches}>
        <ColourSwatches
          swatches={interiorSwatches}
          gtmModelName={gtmModelName}
          gtmTrimName={gtmTrimName}
          gtmBodyStyle={gtmBodyStyle}
          gtmInteractionType="change interior color"
          title={t('Pages.Models.Exploration.interiorColoursLabel')}
          setSelected={setSelectedInteriorColor}
          showInteriorError={showInteriorError}
          setShowInteriorError={setShowInteriorError}
          isDark={isDark}
          hasColorsAccordion={hasColorsAccordion}
        />
      </Optional>
    </>
  );
};

export default Colors;
