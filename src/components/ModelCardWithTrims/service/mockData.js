export const Model = {
  NameBadge: '/data/media/img/model-card-with-trims/badge.svg',
  Year: {
    Tagline: 'Compact Sport Sedan',
  },
  ModelKey: 'rdx',
  ModelYear: 2020,
  Trims: [
    {
      TrimName: 'trim name',
      TrimKey: 'rdx_10226',
      TrimThumbnails: {
        PrimaryThumbnail: {
          src: '/data/media/img/model-card-with-trims/primary-thumbnail.png',
          alt: 'Primary thumbnail',
        },
      },
      NameBadge: '/data/media/img/model-card-with-trims/trim-badge.svg',
      DefaultTransmision: '10201-Automatic',
      Transmissions: [
        {
          Name: 'Transmission A',
          TransmissionModelCode: '10201-Automatic',
          IsBuildable: true,
          HasSpecs: true,
          InteriorColorKey: 'kkebony_leatherette_^my20_ilx',
          ExteriorColorKey: 'bkebony_leatherette_^my20_rdx',
        },
        {
          Name: 'Transmission B',
          TransmissionModelCode: 'transmission-b',
          IsBuildable: true,
          HasSpecs: false,
        },
        {
          Name: 'Transmission C',
          TransmissionModelCode: 'transmission-c',
          IsBuildable: false,
          HasSpecs: true,
        },
        {
          Name: 'Transmission D',
          TransmissionModelCode: 'transmission-d',
          IsBuildable: false,
          HasSpecs: false,
        },
      ],
    },
  ],
};

export const strings = {
  Shared: {
    ModelCardWithTrims: {
      exploreModelLabel: 'Explore Model',
      msrpStartingFromLabel: 'MSRP Starting From*',
      offersAvailableLabel: 'Offers Available',
      buildAndPriceLabel: 'Build & Price',
      viewTrimSpecsLabel: 'View Trim Specs',
      priceErrorLabel: 'Unable to load pricing. Please reload the page',
    },
  },
};

export default { Model, strings };
