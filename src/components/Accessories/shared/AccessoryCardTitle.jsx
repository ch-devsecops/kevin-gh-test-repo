import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Copy, H6, Optional } from '@honda-canada/design-system-react';
import Context from '../service/Context';

import themeStyles from '../Accessories.styles';

const AccessoryPartNumberCopy = themeStyles.apply(Copy, 'AccessoryPartNumberCopy');

const AccessoryCardTitle = ({ accessory }) => {
  const { isDark, hasPartNumber, dictionary } = useContext(Context);

  return (
    <>
      <H6 color={isDark ? 'white' : 'default'} data-testid="cy-accessory-card-title">
        {accessory?.accessoryName}
      </H6>
      <Optional when={hasPartNumber}>
        <AccessoryPartNumberCopy data-testid="cy-accessory-card-part-number">
          {dictionary.partNumberLabel} {accessory?.accessoryNumber}
        </AccessoryPartNumberCopy>
      </Optional>
    </>
  );
};

AccessoryCardTitle.propTypes = {
  accessory: PropTypes.shape({}),
};

export default AccessoryCardTitle;
