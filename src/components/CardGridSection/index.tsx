import React from 'react';
import {
  Box,
  H6,
  Media,
  BaseCarousel,
  BaseCarouselPaginator,
  useCarouselControl,
  Optional,
} from '@honda-canada/design-system-react';
import themeStyles from './CardGridSection.styles';
import type { CardGridSectionProps } from './types';

const Wrapper = themeStyles.apply(Box, 'Wrapper');
const Title = themeStyles.apply(H6, 'Title');
const List = themeStyles.apply(Box, 'List');
const StyledBaseCarousel = themeStyles.apply(BaseCarousel, 'StyledBaseCarousel');
const StyledBasePaginator = themeStyles.apply(BaseCarouselPaginator, 'StyledBasePaginator');

const CardGridSection = <T,>({ title, items, itemWidth, render, componentName }: CardGridSectionProps<T>) => {
  const behavior = useCarouselControl(items.length);
  const { prevSlide, nextSlide, setCurrentSlide, currentSlide, pages } = behavior;

  return (
    <Wrapper data-testid="cy-model-cards" as="section" data-gtm-component-type={componentName}>
      <Title data-testid="cy-model-cards-title">{title}</Title>
      <Media greaterThan="mobile">
        <List data-testid="cy-model-cards-list">{items?.map(item => render(item))}</List>
      </Media>
      <Media at="mobile">
        <StyledBaseCarousel
          data-testid="cy-model-cards-carousel"
          items={items?.map(item => render(item))}
          behavior={behavior}
          crossFade={false}
          currentSlide={currentSlide}
          itemWidth={itemWidth}
          equalHeight
          slideAnimation
        />
        <Optional when={items?.length > 1}>
          <StyledBasePaginator
            pages={pages}
            currentSlide={currentSlide}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </Optional>
      </Media>
    </Wrapper>
  );
};

export default CardGridSection;
