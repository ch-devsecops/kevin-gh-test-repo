import { ACCESSORY_TYPE_LABEL_ALL } from './constants';

export const SELECT_TRIM = 'SELECT_TRIM';
export const SELECT_TRANSMISSION = 'SELECT_TRANSMISSION';
export const SELECT_ACCESSORY_TYPE = 'SELECT_ACCESSORYTYPE';
export const SUBMIT_TRIM = 'SUBMIT_TRIM';
export const SUBMIT_TRANSMISSION = 'SUBMIT_TRANSMISSION';
export const SUBMIT_ACCESSORY_TYPE = 'SUBMIT_ACCESSORYTYPE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SELECT_ACCESSORY = 'SELECT_ACCESSORY';
export const SET_ACCESSORIES = 'SET_ACCESSORIES';

export const getInitialState = (modelYear, trimKeyParam) => {
  const defaultTrim = modelYear?.trims?.find(t => t.detIdentifier === modelYear?.defaultTrim?.detIdentifier) || {};
  const defaultTransmission = defaultTrim?.defaultTransmission;

  return {
    selectedTrim: defaultTransmission?.detIdentifier || trimKeyParam,
    selectedTransmission: {},
    selectedAccessoryType: ACCESSORY_TYPE_LABEL_ALL,
    selectedAccessory: '',
    submittedTrim: trimKeyParam || defaultTransmission?.detIdentifier || trimKeyParam,
    submittedTransmission: {},
    isModalOpen: false,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_TRIM: {
      return {
        ...state,
        selectedTrim: action.payload,
      };
    }

    case SUBMIT_TRIM: {
      return {
        ...state,
        submittedTrim: action.payload,
      };
    }

    case SUBMIT_TRANSMISSION: {
      return {
        ...state,
        submittedTransmission: action.payload,
      };
    }

    case SELECT_TRANSMISSION: {
      return {
        ...state,
        selectedTransmission: action.payload,
      };
    }

    case SELECT_ACCESSORY_TYPE: {
      return {
        ...state,
        selectedAccessoryType: action.payload,
      };
    }

    case SUBMIT_ACCESSORY_TYPE: {
      return {
        ...state,
        submittedAccessoryType: action.payload,
      };
    }

    case SELECT_ACCESSORY: {
      return {
        ...state,
        selectedAccessory: action.payload,
      };
    }

    case SHOW_MODAL: {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
