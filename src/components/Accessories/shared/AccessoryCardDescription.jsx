import React, { useContext } from 'react';
import { compiler } from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { Row, Optional } from '@honda-canada/design-system-react';

import themeStyles from '../Accessories.styles';
import Context from '../service/Context';

const DescriptionCopy = themeStyles.apply(Row, 'DescriptionCopy');

const AccessoryCardDescription = ({ accessory }) => {
  const { isDark, descriptionCopyOverflowStyles } = useContext(Context);

  return (
    <Optional when={accessory?.accessoryDescription}>
      <DescriptionCopy
        isDark={isDark}
        data-testid="cy-accessory-card-description"
        descriptionCopyOverflowStyles={descriptionCopyOverflowStyles}
      >
        {compiler(accessory?.accessoryDescription)}
      </DescriptionCopy>
    </Optional>
  );
};

AccessoryCardDescription.propTypes = {
  accessory: PropTypes.shape({}),
};

export default AccessoryCardDescription;
