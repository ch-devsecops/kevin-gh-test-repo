export type Trim = {
  modelName: string,
  modelKey: string,
  trimName: string,
  trimKey: string,
  year: string,
  transmissionKey: string,
  transmissionName: string,
  exteriorColorKey: string,
  interiorColorKey: string,
  primaryThumbnail: {
    value: {
      alt: string,
      src: string,
      height: string,
      width: string,
    },
  },
  secondaryThumbnail: {
    value: {
      alt: string,
      src: string,
      height: string,
      width: string,
    },
  },
};

export type SitecoreContext = {
  sitecoreApiKey: string,
  localhostSitecoreApiHost: string,
  language: string,
};

export type LayoutServiceResponse = {
  trims: Trim[],
  isFetching: boolean,
  hasError: boolean,
};

export type LayoutServiceTransmission = {
  fields: {
    detKey: { value: string },
    defaultExteriorColor: {
      fields: {
        color: { fields: { detKey: { value: string } } },
        defaultInteriorColor: { fields: { color: { fields: { detKey: { value: string } } } } },
      },
    },
  },
  name: string,
};

export type LayoutServiceTrim = {
  name: string,
  fields: {
    detKey: {
      value: string,
    },
    primaryThumbnail: {
      value: {
        alt: string,
        src: string,
        height: string,
        width: string,
      },
    },
    secondaryThumbnail: {
      value: {
        alt: string,
        src: string,
        height: string,
        width: string,
      },
    },
  },
  transmissions: LayoutServiceTransmission[],
};

export type LayoutServiceModel = {
  model: {
    name: string,
    fields: {
      detKey: {
        value: string,
      },
    },
    modelYear: {
      name: string,
      trims: LayoutServiceTrim[],
    },
  },
};
