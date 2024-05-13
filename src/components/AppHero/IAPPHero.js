import PropTypes from 'prop-types';

export default {
  seoH1: PropTypes.shape({
    field: PropTypes.shape({ value: PropTypes.string }),
  }).isRequired,
  title: PropTypes.shape({
    field: PropTypes.shape({ value: PropTypes.string }),
  }).isRequired,
  subtitle: PropTypes.shape({
    field: PropTypes.shape({ value: PropTypes.string }),
  }),
  desktopImage: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        src: PropTypes.string,
      },
    }),
  }),
  mobileImage: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        src: PropTypes.string,
      },
    }),
  }),
  ctaImage1: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        src: PropTypes.string,
      },
    }),
  }),
  ctaImage2: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        src: PropTypes.string,
      },
    }),
  }),
  ctaImageLink1: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        href: PropTypes.string,
      },
    }),
  }),
  ctaImageLink2: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        href: PropTypes.string,
      },
    }),
  }),
  ctaUrl: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        href: PropTypes.string,
      },
    }),
  }),
  ctaType: PropTypes.shape({
    field: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
  badgeImage: PropTypes.shape({
    field: PropTypes.shape({
      value: {
        src: PropTypes.string,
      },
    }),
  }),
  videoUrl: PropTypes.shape({
    value: PropTypes.shape({
      anchor: PropTypes.string,
      href: PropTypes.string,
      linktype: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
  gtmTitle: PropTypes.shape({
    value: PropTypes.string,
  }),
  gtmCategory: PropTypes.shape({
    value: {
      src: PropTypes.string,
    },
  }),
  gtmInteractionType: PropTypes.shape({
    value: {
      src: PropTypes.string,
    },
  }),
};
