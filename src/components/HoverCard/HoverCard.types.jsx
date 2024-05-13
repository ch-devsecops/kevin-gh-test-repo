import PropTypes from 'prop-types';

export default {
  image: PropTypes.element,
  title: PropTypes.string,
  bodyText: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  anchorId: PropTypes.string,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
};
