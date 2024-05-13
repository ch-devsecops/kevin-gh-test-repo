import PropTypes from 'prop-types';

export default {
  transmissions: PropTypes.arrayOf(
    PropTypes.shape({
      detKey: PropTypes.shape({
        value: PropTypes.string,
      }),
      detIdentifier: PropTypes.shape({
        value: PropTypes.string,
      }),
      sotId: PropTypes.shape({
        value: PropTypes.string,
      }),
      transmissionName: PropTypes.shape({
        value: PropTypes.string,
      }),
      modelCode: PropTypes.shape({
        value: PropTypes.string,
      }),
      hidePriceAndFinance: PropTypes.shape({
        value: PropTypes.string,
      }),
      defaultExteriorColor: PropTypes.shape({
        item: PropTypes.shape({
          id: PropTypes.string,
          url: PropTypes.string,
          name: PropTypes.string,
          displayName: PropTypes.string,
          fields: PropTypes.shape({
            primaryImage: PropTypes.shape({
              value: PropTypes.shape({
                src: PropTypes.string,
                alt: PropTypes.string,
                width: PropTypes.string,
                height: PropTypes.string,
              }),
            }),
            studioAssets: PropTypes.shape({
              id: PropTypes.string,
              url: PropTypes.string,
              name: PropTypes.string,
              displayName: PropTypes.string,
              fields: PropTypes.shape({}),
            }),
            color: PropTypes.shape({
              id: PropTypes.string,
              url: PropTypes.string,
              name: PropTypes.string,
              displayName: PropTypes.string,
              fields: PropTypes.shape({
                colorName: PropTypes.shape({
                  value: PropTypes.string,
                }),
                swatch: PropTypes.shape({
                  value: PropTypes.shape({
                    src: PropTypes.string,
                    alt: PropTypes.string,
                    width: PropTypes.string,
                    height: PropTypes.string,
                  }),
                }),
                detIdentifier: PropTypes.shape({
                  value: PropTypes.string,
                }),
                detKey: PropTypes.shape({
                  value: PropTypes.string,
                }),
                hexValue: PropTypes.shape({
                  value: PropTypes.string,
                }),
              }),
            }),
          }),
        }),
      }),
      exteriorColors: PropTypes.arrayOf(
        PropTypes.shape({
          colors: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              color: PropTypes.shape({
                item: PropTypes.shape({
                  id: PropTypes.string,
                  url: PropTypes.string,
                  name: PropTypes.string,
                  displayName: PropTypes.string,
                  fields: PropTypes.shape({
                    colorName: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    swatch: PropTypes.shape({
                      value: PropTypes.shape({
                        src: PropTypes.string,
                        alt: PropTypes.string,
                        width: PropTypes.string,
                        height: PropTypes.string,
                      }),
                    }),
                    detIdentifier: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    detKey: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    hexValue: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                  }),
                }),
              }),
              primaryImage: PropTypes.shape({
                item: PropTypes.shape({
                  value: PropTypes.shape({
                    src: PropTypes.string,
                    alt: PropTypes.string,
                    width: PropTypes.string,
                    height: PropTypes.string,
                  }),
                }),
              }),
              threeSixtyAssets: PropTypes.shape({
                value: PropTypes.shape({}),
              }),
              landscapeAssets: PropTypes.shape({
                value: PropTypes.shape({}),
              }),
              studioAssets: PropTypes.shape({
                value: PropTypes.shape({
                  images: PropTypes.arrayOf(
                    PropTypes.shape({
                      name: PropTypes.string,
                      url: PropTypes.string,
                      alt: PropTypes.shape({
                        value: PropTypes.string,
                      }),
                      title: PropTypes.shape({
                        value: PropTypes.string,
                      }),
                    }),
                  ),
                }),
              }),
            }),
          ),
        }),
      ),
    }),
  ),
};
