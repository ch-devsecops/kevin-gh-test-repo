import { useTranslation } from 'react-i18next';

export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const PAYMENT_METHOD = 'finance';
export const PAYMENT_FREQUENCY = 'weekly';

export const useConfiguration = variant => {
  const { t } = useTranslation();
  let showTransmissionToggle;
  let hasInteriorColors;
  let exteriorColorLabel;
  let showMobilePayment;
  let hasColorsAccordion;
  let ctaButtons;

  switch (variant) {
    case variant1:
      showTransmissionToggle = true;
      hasInteriorColors = true;
      exteriorColorLabel = t('Pages.Models.Exploration.exteriorColoursLabel');
      showMobilePayment = false;
      hasColorsAccordion = true;
      ctaButtons = ['Buildable', 'TestDrivable', 'Comparable'];
      break;
    case variant2:
    default:
      showTransmissionToggle = false;
      hasInteriorColors = false;
      exteriorColorLabel = t('Pages.Models.Exploration.availableColoursLabel');
      showMobilePayment = true;
      hasColorsAccordion = false;
      ctaButtons = ['PriceFinance', 'AddToCompare', 'FindDealer'];
      break;
  }

  return {
    hasInteriorColors,
    exteriorColorLabel,
    showTransmissionToggle,
    showMobilePayment,
    hasColorsAccordion,
    ctaButtons,
  };
};
