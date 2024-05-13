import flatten from 'lodash/flatten';
import useFetchFinancial from '../../utils/hooks/useFetchFinancial';
import { createObjectFromProps } from '../../utils/object';

const usePrice = (modelsData, formatter) => {
  const shouldFetch = Array.isArray(modelsData) && modelsData.length;
  const parsedModelsData = shouldFetch ? createObjectFromProps(modelsData) : [];
  const models = flatten(
    parsedModelsData.map(model => {
      const modelYears = model?.modelYears;
      return modelYears.map(modelYear => ({
        modelKey: model?.detKey,
        modelYear: modelYear?.detIdentifier,
      }));
    }),
  );

  const { data, isFetching, hasError } = useFetchFinancial({ models, shouldFetch });

  const price = formatter && typeof formatter === 'function' ? formatter(data) : data;
  return { price, isFetchingPrice: isFetching, hasPriceError: hasError };
};

export default usePrice;
