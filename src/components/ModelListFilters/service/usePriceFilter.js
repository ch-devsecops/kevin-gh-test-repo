import { useState, useEffect, useContext } from 'react';

import useDebounce from '../../../utils/hooks/useDebounce';
import { ModelFiltersContext } from '../../ModelFiltersContext';

const DEFAULT_PRICES = { min: '', max: '' };

function usePriceFilter() {
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { prices, setPrices, filter, setPriceRange } = modelFiltersContext || {};
  const [inputPrice, setInputPrice] = useState(DEFAULT_PRICES);
  const debouncedPrices = useDebounce(inputPrice, 700);

  const inputChange = ({ target: { value, name } }) => {
    // Price filter returns $ and , and this gets passed again into the formatPrice
    // function thereby leading to empty strings set as the value.
    setInputPrice(prevState => ({ ...prevState, [name]: value.replace(/[$,]/gm, '') }));
  };

  const resetChange = key => {
    setInputPrice(prevState => ({ ...prevState, [key]: '' }));
    // trigger the reset only when a value that has already been applied to the filter range and stored in the context
    if (filter.priceRange.max && filter.priceRange.min >= 0 && !inputPrice.max && !inputPrice.min) {
      setPriceRange({});
    }
  };

  useEffect(() => {
    if (!prices.max && !prices.min) {
      setInputPrice(DEFAULT_PRICES);
    }
  }, [prices.min, prices.max]);

  useEffect(() => {
    // trigger the reset only when a value that has already been applied to the filter range and stored in the context
    if (filter.priceRange.max && filter.priceRange.min >= 0 && !inputPrice.max && !inputPrice.min) {
      setPriceRange({});
    }
  }, [inputPrice.min, inputPrice.max]);

  useEffect(() => {
    setPrices(debouncedPrices);
  }, [debouncedPrices.min, debouncedPrices.max]);

  return [inputPrice, resetChange, inputChange];
}

export default usePriceFilter;
