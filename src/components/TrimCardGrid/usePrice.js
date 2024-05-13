import useFetchFinancial from '../../utils/hooks/useFetchFinancial';

const usePrice = (modelYear, modelKey) => {
  const shouldFetch = modelYear && modelKey;
  const models = [{ modelKey, modelYear }];

  const { data, isFetching, hasError } = useFetchFinancial({ models, shouldFetch });

  return { price: data, isFetchingPrice: isFetching, hasPriceError: hasError };
};

export default usePrice;
