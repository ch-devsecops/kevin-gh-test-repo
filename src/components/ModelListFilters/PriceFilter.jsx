import React, { useContext, useState } from 'react';
import { Box, Button, Copy, FormField, useMediaQueries, useThemeContext } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useTranslation } from 'react-i18next';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { ModelFiltersContext } from '../ModelFiltersContext';
import { getSelectedCategories } from '../ModelFiltersContext/utils';
import IPriceFilter from './service/IPriceFilter';
import themeStyles, { FilterToggleContainer } from './modelListFilter.styles';
import { pushGtmSelectCategoryFilterEvent } from './service/utils';

import usePriceFilter from './service/usePriceFilter';

const Container = themeStyles.apply(Box, 'Container');
const FilterPriceHeader = themeStyles.apply(Copy, 'FilterPriceHeader');
const FormFieldWithLabelWrapper = themeStyles.apply(Box, 'FormFieldWithLabelWrapper');
const MinMaxContainer = themeStyles.apply(Copy, 'MinMaxContainer');
const FilterSubmitButton = themeStyles.apply(Button, 'FilterSubmitButton');

const PriceFilter = ({ filterContainerWidth, toggleContainerWidth }) => {
  const theme = useThemeContext();
  const { t } = useTranslation();
  const { isMobile, isSmallDesktop: isTablet } = useMediaQueries();
  const [expanded, setExpanded] = useState(false);
  const appName = useAppName();
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { setPriceRange, filter, trimCount } = modelFiltersContext || {};
  const [inputPrice, resetChange, inputChange] = usePriceFilter();
  const formFieldBorder = `${theme?.borders?.[1]} black`;
  const filterPriceLabel = t('Pages.Models.Exploration.filterPriceLabel');
  const filterMinLabel = t('Pages.Models.Exploration.filterMinLabel');
  const filterMaxLabel = t('Pages.Models.Exploration.filterMaxLabel');
  const filterPriceButtonLabel = t('Pages.Models.Exploration.filterPriceButton');
  const filterPriceRangeLabel = t('Pages.Models.Exploration.filterPriceRangeLabel');

  const handleSubmit = event => {
    event.preventDefault();

    const minPrice = Number(inputPrice?.min);
    const maxPrice = inputPrice?.max ? Number(inputPrice?.max) : Infinity;

    const selectedFilters = getSelectedCategories(filter?.values);
    pushGtmSelectCategoryFilterEvent(
      selectedFilters,
      trimCount,
      appName,
      maxPrice && maxPrice !== Infinity ? maxPrice : '',
      minPrice && minPrice !== 0 ? minPrice : '',
    );
    setPriceRange({ min: minPrice, max: maxPrice });
  };
  const isSmallScreen = isMobile || isTablet;

  return (
    <FilterToggleContainer
      withSectionDivider={expanded && isSmallScreen}
      expandOffsetHeight={isSmallScreen ? 61 : 37}
      heading={filterPriceLabel}
      hasSelections={!!inputPrice?.min || !!inputPrice?.max}
      expanded={expanded}
      setExpanded={() => setExpanded(!expanded)}
      data-testid="price-filter-container"
      toggleContainerWidth={toggleContainerWidth}
    >
      <Container
        data-testid="price-filter-form"
        as="form"
        onSubmit={handleSubmit}
        filterContainerWidth={filterContainerWidth}
      >
        <FilterPriceHeader data-testid="price-filter-label" as="p">
          {filterPriceRangeLabel}
        </FilterPriceHeader>
        <FormFieldWithLabelWrapper>
          <MinMaxContainer data-testid="price-filter-min-label">{filterMinLabel}:</MinMaxContainer>
          <FormField
            border={formFieldBorder}
            focused={false}
            styling="bordered"
            input={{
              onChange: inputChange,
              handleInputReset: () => resetChange('min'),
              value: formatPrice(inputPrice?.min),
              name: 'min',
              placeholder: '$',
              ariaLabel: filterMinLabel,
              'data-testid': 'min-price-filter',
            }}
          />
        </FormFieldWithLabelWrapper>
        <FormFieldWithLabelWrapper>
          <MinMaxContainer data-testid="price-filter-max-label">{filterMaxLabel}:</MinMaxContainer>
          <FormField
            border={formFieldBorder}
            focused={false}
            styling="bordered"
            input={{
              onChange: inputChange,
              handleInputReset: () => resetChange('max'),
              value: formatPrice(inputPrice?.max),
              name: 'max',
              placeholder: '$',
              ariaLabel: filterMaxLabel,
              'data-testid': 'max-price-filter',
            }}
          />
        </FormFieldWithLabelWrapper>
        <FilterSubmitButton styling="primary" disabled={!inputPrice?.min && !inputPrice?.max} onClick={handleSubmit}>
          {filterPriceButtonLabel}
        </FilterSubmitButton>
      </Container>
    </FilterToggleContainer>
  );
};

PriceFilter.prototype = IPriceFilter;

export default PriceFilter;
