import PropTypes from 'prop-types';

const SimpleStyle = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]);

export default SimpleStyle;
