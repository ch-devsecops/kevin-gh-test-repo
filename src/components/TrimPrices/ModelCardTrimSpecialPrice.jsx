import React from 'react';
import PropTypes from 'prop-types';
import { Copy, Box, Icon } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import TooltipWithMarkdown from '../../utils/TooltipWithMarkdown';

const ModelCardTrimSpecialPrice = ({ price, label, tooltipLabel, language }) => (
  <Copy size="small">
    {`${label} `}
    <Box as="span" fontWeight="bold" display="inline-flex" maxWidth={['100px', '100px', 'auto']}>
      {formatPrice(price, language)}
      <TooltipWithMarkdown as="span" content={tooltipLabel} ariaLabel={tooltipLabel} ml="xs">
        {({ active }) => <Icon name="information" filled={active} />}
      </TooltipWithMarkdown>
    </Box>
  </Copy>
);

ModelCardTrimSpecialPrice.propTypes = {
  price: PropTypes.number,
  label: PropTypes.string,
  tooltipLabel: PropTypes.string,
  language: PropTypes.string,
};

export default ModelCardTrimSpecialPrice;
