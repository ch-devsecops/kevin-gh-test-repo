import React, { type FC } from 'react';
import { Box, Toggle, Label } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import type { assetTypeState, TrimToggleProps } from '../types';

import themeStyles from '../TrimOverview.styles';

const StyledWrapper = themeStyles.apply(Box, 'StyledWrapper');
const StyledLabel = themeStyles.apply(Label, 'StyledLabel');

export const EXTERIOR = 'exterior';
export const INTERIOR = 'interior';

const Index: FC<TrimToggleProps> = ({ onAssetTypeChange }) => {
  const { t } = useTranslation();

  const [assetType, setAssetType] = React.useState<assetTypeState>('exterior');

  const assetTypeChangeHandler = (type: assetTypeState) => {
    setAssetType(type);
    onAssetTypeChange(type);
  };

  return (
    <StyledWrapper data-testid="cy-trim-toggle">
      <StyledLabel>{t('Pages.Models.Exploration.exteriorLabel')}</StyledLabel>
      <Toggle
        on={assetType === INTERIOR}
        onChange={() => assetTypeChangeHandler(assetType === EXTERIOR ? INTERIOR : EXTERIOR)}
        toggleAriaLabel={t('Shared.Common.toggleExteriorAndInteriorAria')}
      />
      <StyledLabel>{t('Pages.Models.Exploration.interiorLabel')}</StyledLabel>
    </StyledWrapper>
  );
};

export default Index;
