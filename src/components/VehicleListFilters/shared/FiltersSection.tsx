import React from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import kebabCase from 'lodash/kebabCase';

import type { FiltersSectionProps } from '../service/types';

import themeStyles from '../VehicleListFilters.styles';
import FiltersSectionItem from './FiltersSectionItem';

const SectionWrapper = themeStyles.apply(Box, 'SectionWrapper');
const SectionTitle = themeStyles.apply(Copy, 'SectionTitle');
const FilterItemsWrapper = themeStyles.apply(Box, 'FilterItemsWrapper');

const FiltersSection = ({ filterOptions }: FiltersSectionProps) => {
  const { title, options } = filterOptions;
  const formattedTitleTestId = kebabCase(title);
  const hasImages = options.some(option => option.icon.src);

  return (
    <SectionWrapper data-testid={`cy-${formattedTitleTestId}-section`}>
      <SectionTitle data-testid={`cy-${formattedTitleTestId}-section-title`} size="small">
        {title}
      </SectionTitle>
      <FilterItemsWrapper hasImages={hasImages}>
        {options.map(item => (
          <FiltersSectionItem key={item.key} item={item} parentTestId={formattedTitleTestId} />
        ))}
      </FilterItemsWrapper>
    </SectionWrapper>
  );
};

export default FiltersSection;
