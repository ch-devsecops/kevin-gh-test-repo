import PropTypes from 'prop-types';

const IPriceFilter = PropTypes.shape({
  toggleContainerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.PropTypes.arrayOf(PropTypes.string)]),
  filterContainerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.PropTypes.arrayOf(PropTypes.string)]),
});

export default IPriceFilter;
