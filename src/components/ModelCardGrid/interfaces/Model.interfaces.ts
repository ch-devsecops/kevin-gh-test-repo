export interface DETProps {
  detIdentifier: string;
  detKey: string;
  sotId: string;
}

export interface Filters {
  [key: string]: string[];
}

export interface DefaultTransmissionItem extends DETProps {
  modelCode: string;
  defaultExteriorColor: {
    item: {
      color: {
        item: DETProps,
      },
    },
  };
}

export interface DefaultTransmission {
  item: DefaultTransmissionItem;
}

export interface Thumbnail {
  alt: string;
  src: string;
  height: string;
  width: string;
}

export interface DefaultTrim extends DETProps {
  trimName: string;
  name: string;
  primaryThumbnail: {
    item: Thumbnail,
  };
  secondaryThumbnail: {
    item: Thumbnail,
  };
  defaultTransmission: DefaultTransmission;
}

export interface Model extends DETProps {
  modelName: string;
  id: string;
  name: string;
  year: string;
  defaultTrim: DefaultTrim;
  defaultTrimName: string;
  filters: Filters;
}
