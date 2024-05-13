import React from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { useConfiguration } from './constants';
import themeStyles from './modelListFilter.styles';

const ColorSwatchContainer = themeStyles.apply(Box, 'ColorSwatchContainer');
const StyledSVG = themeStyles.apply('svg', 'StyledSVG');
const SelectedColorBox = themeStyles.apply(Box, 'SelectedColorBox');
const SelectedColorCopy = themeStyles.apply(Copy, 'SelectedColorCopy');
const SelectedColorWrapper = themeStyles.apply(Box, 'SelectedColorWrapper');
const ColorPreviewContainer = themeStyles.apply(Box, 'ColorPreviewContainer');
const ColorPreviewCopy = themeStyles.apply(Box, 'ColorPreviewCopy');

const hexToRgbAFunction = hex => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}`;
  }
  return hex;
};

const SelectedSwatch = ({ color }) => (
  <>
    <ColorSwatchContainer
      data-testid="cy-selected-color-bg"
      backgroundColor={color.hexValue?.value}
      backgroundGradientColor={hexToRgbAFunction(color.hexValue?.value)}
    >
      <SelectedColorBox>
        <StyledSVG viewBox="50 0 220 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 74L272 74L272 0C157.225 14.5343 97.9339 26.2297 1.90012e-06 52.2651L0 74Z" />
        </StyledSVG>
      </SelectedColorBox>
    </ColorSwatchContainer>
    <SelectedColorCopy size="extraSmall" data-testid="cy-selected-color-name">
      {color.colorName?.value}
    </SelectedColorCopy>
  </>
);

const SelectedColor = ({ variant, color }) => {
  const { colorFilterHeight } = useConfiguration(variant);
  const { t } = useTranslation();
  return (
    <SelectedColorWrapper colorFilterHeight={colorFilterHeight}>
      {color ? (
        <SelectedSwatch color={color} />
      ) : (
        <ColorPreviewContainer>
          <ColorPreviewCopy data-testid="cy-color-preview-label">
            {t('Pages.Models.Exploration.colorPreviewLabel')}
          </ColorPreviewCopy>
        </ColorPreviewContainer>
      )}
    </SelectedColorWrapper>
  );
};

export default SelectedColor;
