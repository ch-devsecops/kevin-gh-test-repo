import React, { useState } from 'react';
import { Copy, SwatchPicker, Box, useThemeContext, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import SelectedColor from './SelectedColor';
import { isExteriorColorDisabled } from './service/utils';
import themeStyles from './modelListFilter.styles';

const FilterLabel = themeStyles.apply(Copy, 'FilterLabel');
const ExteriorColorsWrapper = themeStyles.apply(Box, 'ExteriorColorsWrapper');
const ExteriorColorContainer = themeStyles.apply(Box, 'ExteriorColorContainer');
const ExteriorColor = themeStyles.apply(Box, 'ExteriorColor');
const ColorNameContainer = themeStyles.apply(Box, 'ColorNameContainer');
const ColorName = themeStyles.apply(Copy, 'ColorName');

const ExteriorColors = ({ exteriorColors, filter, dispatchFilter, modelData, showLabel, variant }) => {
  const [hoveredExteriorColor, setHoveredExteriorColor] = useState(null);
  const { t } = useTranslation();
  const { isDark } = useThemeContext();

  return (
    <>
      <Optional when={showLabel}>
        <FilterLabel size="small">{t('Pages.Models.Exploration.exteriorColoursLabel')}</FilterLabel>
      </Optional>

      <SelectedColor
        variant={variant}
        color={
          hoveredExteriorColor || exteriorColors.find(color => color.detKey.value === filter?.values.exteriorColor[0])
        }
      />
      <ExteriorColorsWrapper>
        {exteriorColors.map(c => {
          const isDisabled = isExteriorColorDisabled(filter, c.detKey.value, modelData);
          return (
            <ExteriorColorContainer
              key={c.detKey?.value}
              data-testid={`cy-color-${c.colorName?.value.replace(/ /g, '-')}`}
            >
              <ExteriorColor>
                <SwatchPicker
                  data-testid="cy-model-list-color"
                  swatch={{
                    color: c.hexValue?.value,
                    name: c.colorName?.value,
                    image: c.swatch?.value?.src,
                  }}
                  isDark={isDark}
                  icon={isDisabled ? 'warning' : filter?.values.exteriorColor[0] === c.detKey.value && 'close'}
                  onMouseEnter={() => setHoveredExteriorColor(c)}
                  onMouseLeave={() => setHoveredExteriorColor(null)}
                  onClick={() =>
                    !isDisabled &&
                    dispatchFilter({
                      type: filter?.values.exteriorColor[0] === c.detKey.value ? 'REMOVE_ITEM' : 'ADD_ITEM',
                      payload: {
                        item: 'exteriorColor',
                        value: c.detKey.value,
                      },
                    })
                  }
                />
                <ColorNameContainer>
                  <ColorName size="extraSmall" data-testid="cy-model-list-color-name">
                    {c.colorName?.value}
                  </ColorName>
                </ColorNameContainer>
              </ExteriorColor>
            </ExteriorColorContainer>
          );
        })}
      </ExteriorColorsWrapper>
    </>
  );
};

export default ExteriorColors;
