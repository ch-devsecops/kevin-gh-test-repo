import React from 'react';
import PropTypes from 'prop-types';
import { Copy, Box, Icon } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import TooltipWithMarkdown from '../../utils/TooltipWithMarkdown';

const ModelCardTrimPrice = ({ price, label, tooltipLabel, language }) => (
  <>
    <Box display="flex">
      <Copy display="flex" alignItems="center" size="extraSmall" height="22px">
        {label}
      </Copy>
      <TooltipWithMarkdown as="span" content={tooltipLabel} ariaLabel={tooltipLabel} ml="xs">
        {({ active }) => <Icon name="information" filled={active} />}
      </TooltipWithMarkdown>
    </Box>
    <Copy size="quoteBody" fontWeight="bold">
      {formatPrice(price, language)}
    </Copy>
  </>
);

ModelCardTrimPrice.propTypes = {
  price: PropTypes.number,
  label: PropTypes.string,
  tooltipLabel: PropTypes.string,
  language: PropTypes.string,
};

export default ModelCardTrimPrice;
