import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CarouselContent,
  Column,
  Copy,
  Media as DesignSystemMedia,
  Optional,
  Row,
  useThemeContext,
} from '@honda-canada/design-system-react';

import { useProductCatalogDataTree, useProductCompareData } from './ProductCompareDataContextProvider';
import ProductSelector from './ProductSelector';
import ProductCard from './ProductCard';
import ProductSpecifications from './ProductSpecifications';
import CarouselPaginator from './CarouselPaginator';
import { useActiveProducts, useCarouselSlider } from './ProductCompareContextProvider';
import useSelectedModels from './useSelectedModels';
import useDetectStickyProductSelector from './useDetectStickyProductSelector';
import { PRODUCT_COMPARE_ID_KEY } from '../../utils/constants';
import themeStyles from './styles/ProductCompare.styles';
import { EqualHeight } from '../../utils/components/EqualHeight';
import useStickyHeightConfiguration from './useStickyHeightConfiguration';

const Media = themeStyles.apply(DesignSystemMedia, 'Media');
const ProductCompareRow = themeStyles.apply(Row, 'ProductCompareRow');
const ProductCompareColumn = themeStyles.apply(Column, 'ProductCompareColumn');
const ProductSelectorColumn = themeStyles.apply(Column, 'ProductSelectorColumn');
const NoOptionsSelected = themeStyles.apply(Copy, 'NoOptionsSelected');
const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');

const CompareLayout = ({ onRemove, onSelect, onUpdate, gtmTags, variant }) => {
  const refProductCompareRow = useRef();
  const { header } = useThemeContext();
  const productCatalogDataTree = useProductCatalogDataTree();
  const [activeProducts, { removeProduct, onProductSelected, setProducts }] = useActiveProducts();
  const selectedModels = useSelectedModels(activeProducts, productCatalogDataTree, onUpdate, setProducts);
  const { stickyHeight } = useStickyHeightConfiguration(variant, header?.desktop?.height);
  const { isSticky } = useDetectStickyProductSelector(refProductCompareRow);

  const { viewDetailsButton, selectProductsToCompare } = useProductCompareData();

  const productsSelectorList = useMemo(() => {
    const onRemoveOption = columnIndex => {
      const id = activeProducts[columnIndex];
      removeProduct(id);
      onRemove(id);
    };

    const onDropdownItemSelected = data => {
      const id = data?.[PRODUCT_COMPARE_ID_KEY];
      if (id) {
        onSelect(id);
        onProductSelected(id);
      }
    };

    const isFullProductCards = selectedModels?.every(model => !!model);

    return selectedModels?.map((currentOption, index) => {
      if (!currentOption) {
        return (
          <ProductSelectorColumn
            data-testid={`product-compare-column${index}`}
            width={[1, 1, 1 / 5]}
            key={`${index.toString()}`}
          >
            <ProductSelector
              productCatalogDataTree={productCatalogDataTree}
              selectorIndex={index}
              activeProducts={activeProducts}
              onProductSelected={onDropdownItemSelected}
              indexId={index}
            />
          </ProductSelectorColumn>
        );
      }

      return (
        <ProductCompareColumn
          width={[1, 1, 1 / 5]}
          bg={['white', 'white', index % 2 ? 'white' : 'grey.5']}
          key={`${index.toString()}-${currentOption.detIdentifier}`}
          isFullProductCards={isFullProductCards}
        >
          <ProductCard
            product={currentOption}
            onRemoveOption={onRemoveOption}
            productIndex={index}
            gtmTags={gtmTags}
            viewDetailsButton={viewDetailsButton}
            isSticky={isSticky}
            isFullProductCards={isFullProductCards}
          />
        </ProductCompareColumn>
      );
    });
  }, [activeProducts, isSticky]);

  // Carousel state and update functions
  const { prevSlide, nextSlide, setCurrentSlide, currentSlide, bindDrag, pages } = useCarouselSlider();

  return (
    <>
      <Media lessThan="desktop" stickyHeight={stickyHeight}>
        <ProductCompareRow style={{ border: 'none' }} ref={refProductCompareRow}>
          <CarouselContainer showSticky={isSticky} hideSticky={!isSticky}>
            <CarouselContent
              currentSlide={currentSlide}
              bindDrag={bindDrag}
              items={productsSelectorList}
              equalHeight
              slideAnimation
            />
            <CarouselPaginator
              pages={pages}
              currentSlide={currentSlide}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </CarouselContainer>
        </ProductCompareRow>
      </Media>
      <Media
        greaterThan="smallDesktop"
        style={{ paddingBottom: isSticky ? `${refProductCompareRow?.current?.offsetTop}px` : '0px' }}
        stickyHeight={stickyHeight}
      >
        <CarouselContainer ref={refProductCompareRow} showSticky={isSticky} hideSticky={!isSticky}>
          <EqualHeight>
            <ProductCompareRow style={{ border: 'none' }}>
              <ProductCompareColumn width={1 / 5} />
              {productsSelectorList}
            </ProductCompareRow>
          </EqualHeight>
        </CarouselContainer>
      </Media>
      <Optional when={activeProducts.length > 0}>
        <ProductSpecifications selectedModels={selectedModels} isSticky={isSticky} />
      </Optional>
      <Optional when={activeProducts.length <= 0}>
        <NoOptionsSelected
          data-testid="compare-no-selection-text"
          mt="xl"
          mb="huge"
          display="flex"
          justifyContent="center"
        >
          {selectProductsToCompare}
        </NoOptionsSelected>
      </Optional>
    </>
  );
};

CompareLayout.propTypes = {
  onRemove: PropTypes.func,
  onSelect: PropTypes.func,
  gtmTags: PropTypes.shape({
    'data-gtm-component-type': PropTypes.string,
    'data-gtm-interaction-type': PropTypes.string,
    'data-gtm-title': PropTypes.string,
  }),
  variant: PropTypes.string,
};

export default CompareLayout;
