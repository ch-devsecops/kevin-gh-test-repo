import reducer, { initialState } from '../reducer';

describe('PreOrderBanner reducer', () => {
  it('should throw an error if passed an unsupported action', () => {
    const actual = () => {
      reducer(initialState, { type: 'washDishes', payload: '' });
    };

    expect(actual).toThrow('Action not supported');
  });

  describe('parseJson', () => {
    it('should not throw an error if passed a string that can not be parsed to JSON', () => {
      const actual = () => {
        reducer(initialState, { type: 'parseJson', payload: 'garbage' });
      };
      expect(Object.keys(actual).length).toBe(0);
    });

    it('should set isInitialized to true after parsing a JSON string', () => {
      const actual = reducer(initialState, { type: 'parseJson', payload: '{}' });

      expect(actual.isInitialized).toBeTruthy();
    });

    it('should add the JSON string dropdown property to state ', () => {
      const stringified = JSON.stringify({ dropdown: 123 });
      const actual = reducer(initialState, { type: 'parseJson', payload: stringified });

      expect(actual).toHaveProperty('dropdown');
    });

    it('should add common Payment Gateway fields to the form submission', () => {
      const stringified = JSON.stringify({
        paymentGatewayCommonFields: {
          productLine: 'A',
        },
      });

      const actual = reducer(initialState, { type: 'parseJson', payload: stringified });

      expect(actual).toHaveProperty('formSubmission', { productLine: 'A' });
    });
  });

  describe('setSelectedOption', () => {
    const payload = {
      value: 'veg',
      text: 'Vegetable',
      additionalDropdowns: [
        {
          paymentGatewayFieldName: 'redVeg',
          options: [{ value: 'tomato' }],
        },
        {
          paymentGatewayFieldName: 'greenVeg',
          options: [{ value: 'cucumber' }],
        },
      ],
    };
    const state = {
      ...initialState,
      dropdown: {
        paymentGatewayFieldName: 'allVeg',
      },
    };

    const actual = reducer(state, { type: 'setSelectedOption', payload });

    it('should add the selected option', () => {
      expect(actual.selectedOption).toHaveProperty('value', 'veg');
    });

    it('should select the first option in each additional dropdown', () => {
      expect(actual.additionalSelections[0]).toHaveProperty('value', 'tomato');
      expect(actual.additionalSelections[1]).toHaveProperty('value', 'cucumber');
    });

    it('should update the form submission based on all selected options', () => {
      expect(actual.formSubmission).toHaveProperty('allVeg', 'veg');
      expect(actual.formSubmission).toHaveProperty('redVeg', 'tomato');
      expect(actual.formSubmission).toHaveProperty('greenVeg', 'cucumber');
    });
  });

  describe('updateFormSubmission', () => {
    it('should add provided fields and values to the form submission', () => {
      const payload = { hello: 'world' };
      const actual = reducer(initialState, { type: 'updateFormSubmission', payload });

      expect(actual.formSubmission).toHaveProperty('hello', 'world');
    });
  });
});
