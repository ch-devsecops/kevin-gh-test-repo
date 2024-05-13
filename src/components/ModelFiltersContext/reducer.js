import { makeModelConfiguration } from '../../utils/financeUtils';

export const modelListFilters = {
  values: {
    year: [],
    model: [],
    bodyType: [],
    drivetrain: [],
    exteriorColor: [],
    interiorMaterial: [],
    transmissionName: [],
    comfortConvenience: [],
    technology: [],
    designFeatures: [],
    wheels: [],
    safety: [],
    entertainment: [],
    specialTrim: [],
  },
  onlyFutureVehicles: false,
  onlyNsx: false,
  trimCounts: {},
  modelKeys: {},
  priceRange: {},
  modelConfiguration: {},
  modelConfigurationArray: [],
};

const singleSelectionCategories = ['exteriorColor'];

export const filterReducer = (state, { type, payload }) => {
  if (
    type !== 'RESET' &&
    type !== 'SET_TRIM_COUNTS' &&
    type !== 'SET_MODEL_KEYS' &&
    type !== 'SET_PRICE_MODELS' &&
    type !== 'SET_PRICE_RANGE' &&
    type !== 'SET_ONLY_FUTURE_VEHICLES' &&
    type !== 'SET_ONLY_NSX' &&
    !Object.keys(state?.values).includes(payload?.item)
  ) {
    // eslint-disable-next-line no-console
    console.warn(`Invalid item: ${payload.item}`);
    return state;
  }

  switch (type) {
    case 'SET_PRICE_MODELS':
      return makeModelConfiguration(payload, state);

    case 'SET_TRIM_COUNTS':
      return {
        ...state,
        trimCounts: {
          ...state.trimCounts,
          [payload.modelKey]: payload.count,
        },
      };
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: payload,
      };
    case 'SET_MODEL_KEYS':
      return {
        ...state,
        modelKeys: {
          ...state.modelKeys,
          [payload.modelKey]: payload.modelIds,
        },
      };
    case 'ADD_ITEM':
      if (singleSelectionCategories.includes(payload.item)) {
        return {
          ...state,
          values: {
            ...state.values,
            [payload.item]: [payload.value],
          },
          onlyFutureVehicles: false,
        };
      }

      return {
        ...state,
        values: {
          ...state.values,
          [payload.item]: state?.values[payload?.item].concat(payload?.value),
        },
        onlyFutureVehicles: false,
      };
    case 'REMOVE_ITEM':
      if (singleSelectionCategories.includes(payload.item)) {
        return {
          ...state,
          values: {
            ...state.values,
            [payload.item]: [],
          },
        };
      }

      return {
        ...state,
        values: {
          ...state.values,
          [payload.item]: state.values[payload.item].filter(item => item !== payload.value),
        },
      };
    case 'RESET':
      return modelListFilters;
    case 'SET_ONLY_FUTURE_VEHICLES':
      return {
        ...modelListFilters,
        onlyFutureVehicles: payload,
      };
    case 'SET_ONLY_NSX':
      return {
        ...modelListFilters,
        onlyNsx: payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
