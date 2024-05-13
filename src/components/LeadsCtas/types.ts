export enum InventoryAvailabilityStatus {
  preOrder = 'preOrder',
  inStock = 'inStock',
  onItsWay = 'onItsWay',
}

export type Cta = {
  anchor: string;
  href: string;
  linktype: string;
  target: string;
  text: string;
  url: string;
};

export type Model = {
  modelKey: string;
  modelYear: string;
};

export type Fields = {
  bookAppointmentCta: Cta;
  bookAppointmentCtaType: string;
  bookTestDriveCta: Cta;
  bookTestDriveCtaType: string;
  contactDealerCta: Cta;
  contactDealerCtaType: string;
  title: string;
};

export type LeadsCtasPropsUIProps = {
  fields: Fields;
  inventoryAvailabilityStatus: InventoryAvailabilityStatus;
  title: string;
  dealerName: string;
  model: string;
  trim: string;
  bodyStyle: string;
  componentType: string;
};

export type GtmPayload = {
  event: string;
  dealer_name: string;
  cta_type: string;
  cta_placement: string;
  link_text: string;
  link_url: string;
  component_type: string;
  model: string;
  trim: string;
  body_style: string;
  availability_flag: string;
};

export type CtaProps = {
  cta: Cta;
  type: string;
  gtmPayload: GtmPayload;
};
