import React from 'react';
import PropTypes from 'prop-types';
import { Box, Copy, Wrapper as DSWrapper, SubNavigationItem, Media, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import Toggle from './Toggle';

import themeStyles from './Details.styles';

const Wrapper = themeStyles.apply(Box, 'FilterBarWrapper');
const Content = themeStyles.apply(DSWrapper, 'FilterBarContent');
const Column = themeStyles.apply(Box, 'FilterBarColumn');
const Label = themeStyles.apply(Copy, 'FilterBarLabel');
const Container = themeStyles.apply(Box, 'FilterBarContainer');

const FilterBar = ({
  assetCategory,
  assetType,
  isDark,
  onAssetCategoryChange,
  onAssetTypeChange,
  showAssetTypeToggle,
  showLandscapeTab,
  showStudioTab,
  showThreeSixtyTab,
}) => {
  const { t } = useTranslation();

  if (!showAssetTypeToggle && !showStudioTab && !showLandscapeTab && !showThreeSixtyTab) {
    return null;
  }

  return (
    <Wrapper isDark={isDark}>
      <Content as="header">
        <Column>
          <Media greaterThan="smallDesktop">
            <Box display="flex">
              <Optional when={showStudioTab}>
                <SubNavigationItem
                  styling="tertiary"
                  fontFamily="bold"
                  size="nav"
                  mr="s"
                  isActive={assetCategory === 'studio'}
                  onClick={() => onAssetCategoryChange('studio')}
                  color={isDark ? 'white' : undefined}
                >
                  {t('Pages.Models.Exploration.studioLabel')}
                </SubNavigationItem>
              </Optional>
              <Optional when={showLandscapeTab}>
                <SubNavigationItem
                  styling="tertiary"
                  fontFamily="bold"
                  size="nav"
                  mr="s"
                  isActive={assetCategory === 'landscape'}
                  onClick={() => onAssetCategoryChange('landscape')}
                  color={isDark ? 'white' : undefined}
                >
                  {t('Pages.Models.Exploration.landscapeLabel')}
                </SubNavigationItem>
              </Optional>
              <Optional when={showThreeSixtyTab}>
                <SubNavigationItem
                  styling="tertiary"
                  fontFamily="bold"
                  size="nav"
                  mr="s"
                  isActive={assetCategory === 'threeSixty'}
                  onClick={() => onAssetCategoryChange('threeSixty')}
                  color={isDark ? 'white' : undefined}
                >
                  {t('Pages.Models.Exploration.threeSixtyLabel')}
                </SubNavigationItem>
              </Optional>
            </Box>
          </Media>
          <Optional when={showAssetTypeToggle}>
            <Container>
              <Box display="flex">
                <Label isDark={isDark} size="nav">
                  {t('Pages.Models.Exploration.exteriorLabel')}
                </Label>
                <Toggle
                  isDark={isDark}
                  on={assetType === 'interior'}
                  onClick={() => onAssetTypeChange(assetType === 'exterior' ? 'interior' : 'exterior')}
                  toggleAriaLabel={t('Shared.Common.toggleExteriorAndInteriorAria')}
                />
                <Label isDark={isDark} size="nav">
                  {t('Pages.Models.Exploration.interiorLabel')}
                </Label>
              </Box>
            </Container>
          </Optional>
        </Column>
      </Content>
    </Wrapper>
  );
};

FilterBar.propTypes = {
  assetType: PropTypes.string,
  assetCategory: PropTypes.string,
  showStudioTab: PropTypes.bool,
  showLandscapeTab: PropTypes.bool,
  showThreeSixtyTab: PropTypes.bool,
  onAssetTypeChange: PropTypes.func,
  onAssetCategoryChange: PropTypes.func,
  showAssetTypeToggle: PropTypes.bool,
};

export default FilterBar;
