import PropTypes from 'prop-types';

export default {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        model: PropTypes.shape({
          fields: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            modelName: PropTypes.shape({
              value: PropTypes.string,
            }),
            configurations: PropTypes.arrayOf(
              PropTypes.shape({
                items: PropTypes.arrayOf(
                  PropTypes.shape({
                    configurationName: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    name: PropTypes.string,
                    tagline: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    modelCode: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    detIdentifier: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                  }),
                ),
              }),
            ),
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
