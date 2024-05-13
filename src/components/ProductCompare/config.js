import { variant1, variant2, variant3 } from '../ProductCard/utils';

const useConfiguration = variant => {
  let showDropdownLabel = true;
  let specificationAccordionOffset = {
    MOBILE: {
      ALL_MODELS_SELECTED: 255,
      NOT_ALL_MODELS_SELECTED: 495,
    },
    DESKTOP: {
      ALL_MODELS_SELECTED: 285,
      NOT_ALL_MODELS_SELECTED: 530,
    },
  };

  switch (variant) {
    case variant1:
    case variant2:
      break;
    case variant3:
      showDropdownLabel = false;
      specificationAccordionOffset = {
        MOBILE: {
          ALL_MODELS_SELECTED: 258,
          NOT_ALL_MODELS_SELECTED: 385,
        },
        DESKTOP: {
          ALL_MODELS_SELECTED: 280,
          NOT_ALL_MODELS_SELECTED: 360,
        },
      };
      break;
    default:
      break;
  }

  return {
    showDropdownLabel,
    specificationAccordionOffset,
  };
};
export default useConfiguration;
