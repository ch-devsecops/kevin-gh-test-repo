import isEmpty from 'lodash/isEmpty';
import type { Pricing } from '../../UniCard/types';

const isPriceAvailable = (price: Pricing) =>
  !!price &&
  !isEmpty(price) &&
  price.modelPrice?.allInPrice?.value &&
  price.modelPrice?.msrpPrice?.value &&
  !price.hasPriceError;

export default isPriceAvailable;
