import React from 'react';
import { Copy, Box } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import FilterToggleContainer from './FilterToggleContainer';
import FilterItem from './FilterItem';
import LearnMore from './LearnMore';
import ExteriorColors from './ExteriorColors';
import Transmissions from './Transmissions';
import {
  isFilterItemDisabled,
  isCategoryHasProducts,
  useFilterTypeConfiguration,
  getFilterLabel,
} from './service/utils';
import FragmentDiv from './FragmentDiv';
import {
  AVAILABLE_TRANSMISSIONS_FIELD_NAME,
  DESIGN_FEATURES_FIELD_NAME,
  DRIVE_TRAIN_FIELD_NAME,
  INTERIOR_MATERIAL_FIELD_NAME,
} from './constants';
import themeStyles from './modelListFilter.styles';

const CategoryContainer = themeStyles.apply(Box, 'CategoryContainer');

const CategoryItems = ({ filterCategory, filter, modelData, dispatchFilter, expanded }) => {
  const filterItems = filterCategory?.fields?.items?.map(item => {
    const category = filterCategory?.fields?.name;
    const filterValue = filter?.values[category];
    const isSelected = filterValue.includes(item.name);
    const isDisabled = isFilterItemDisabled(filter, category, item.name, modelData);
    const type = isSelected ? 'REMOVE_ITEM' : 'ADD_ITEM';
    const payload = {
      item: category,
      value: item.name,
    };

    return (
      <FilterItem
        key={item.name}
        isSelected={isSelected}
        expanded={expanded}
        disabled={isDisabled}
        onClick={() => dispatchFilter({ type, payload })}
      >
        {item.filterName.value}
      </FilterItem>
    );
  });

  // Return the array of FilterItem components
  return filterItems;
};

