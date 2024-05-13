import PropTypes from 'prop-types';

export default {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        model: PropTypes.shape({
          fields: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            crankshaft: PropTypes.shape({
              name: PropTypes.string,
              crankshaftName: PropTypes.shape({
                value: PropTypes.string,
              }),
              series: PropTypes.shape({
                name: PropTypes.string,
              }),
            }),
            modelName: PropTypes.shape({
              value: PropTypes.string,
            }),
            tagline: PropTypes.shape({
              value: PropTypes.string,
            }),
            thumbnails: PropTypes.shape({
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
            keyFeatures: PropTypes.shape({
              item: PropTypes.arrayOf(
                PropTypes.shape({
                  application: PropTypes.shape({
                    value: PropTypes.string,
                  }),
                }),
              ),
            }),
          }),
        }),
      }),
    }),
  }),
  params: PropTypes.shape({
    autoId: PropTypes.string,
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
    bottomMargin: PropTypes.string,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};
