import { useTranslation } from 'react-i18next';

import { variant1, variant2 } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const useConfiguration = variant => {
  const { t } = useTranslation();

  let colorSwatchAlignment;
  let ctaButtons;
  let ctaLabel;
  let exteriorColorLabel;
  let fontLineHeight;
  let hasColorsAccordion;
  let hasInteriorColors;
  let labelFontSize;
  let priceStyles;
  let selectedTransmissionKeyPath;
  let selectedTransmissionKeyUseBapUrl;
  let selectTrimButton;
  let selectTrimDropDownLabel;
  let showAddToCompareButton = false;
  let showCompareTrimsLabel;
  let showDisclaimerDetails;
  let showDisclaimerTrimCard;
  let showMobilePayment;
  let showModelYear;
  let showPaymentDetails;
  let showPaymentInfoTooltip;
  let showTransmissionToggle;
  let showFeesLabel;
  let transmissionLabel;
  let valueFontSize;
  let zIndexWorkaroundClassName;
  let buttonWrapperStyling = {
    display: ['block', 'flex'],
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 'l',
    mx: 'auto',
    maxWidth: '220px',
  };
  let selectHeading;

  switch (variant) {
    // autos
    case variant1:
      colorSwatchAlignment = ['left', 'left', 'left'];
      ctaButtons = ['Buildable', 'TestDrivable', 'Comparable'];
      ctaLabel = t('Pages.Models.Exploration.selectTrimLabel');
      exteriorColorLabel = t('Pages.Models.Exploration.exteriorColoursLabel');
      fontLineHeight = ['22px', '22px', '26px'];
      hasColorsAccordion = true;
      hasInteriorColors = true;
      labelFontSize = '12px';
      selectedTransmissionKeyPath = 'detIdentifier';
      selectedTransmissionKeyUseBapUrl = false;
      selectTrimButton = true;
      selectTrimDropDownLabel = t('Pages.Models.Exploration.selectTrimDropdownLabel');
      showMobilePayment = false;
      showFeesLabel = true;
      showPaymentDetails = false;
      showPaymentInfoTooltip = true;
      showTransmissionToggle = true;
      showCompareTrimsLabel = true;
      selectHeading = t('Pages.Models.Exploration.selectTrimHeading');
      transmissionLabel = t('Pages.Models.Exploration.transmissionLabel');
      valueFontSize = '16px';
      priceStyles = {
        priceStyles: {
          title: {
            size: 'extraSmall',
          },
        },
      };
      zIndexWorkaroundClassName = 'acura-z-index-workaround honda-z-index-workaround';
      buttonWrapperStyling = {
        ...buttonWrapperStyling,
      };
      break;
    // psp
    case variant2:
    default:
      colorSwatchAlignment = ['center', 'center', 'left'];
      ctaButtons = ['PriceFinance', 'AddToCompare', 'FindDealer'];
      ctaLabel = t('Pages.Models.Exploration.viewModelDetailsButton');
      exteriorColorLabel = t('Pages.Models.Exploration.availableColoursLabel');
      fontLineHeight = '22px';
      hasColorsAccordion = false;
      hasInteriorColors = false;
      labelFontSize = '10px';
      selectedTransmissionKeyPath = 'trim.defaultTransmission.detIdentifier.value';
      selectedTransmissionKeyUseBapUrl = true;
      selectTrimButton = true;
      selectTrimDropDownLabel = t('Pages.Models.Exploration.selectModelLabel');
      showMobilePayment = true;
      showFeesLabel = false;
      showModelYear = false;
      showPaymentDetails = true;
      showPaymentInfoTooltip = false;
      showDisclaimerDetails = true;
      showDisclaimerTrimCard = false;
      showTransmissionToggle = false;
      showCompareTrimsLabel = false;
      selectHeading = t('Pages.Models.Exploration.selectModelHeading');
      transmissionLabel = t('Pages.Models.Exploration.modelDetailsTrimLabel');
      valueFontSize = ['16px', '16px', '18px'];
      priceStyles = {
        priceStyles: {
          title: {
            size: 'extraSmall',
          },
        },
        saveStyles: {
          container: {
            marginX: ['auto', 'auto', 0],
          },
        },
      };
      zIndexWorkaroundClassName = 'psp-z-index-workaround';
      showAddToCompareButton = true;

      buttonWrapperStyling = {
        ...buttonWrapperStyling,
      };
      break;
  }

  return {
    colorSwatchAlignment,
    ctaButtons,
    ctaLabel,
    exteriorColorLabel,
    hasColorsAccordion,
    hasInteriorColors,
    priceStyles,
    selectTrimButton,
    selectTrimDropDownLabel,
    showMobilePayment,
    showFeesLabel,
    showModelYear,
    showPaymentDetails,
    showPaymentInfoTooltip,
    showDisclaimerDetails,
    showDisclaimerTrimCard,
    showTransmissionToggle,
    selectedTransmissionKeyPath,
    selectedTransmissionKeyUseBapUrl,
    selectHeading,
    transmissionLabel,
    paymentDetailStyles: {
      label: {
        fontSize: labelFontSize,
      },
      value: {
        fontSize: valueFontSize,
      },
      copy: {
        lineHeight: fontLineHeight,
      },
    },
    zIndexWorkaroundClassName,
    showAddToCompareButton,
    buttonWrapperStyling,
    showCompareTrimsLabel,
  };
};