const Categories = ({
  years = [],
  modelNames = [],
  specialTrimNames = [],
  exteriorColors,
  transmissions,
  filterTypes = [],
  filter,
  dispatchFilter,
  expandedCategories = [],
  setExpandedCategories,
  modelData,
  isFutureVehiclesItemVisible,
  isFutureVehiclesItemEnabled,
  isNsxItemVisible,
  isNsxItemEnabled,
  toggleContainerWidth,
  filterContainerWidth,
  hideModelFilter,
  hideYearFilter,
  variant,
}) => {
  const { t } = useTranslation();
  const { mappedFilterType, categoryFilterLabel, showExteriorColorsLabel } = useFilterTypeConfiguration(
    variant,
    filterTypes,
  );
  const interiorMaterials = filterTypes?.find(
    ({ filterCategory }) => filterCategory?.fields?.name === INTERIOR_MATERIAL_FIELD_NAME,
  );
  const isModelsHidden = hideModelFilter?.item?.value;
  const isYearsHidden = hideYearFilter?.item?.value;

  return (
    <CategoryContainer isOneCategory={modelNames?.length === 1}>
      {/* Years, from model data */}
      {years.length && !isYearsHidden ? (
        <FilterToggleContainer
          data-testid="model-list-filter-categories-year"
          heading={t('Pages.Models.Exploration.filterYearLabel')}
          hasSelections={filter?.values?.year?.length > 0 || filter?.onlyFutureVehicles}
          expanded={expandedCategories?.includes('years')}
          setExpanded={isExpanded => {
            const expandedArray = isExpanded
              ? [...new Set([...expandedCategories, 'years'])]
              : expandedCategories?.filter(cat => cat !== 'years');
            setExpandedCategories(expandedArray);
          }}
        >
          {isFutureVehiclesItemVisible && (
            <FilterItem
              isSelected={filter?.onlyFutureVehicles}
              disabled={!isFutureVehiclesItemEnabled || filter?.onlyNsx}
              onClick={() => {
                dispatchFilter({ type: 'SET_ONLY_FUTURE_VEHICLES', payload: !filter?.onlyFutureVehicles });
              }}
            >
              {t('Pages.Models.Exploration.filterFutureVehiclesLabel')}
            </FilterItem>
          )}
          {years.map(year => (
            <FilterItem
              key={year}
              isSelected={filter?.values?.year?.includes(year)}
              disabled={isFilterItemDisabled(filter, 'year', year, modelData)}
              onClick={() =>
                dispatchFilter({
                  type: filter?.values?.year[0] === year ? 'REMOVE_ITEM' : 'ADD_ITEM',
                  payload: { item: 'year', value: year },
                })
              }
            >
              {year}
            </FilterItem>
          ))}
        </FilterToggleContainer>
      ) : null}
      {/* Model names, from model data */}
      {!isModelsHidden ? (
        <FilterToggleContainer
          data-testid="model-list-filter-categories-models"
          toggleContainerWidth={toggleContainerWidth}
          heading={categoryFilterLabel}
          hasSelections={filter?.values?.model.length > 0 || filter?.onlyNsx || filter?.values?.specialTrim.length > 0}
          expanded={expandedCategories?.includes('models')}
          setExpanded={isExpanded => {
            const expandedArray = isExpanded
              ? [...new Set([...expandedCategories, 'models'])]
              : expandedCategories?.filter(cat => cat !== 'models');
            setExpandedCategories(expandedArray);
          }}
        >
          {modelNames.map(modelName =>
            isCategoryHasProducts(modelData, modelName) ? (
              <FilterItem
                filterContainerWidth={filterContainerWidth}
                key={modelName}
                isSelected={filter?.values?.model.includes(modelName)}
                disabled={isFilterItemDisabled(filter, 'model', modelName, modelData)}
                onClick={() =>
                  dispatchFilter({
                    type: filter?.values?.model[0] === modelName ? 'REMOVE_ITEM' : 'ADD_ITEM',
                    payload: { item: 'model', value: modelName },
                  })
                }
              >
                {modelName}
              </FilterItem>
            ) : null,
          )}
          {specialTrimNames.map(specialTrimName => (
            <FilterItem
              key={specialTrimName}
              isSelected={filter?.values?.specialTrim.includes(specialTrimName)}
              disabled={isFilterItemDisabled(filter, 'specialTrim', specialTrimName, modelData)}
              onClick={() =>
                dispatchFilter({
                  type: filter?.values?.specialTrim[0] === specialTrimName ? 'REMOVE_ITEM' : 'ADD_ITEM',
                  payload: { item: 'specialTrim', value: specialTrimName },
                })
              }
            >
              {specialTrimName}
            </FilterItem>
          ))}
          {isNsxItemVisible && (
            <FilterItem
              isSelected={filter?.onlyNsx}
              disabled={!isNsxItemEnabled}
              onClick={() => {
                dispatchFilter({ type: 'SET_ONLY_NSX', payload: !filter?.onlyNsx });
              }}
            >
              NSX
            </FilterItem>
          )}
        </FilterToggleContainer>
      ) : null}

      {/* Filter categories, from Sitecore */}
      {mappedFilterType
        ?.filter(({ filterCategory }) => filterCategory?.fields?.name !== INTERIOR_MATERIAL_FIELD_NAME)
        ?.map(({ filterCategory, ctaLink }) => {
          const isDrivetrain = filterCategory?.fields?.name === DRIVE_TRAIN_FIELD_NAME;
          const isDesignFeatures = filterCategory?.fields?.name === DESIGN_FEATURES_FIELD_NAME;
          const isTransmissionsAvailable = filterCategory?.fields?.name === AVAILABLE_TRANSMISSIONS_FIELD_NAME;
          const transmissionFilterLabel = getFilterLabel(variant, filterCategory?.fields?.filterCategoryName?.value);
          const heading = isDrivetrain ? t('Pages.Models.Exploration.filterPerformanceLabel') : transmissionFilterLabel;
          let hasSelections = filter?.values[filterCategory?.fields?.name]?.length > 0;

          if (isDrivetrain || isTransmissionsAvailable) {
            hasSelections = hasSelections || filter?.values?.transmissionName.length > 0;
          }

          if (isDesignFeatures) {
            hasSelections =
              hasSelections || filter?.values?.exteriorColor.length > 0 || filter?.values?.interiorMaterial.length > 0;
          }
          if (!filterCategory?.fields) {
            return null;
          }
          return (
            <FilterToggleContainer
              data-testid={filterCategory?.fields?.name}
              key={filterCategory?.fields?.name}
              heading={heading}
              hasSelections={hasSelections}
              expanded={expandedCategories?.includes(filterCategory?.fields?.name)}
              setExpanded={isExpanded => {
                const expandedArray = isExpanded
                  ? [...new Set([...expandedCategories, filterCategory?.fields?.name])]
                  : expandedCategories?.filter(cat => cat !== filterCategory?.fields?.name);
                setExpandedCategories(expandedArray);
              }}
            >
              {!isEditorActive() && ctaLink?.url ? <LearnMore {...ctaLink} /> : null}
              {/* Drivetrain category is grouped with Transmissions, under "Performance" */}
              {isDrivetrain && (
                <FragmentDiv>
                  {({ expanded }) => (
                    <>
                      <Transmissions
                        transmissions={transmissions}
                        filter={filter}
                        dispatchFilter={dispatchFilter}
                        modelData={modelData}
                        expanded={expanded}
                        showLabel
                      />
                      <Copy size="small" mt="default" mb="xs" mx="s" fontFamily="bold">
                        {filterCategory?.fields?.filterCategoryName.value}
                      </Copy>
                    </>
                  )}
                </FragmentDiv>
              )}

              {isTransmissionsAvailable && (
                <FragmentDiv>
                  {({ expanded }) => (
                    <div>
                      <Transmissions
                        transmissions={transmissions}
                        filter={filter}
                        dispatchFilter={dispatchFilter}
                        modelData={modelData}
                        expanded={expanded}
                      />
                    </div>
                  )}
                </FragmentDiv>
              )}

              {/* Design Features category includes Exterior Colours and Interior Materials */}
              {isDesignFeatures && (
                <FragmentDiv>
                  {({ expanded }) => (
                    <>
                      <ExteriorColors
                        variant={variant}
                        exteriorColors={exteriorColors}
                        filter={filter}
                        dispatchFilter={dispatchFilter}
                        modelData={modelData}
                        showLabel={showExteriorColorsLabel}
                      />
                      {interiorMaterials?.filterCategory && (
                        <>
                          <Copy size="small" mt="default" mb="xs" mx="s" fontFamily="bold">
                            {t('Pages.Models.Exploration.interiorMaterialLabel')}
                          </Copy>
                          <CategoryItems
                            filterCategory={interiorMaterials?.filterCategory}
                            filter={filter}
                            dispatchFilter={dispatchFilter}
                            modelData={modelData}
                            expanded={expanded}
                          />
                        </>
                      )}
                      <Copy size="small" mt="default" mb="xs" mx="s" fontFamily="bold">
                        {t('Pages.Models.Exploration.filterOtherOptionsLabel')}
                      </Copy>
                    </>
                  )}
                </FragmentDiv>
              )}
              <CategoryItems
                filterCategory={filterCategory}
                filter={filter}
                dispatchFilter={dispatchFilter}
                modelData={modelData}
              />
            </FilterToggleContainer>
          );
        })}
    </CategoryContainer>
  );
};

export default Categories;
