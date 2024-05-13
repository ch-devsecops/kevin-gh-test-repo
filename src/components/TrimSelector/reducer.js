import { getDropdowns, getYearOptions, getSelectedVehicle, getSelectedModel, addQueryParams } from './utils';
import safelyParseJSON from '../../utils/safelyParseJSON';

// action variables
export const SET_YEAR = 'SET_YEAR';
export const SET_MODEL = 'SET_MODEL';
export const SET_TRIM = 'SET_TRIM';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_PRESELECTED = 'SET_PRESELECTED';

export const getInitialState = data => {
  const parsed = safelyParseJSON(data);
  return {
    vehicles: parsed.years,
    dropdowns: getDropdowns(parsed.toggleLabels),
    options: {
      year: getYearOptions(parsed.years),
      model: [],
      trim: [],
    },
    selectedOptions: {},
    errors: {},
    ctaOptions: parsed.ctaDetails || [],
    selectedUrl: null,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRESELECTED: {
      const { payload } = action;
      let selectedOptions = payload;

      // handle options
      const { models, selectedVehicle } = getSelectedVehicle(payload, state.vehicles);

      // clear selectedOptions when pre-selected year is not valid
      if (!selectedVehicle) selectedOptions = {};

      const { trims, ctaType } = getSelectedModel(payload, selectedVehicle);

      // clear selected model and trim when pre-selected model is not valid
      if (!trims.length) {
        selectedOptions.model = undefined;
        selectedOptions.trim = undefined;
      }

      // handle cta url
      const selectedCTAOption = state.ctaOptions.find(o => o.type === ctaType);
      const selectedUrl = addQueryParams(selectedCTAOption?.url, payload);

      return {
        ...state,
        options: {
          ...state.options,
          model: models,
          trim: trims,
        },
        selectedOptions,
        selectedUrl,
        selectedVehicle,
        errors: {},
      };
    }

    case SET_YEAR: {
      const selectedOptions = {
        year: action.payload,
      };

      const { models, selectedVehicle } = getSelectedVehicle(selectedOptions, state.vehicles);

      return {
        ...state,
        options: {
          ...state.options,
          model: models,
          trim: [],
        },
        selectedOptions,
        selectedUrl: null,
        errors: {
          ...state.errors,
          year: false,
        },
        selectedVehicle,
      };
    }

    case SET_MODEL: {
      const { payload } = action;

      const selectedOptions = {
        year: state.selectedOptions.year,
        model: payload,
      };

      const { trims, ctaType } = getSelectedModel(selectedOptions, state.selectedVehicle);

      let selectedUrl;
      // if trim labels are not provided by content, handle selectedUrl
      if (!state.dropdowns[2]) {
        const selectedCTAOption = state.ctaOptions.find(o => o.type === ctaType);

        selectedUrl = addQueryParams(selectedCTAOption?.url, selectedOptions);
      }

      return {
        ...state,
        options: {
          ...state.options,
          trim: state.dropdowns[2] && trims,
        },
        selectedOptions,
        selectedUrl,
        errors: {
          ...state.errors,
          model: false,
        },
        ctaType,
      };
    }

    case SET_TRIM: {
      const { payload } = action;

      const selectedOptions = {
        ...state.selectedOptions,
        trim: payload,
      };

      const selectedCTAOption = state.ctaOptions.find(o => o.type === state.ctaType);

      const selectedUrl = addQueryParams(selectedCTAOption?.url, selectedOptions);

      return {
        ...state,
        selectedOptions,
        selectedUrl,
        errors: {
          ...state.errors,
          trim: false,
        },
      };
    }

    case SET_ERRORS: {
      // if selectedUrl is not yet ready
      if (!state.selectedUrl) {
        const errorState = {};
        if (state.dropdowns.length === 3 && !state.selectedOptions.trim) errorState.trim = true;
        if (!state.selectedOptions.model) errorState.model = true;
        if (!state.selectedOptions.year) errorState.year = true;

        return {
          ...state,
          errors: errorState,
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
};
