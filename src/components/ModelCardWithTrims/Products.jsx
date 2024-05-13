import React, { useContext } from 'react';
import { Box, Column, Media, Row } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';

import ProductCard from '../ProductCard';
import CarouselSlider from '../CarouselSlider';
import { ModelFiltersContext } from '../ModelFiltersContext';
import { getModelProduct } from '../ModelFiltersContext/utils';
import { EqualHeight } from '../../utils/components/EqualHeight';

import { usePricesFromFinancialModel } from '../../utils/financeUtils';
import themeStyles from './ModelCardWithTrims.styles';

const ProductCardWrapper = themeStyles.apply(Box, 'ProductCardWrapper');

const Products = ({ models, gtmTags, priceLabels }) => {
  const { getPrices } = usePricesFromFinancialModel(priceLabels, 'models');
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { financials } = modelFiltersContext || {};

  const products = models?.map(model => ({ ...model, key: model?.key || model?.detKey?.value }));

  return (
    <>
      <Media at="mobile">
        <EqualHeight>
          <CarouselSlider length={products?.length} splideOptions={{ padding: { left: '0vw', right: '0vw' } }}>
            {() =>
              products?.map(model => {
                const prices = getPrices(getModelProduct(financials?.models, model?.detModelKey?.value));
                return (
                  <SplideSlide key={model.key}>
                    <ProductCardWrapper>
                      <ProductCard
                        prices={prices}
                        fields={model}
                        gtmTags={{ ...gtmTags, model: model?.modelName?.value }}
                      />
                    </ProductCardWrapper>
                  </SplideSlide>
                );
              })
            }
          </CarouselSlider>
        </EqualHeight>
      </Media>
      <Media greaterThanOrEqual="smallDesktop">
        <Row as="ul" pt="default">
          <EqualHeight>
            {products?.map(model => {
              const prices = getPrices(getModelProduct(financials?.models, model?.detModelKey?.value));
              return (
                <Column
                  key={model.key}
                  width={[1, 1 / 2, 1 / 3]}
                  mb="m"
                  as="li"
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <ProductCard
                    prices={prices}
                    fields={model}
                    gtmTags={{ ...gtmTags, model: model?.modelName?.value }}
                  />
                </Column>
              );
            })}
          </EqualHeight>
        </Row>
      </Media>
    </>
  );
};

export default Products;
