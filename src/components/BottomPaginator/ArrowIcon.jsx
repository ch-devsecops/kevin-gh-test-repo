import React from 'react';
import { Icon, IconWrapper } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';

const ArrowIcon = ({ onClick, name, iconSize, iconColor, ariaLabel, ...rest }) => (
  <IconWrapper
    onClick={onClick}
    onKeyDown={keypressCallback(keyCodes.ENTER, onClick)}
    cursor="pointer"
    display="flex"
    role="button"
    size="md"
    tabIndex={0}
    aria-label={ariaLabel}
    {...rest}
  >
    <Icon name={name} iconSize={iconSize} iconColor={iconColor} />
  </IconWrapper>
);

ArrowIcon.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  dataTestId: PropTypes.string,
  ariaLabel: PropTypes.string,
  rest: PropTypes.shape({}),
};

export default ArrowIcon;
