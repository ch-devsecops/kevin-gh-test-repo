import React, { useContext } from 'react';
import { Media } from '@honda-canada/design-system-react';
import { createGlobalStyle } from 'styled-components';
import css from '@styled-system/css';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import PackagesGrid from './PackagesGrid';
import PackagesSlider from './PackagesSlider';
import Context from '../service/Context';
import { EqualHeight } from '../../../utils/components/EqualHeight';

const PackageSelectorContainerStyles = createGlobalStyle(({ top }) =>
  css({
    'div.package-selector-container': {
      position: 'sticky',
      top,
      zIndex: isEditorActive() ? 'auto' : 'sectionNav',
    },
  }),
);

const PackageSelector = ({
  gtmModelName,
  hasError,
  isFetching,
  isOpen,
  selectedTrim,
  setIsCompareModalOpen,
  setIsOpen,
  setSelectedTrim,
  trims,
  gtmCategoryProp,
  componentName,
}) => {
  const { packageSelectorContainerStylesTop, zIndexWorkaroundClassName } = useContext(Context);

  return (
    <EqualHeight>
      <PackageSelectorContainerStyles top={packageSelectorContainerStylesTop} />
      <Media greaterThanOrEqual="smallDesktop" className={`package-selector-container ${zIndexWorkaroundClassName}`}>
        <PackagesGrid
          gtmModelName={gtmModelName}
          hasError={hasError}
          isFetching={isFetching}
          isOpen={isOpen}
          selectedTrim={selectedTrim}
          setIsCompareModalOpen={setIsCompareModalOpen}
          setIsOpen={setIsOpen}
          setSelectedTrim={setSelectedTrim}
          trims={trims}
          gtmCategoryProp={gtmCategoryProp}
          componentName={componentName}
        />
      </Media>
      <Media at="mobile" className={`package-selector-container ${zIndexWorkaroundClassName}`}>
        <PackagesSlider
          gtmModelName={gtmModelName}
          hasError={hasError}
          isFetching={isFetching}
          isOpen={isOpen}
          selectedTrim={selectedTrim}
          setIsCompareModalOpen={setIsCompareModalOpen}
          setIsOpen={setIsOpen}
          setSelectedTrim={setSelectedTrim}
          trims={trims}
          gtmCategoryProp={gtmCategoryProp}
          componentName={componentName}
        />
      </Media>
    </EqualHeight>
  );
};

export default PackageSelector;
