import { InventoryAvailabilityStatus, type Cta, type Fields, type Model } from './types';

const setSearchParams = (url: string, params: { key: string; value: string }[]) => {
  try {
    const targetUrl = new URL(url);
    params.forEach(param => targetUrl.searchParams.set(param.key, param.value));

    return targetUrl.toString();
  } catch (error) {
    return '';
  }
};

export const ctaPlacementDescription = (inventoryAvailabilityStatus: InventoryAvailabilityStatus) =>
  inventoryAvailabilityStatus === InventoryAvailabilityStatus.preOrder
    ? 'dealer inventory : pre-order'
    : 'dealer inventory';

export const ctaTypeDescription = (inventoryAvailabilityStatus: InventoryAvailabilityStatus, ctaText: string) =>
  inventoryAvailabilityStatus === InventoryAvailabilityStatus.preOrder ? `${ctaText} : summary` : ctaText;

export const getGtmPayload = (
  dealerName: string,
  cta: Cta,
  model: string,
  trim: string,
  bodyStyle: string,
  availabilityStatus: InventoryAvailabilityStatus,
  componentType: string,
) => ({
  event: 'dealer_inventory_cta',
  dealer_name: dealerName,
  cta_type: ctaTypeDescription(availabilityStatus, cta?.text),
  cta_placement: ctaPlacementDescription(availabilityStatus),
  link_text: cta?.text,
  link_url: cta?.href,
  component_type: componentType,
  model,
  trim,
  body_style: bodyStyle,
  availability_flag: availabilityStatus,
});

const mapFields = (fields: Fields, selectedModel: Model, dealerCode: string) => {
  const ctas: Fields = {
    bookAppointmentCta: fields.bookAppointmentCta,
    bookAppointmentCtaType: fields.bookAppointmentCtaType.toLowerCase(),
    bookTestDriveCta: fields.bookTestDriveCta,
    bookTestDriveCtaType: fields.bookTestDriveCtaType.toLowerCase(),
    contactDealerCta: fields.contactDealerCta,
    contactDealerCtaType: fields.contactDealerCtaType.toLowerCase(),
    title: fields.title,
  };

  const params = [
    { key: 'model', value: selectedModel.modelKey },
    { key: 'modelYear', value: selectedModel.modelYear },
    { key: 'dealerCode', value: dealerCode },
  ];

  ctas.bookAppointmentCta.href = setSearchParams(ctas.bookAppointmentCta.href, params);
  ctas.bookTestDriveCta.href = setSearchParams(ctas.bookTestDriveCta.href, params);
  ctas.contactDealerCta.href = setSearchParams(ctas.contactDealerCta.href, params);

  return ctas;
};

export default mapFields;
