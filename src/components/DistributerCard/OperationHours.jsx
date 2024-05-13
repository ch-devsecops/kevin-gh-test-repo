import { Copy, Box } from '@honda-canada/design-system-react';
import * as PropTypes from 'prop-types';
import React from 'react';
import themeStyles from './DistributerCard.styles';

const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');

const OperationHours = ({ items = [], ...rest }) => {
  if (!items.length) return null;

  return (
    <Box {...rest}>
      <table>
        <tbody>
          {items.map(item => (
            <tr key={item?.id}>
              <td>
                <StyledCopy pr="default">{item?.day}</StyledCopy>
              </td>
              <td>
                <StyledCopy>{item?.hours}</StyledCopy>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

OperationHours.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      day: PropTypes.string,
      hours: PropTypes.string,
    }),
  ),
};

export default OperationHours;
