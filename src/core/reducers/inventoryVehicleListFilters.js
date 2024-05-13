/* eslint-disable no-param-reassign */
import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';

export const setSelectedFilterItemsAction = createAction('inventoryVehicleListFilters/setSelectedFilterItems');
export const addSelectedFilterItemAction = createAction('inventoryVehicleListFilters/addSelectedFilterItem');
export const removeSelectedFilterItemAction = createAction('inventoryVehicleListFilters/removeSelectedFilterItem');

export const setFilteredModelsAction = createAction('inventoryVehicleListFilters/setFilteredModels');
export const setFilteredTrimsAction = createAction('inventoryVehicleListFilters/setFilteredTrims');
export const setSelectedModelKeyAction = createAction('inventoryVehicleListFilters/setSelectedModelKey');
export const setSelectedModelYearAction = createAction('inventoryVehicleListFilters/setSelectedModelYear');
export const setCurrentListTypeAction = createAction('inventoryVehicleListFilters/setCurrentListTypeAction');
export const setNextStepUrl = createAction('inventoryVehicleListFilters/setNextStepUrl');

const initialState = {
  currentListType: 'models',
  selectedFilterItems: [],
  models: [],
  selectedModelKey: null,
  selectedModelYear: null,
  trims: {},
  nextStepUrl: {},
};

const inventoryVehicleListFilters = createReducer(initialState, builder => {
  builder
    .addCase(setSelectedFilterItemsAction, (state, action) => {
      state.selectedFilterItems = action.payload.sort();
    })
    .addCase(addSelectedFilterItemAction, (state, action) => {
      state.selectedFilterItems.push(action.payload);
      state.selectedFilterItems.sort();
    })
    .addCase(removeSelectedFilterItemAction, (state, action) => {
      state.selectedFilterItems = state.selectedFilterItems.filter(item => item !== action.payload).sort();
    })
    .addCase(setFilteredModelsAction, (state, action) => {
      state.models = action.payload.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
    })
    .addCase(setFilteredTrimsAction, (state, action) => {
      state.trims[action.payload.key] = action.payload.trims;
    })
    .addCase(setSelectedModelKeyAction, (state, action) => {
      state.selectedModelKey = action.payload;
    })
    .addCase(setSelectedModelYearAction, (state, action) => {
      state.selectedModelYear = action.payload;
    })
    .addCase(setCurrentListTypeAction, (state, action) => {
      state.currentListType = action.payload;
    })
    .addCase(setNextStepUrl, (state, action) => {
      state.nextStepUrl = action.payload;
    });
});

/**
 * Get selected filter items (selectedFilterItems) from state
 * @param {string} name
 * @returns {boolean} true if selected filter item is exist
 */
export const getSelectedItems = name =>
  createSelector(
    state => state?.inventoryVehicleListFilters?.selectedFilterItems,
    selectedFilterItems => selectedFilterItems?.includes?.(name),
  );

/**
 * Get current list type from state (models or trims)
 * @returns {string} currently list type
 */
export const getCurrentListType = createSelector(
  state => state?.inventoryVehicleListFilters?.currentListType,
  currentListType => currentListType,
);

/**
 * Get enabled filter items
 * @returns {Array} enabled filter items
 */
export const getEnabledFilterItems = createSelector(
  state => state?.inventoryVehicleListFilters?.selectedFilterItems,
  state =>
    state?.inventoryVehicleListFilters?.currentListType === 'models'
      ? state?.inventoryVehicleListFilters?.models
      : state?.inventoryVehicleListFilters?.trims?.[
          `${state?.inventoryVehicleListFilters?.selectedModelKey}|${state?.inventoryVehicleListFilters?.selectedModelYear}`
        ],
  (selectedFilterItems, models) => {
    // Make from selectedFilters like ['cars|filter1', 'suv|filter2']
    // Object like { cars: ['filter1'], suv: ['filter2'] }
    const selectedFiltersObj = selectedFilterItems?.reduce((acc, item) => {
      const [cat, key] = item.split('|');
      acc[cat] = [...(acc[cat] || []), key];
      return acc;
    }, {});

    const filteredModels = models
      // Filter models by selected filters object
      ?.filter?.(model =>
        Object.keys(selectedFiltersObj).every(filter =>
          selectedFiltersObj[filter].every(spec => Object.values(model?.filters).some(values => values.includes(spec))),
        ),
      )
      // Get all filters from filtered models
      ?.reduce?.((acc, model) => {
        if (model?.filters) {
          Object.keys(model?.filters).forEach(cat => {
            model?.filters?.[cat]?.forEach?.(key => {
              acc.push(`${cat}|${key}`);
            });
          });
        }
        return acc;
      }, []);
    return [...new Set(filteredModels)];
  },
);

/**
 * Is selected filter items empty
 * @returns {boolean} true if selected filter empty
 */
export const getIsSelectedFilterEmpty = createSelector(
  state => state?.inventoryVehicleListFilters?.selectedFilterItems,
  selectedFilterItems => !selectedFilterItems?.length,
);

/**
 * Get selected filter items (selectedFilterItems) from state
 * @param {*} selectedFilterItems
 * @param {*} list
 * @returns {Array} filtered list
 */
const filterListItems = (selectedFilterItems, list) => {
  const selectedFilterItemsLength = selectedFilterItems?.length;
  return list?.filter?.(listItem => {
    if (selectedFilterItemsLength > 0) {
      const check = selectedFilterItems.every(item => {
        const [, name] = item?.split?.('|') || [];
        return Object.values(listItem?.filters).some(values => values.includes(name));
      });
      if (!check) {
        return false;
      }
    }
    return true;
  });
};

const selectorFilterListItems = (selectedFilterItems, list) => filterListItems(selectedFilterItems, list);

/**
 * Get filtered models by selected filter items (selectedFilterItems)
 * @returns {Array} filtered models
 * @example
 * const filteredModels = useSelector(getFilteredModels);
 */
export const getFilteredModels = createSelector(
  state => state?.inventoryVehicleListFilters?.selectedFilterItems,
  state => state?.inventoryVehicleListFilters?.models,
  selectorFilterListItems,
);

/**
 * Get filtered trims by selected Model and filter items (selectedFilterItems)
 * @returns {Array} filtered trims
 * @example
 * const filteredModels = useSelector(getFilteredTrims);
 */
export const getFilteredTrims = createSelector(
  state => state?.inventoryVehicleListFilters?.selectedFilterItems,
  state =>
    state?.inventoryVehicleListFilters?.trims?.[
      `${state?.inventoryVehicleListFilters?.selectedModelKey}|${state?.inventoryVehicleListFilters?.selectedModelYear}`
    ],
  selectorFilterListItems,
);

export default inventoryVehicleListFilters;
