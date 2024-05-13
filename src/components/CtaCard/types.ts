export interface CtaLinkValue {
  href: string;
  linktype: string;
  anchor: string;
  target: string;
  text: string;
  url: string;
}

export interface GtmCategoryFields {
  value: {
    value: string;
  };
}

export interface FieldValue<T = string> {
  value: T;
}

export interface FieldsProp {
  subtitle: FieldValue;
  title: FieldValue;
  anchorId: FieldValue;
  gtmCategory: FieldValue<GtmCategoryFields>;
  gtmTitle: FieldValue;
  gtmBodyStyle: FieldValue;
  gtmInteractionType: FieldValue;
  gtmTrimName: FieldValue;
  gtmModelName: FieldValue;
  ctaImage: FieldValue<object>;
  ctaType: FieldValue;
  ctaIcon: null;
  ctaLink: FieldValue<CtaLinkValue>;
}

export interface CtaCardProps {
  fields: FieldsProp;
  rendering: any;
}
