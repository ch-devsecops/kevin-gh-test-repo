export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const variant3 = 'variant3';
export const AVAILABLE_TRANSMISSIONS_FIELD_NAME = 'hasTransmissions';
export const INTERIOR_MATERIAL_FIELD_NAME = 'interiorMaterial';
export const DRIVE_TRAIN_FIELD_NAME = 'drivetrain';
export const DESIGN_FEATURES_FIELD_NAME = 'designFeatures';
export const TRANSMISSIONS_FIELD_NAME = 'Transmission';

export const useConfiguration = variant => {
  let wrapperWidth;
  let toggleContainerWidth;
  let headerWidth;
  let filterContainerWidth;
  let colorFilterHeight;

  switch (variant) {
    // PSP
    case variant3:
      colorFilterHeight = '150px';
      break;

    // Marine
    case variant2:
      wrapperWidth = ['100%', '100%', 'calc(100% + 3px)'];
      toggleContainerWidth = ['100%', '100%', 'calc(100% - 3px)'];
      headerWidth = ['100%', '100%', 'calc(100% - 3px)'];
      filterContainerWidth = ['100%', '100%', 'calc(100% - 3px)'];
      break;

    case variant1:
    default:
      wrapperWidth = undefined;
      toggleContainerWidth = undefined;
      headerWidth = '100%';
      filterContainerWidth = undefined;
      colorFilterHeight = '125px';
      break;
  }
  return {
    wrapperWidth,
    toggleContainerWidth,
    headerWidth,
    filterContainerWidth,
    colorFilterHeight,
  };
};
