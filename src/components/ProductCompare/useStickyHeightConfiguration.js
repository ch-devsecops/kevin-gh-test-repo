import { DEFAULT_HEADER_HEIGHT } from '../../utils/constants';
import { variant1, variant2, variant3 } from '../ProductCard/utils';

const useStickyHeightConfiguration = (variant, height) => {
  let stickyHeight = `${DEFAULT_HEADER_HEIGHT}px`;

  switch (variant) {
    case variant3:
    case variant2:
      break;
    case variant1:
      stickyHeight = height;
      break;
    default:
      break;
  }

  return {
    stickyHeight,
  };
};
export default useStickyHeightConfiguration;
