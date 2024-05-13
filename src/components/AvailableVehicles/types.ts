type TransmissionItem = {
  id: string;
  name: string;
  detKey: {
    value: string;
  };
  detIdentifier: {
    value: string;
  };
  sotId: {
    value: string;
  };
  price: {
    value: string;
  };
  trim: {
    value: string;
  };
  tooltipText: {
    value: string;
  };
  image: {
    url: string;
  };
  exteriorColorKey: {
    value: string;
  };
};

type Transmission = {
  items: TransmissionItem[];
};

type Trim = {
  name: string;
  transmissions: Transmission[];
};

export type PropTypes = {
  vehicle: Trim;
  dealerName?: string;
  bodyStyle?: string;
  inventoryAvailabilityStatus?: string;
};
