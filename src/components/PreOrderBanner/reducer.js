import safelyParseJSON from '../../utils/safelyParseJSON';

export const initialState = {
  dropdown: null,
  selectedOption: null,
  additionalSelections: null,
  formSubmission: {},
  isInitialized: false,
};

const reducer = (state, action) => {
  const { payload } = action;
  const { value, additionalDropdowns = [] } = payload;
  const { dropdown } = state;
  const additionalSelections = additionalDropdowns.map(d => d.options[0]);
  const additionalFields = {};

  if (additionalDropdowns) {
    additionalDropdowns.forEach(d => {
      const key = d.paymentGatewayFieldName;

      additionalFields[key] = d.options[0].value;
    });
  }

  switch (action.type) {
    case 'parseJson': {
      const parsed = safelyParseJSON(payload);
      return {
        dropdown: parsed.dropdown,
        formSubmission: parsed.paymentGatewayCommonFields,
        isInitialized: true,
      };
    }

    case 'setSelectedOption':
      return {
        ...state,
        selectedOption: payload,
        additionalSelections,
        formSubmission: {
          ...state.formSubmission,
          [dropdown.paymentGatewayFieldName]: value,
          ...additionalFields,
        },
      };
    case 'updateFormSubmission':
      return {
        ...state,
        formSubmission: {
          ...state.formSubmission,
          ...payload,
        },
      };
    default:
      throw new Error('Action not supported');
  }
};

export default reducer;
