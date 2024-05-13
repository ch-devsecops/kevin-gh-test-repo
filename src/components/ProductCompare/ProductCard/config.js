import { variant1, variant2, variant3 } from '../../ProductCard/utils';

const useConfiguration = variant => {
  let productCardPosition;
  let productCardAlignment = 'space-between';
  let productCardPseudoElement = () => false;
  let primaryWrapperMaxHeight = 'auto';
  let primaryWrapperPseudoElement = () => false;

  switch (variant) {
    case variant1:
    case variant2:
      break;
    case variant3:
      productCardPosition = 'relative';
      productCardAlignment = 'center';
      productCardPseudoElement = productIndex => ({
        content: '""',
        position: 'absolute',
        bottom: 0,
        top: '-16px',
        left: '-16px',
        right: '-16px',
        backgroundColor: productIndex % 2 ? 'white' : 'grey.5',
      });
      primaryWrapperMaxHeight = '200px';
      primaryWrapperPseudoElement = productIndex => ({
        content: '""',
        position: 'absolute',
        bottom: 0,
        top: '-16px',
        left: '-16px',
        right: '-16px',
        backgroundColor: productIndex % 2 ? 'white' : 'grey.5',
      });
      break;
    default:
      break;
  }

  return {
    productCardPosition,
    productCardAlignment,
    productCardPseudoElement,
    primaryWrapperMaxHeight,
    primaryWrapperPseudoElement,
  };
};
export default useConfiguration;
