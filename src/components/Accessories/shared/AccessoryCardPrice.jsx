import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Copy } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';

import themeStyles from '../Accessories.styles';
import { useLanguage } from '../../../utils/sitecoreContext';
import Context from '../service/Context';

const PriceCopy = themeStyles.apply(Copy, 'PriceCopy');

const AccessoryCardPrice = ({ accessory }) => {
  const { isDark, hasPriceLabel, hasAsterisk, hasComingSoon, dictionary } = useContext(Context);
  const language = useLanguage();

  return (
    <PriceCopy type="tabs" isDark={isDark} data-testid="cy-accessory-card-price">
      {(accessory?.accessoryProvincialPrice &&
        `${hasPriceLabel ? `${dictionary.pspMsrpLabel} ` : ''}${formatPrice(
          accessory?.accessoryProvincialPrice,
          language,
          2,
        )}${hasAsterisk ? '*' : ''}`) ||
        (hasComingSoon && !accessory?.accessoryProvincialPrice && dictionary.comingSoonLabel)}
    </PriceCopy>
  );
};

AccessoryCardPrice.propTypes = {
  accessory: PropTypes.shape({}),
};

export default AccessoryCardPrice;
