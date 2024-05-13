import PropTypes from 'prop-types';

const compnentProps = {
  pricing: PropTypes.bool,
  fields: PropTypes.shape({
    modelName: PropTypes.shape({
      value: PropTypes.string,
    }),
    tagline: PropTypes.shape({
      value: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      value: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        ),
      }),
    }),
    thumbnail: PropTypes.shape({
      value: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        ),
      }),
    }),
    modelPage: PropTypes.shape({
      field: PropTypes.shape({
        fields: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    compareTitle: PropTypes.string,
    seriesName: PropTypes.string,
    componentName: PropTypes.string,
    crankshaftName: PropTypes.string,
    interactionType: PropTypes.string,
    compareInteractionType: PropTypes.string,
  }),
};

export default compnentProps;
