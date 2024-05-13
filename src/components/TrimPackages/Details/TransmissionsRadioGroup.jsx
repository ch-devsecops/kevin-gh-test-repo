import React from 'react';
import { Copy as DsrCopy, RadioGroup as DsrRadioGroup } from '@honda-canada/design-system-react';
import ITransmissions from './ITransmissions';
import themeStyles from './TransmissionsRadioGroup.styles';

const Copy = themeStyles.apply(DsrCopy, 'Copy');
const RadioGroup = themeStyles.apply(DsrRadioGroup, 'RadioGroup');

const TransmissionsRadioGroup = ({ transmissions, isDark, title, defaultKey, toggleTransmission }) => {
  if (!transmissions) return null;

  const options = transmissions.map(item => ({
    text: item?.transmissionName?.value,
    value: item?.detKey?.value,
  }));

  const radioGroupStyles = {
    alignItems: 'start',
    justifyContent: ['center', 'center', 'normal'],
  };

  const radioGroupItemStyles = {
    mr: 'xs',
    mb: 0,
  };

  const radioGroupItemLabelStyles = {
    marginLeft: ['xs', 'xs', 0],
    marginRight: ['0', '0', 'default'],
    marginBottom: ['xs', 'xs', 'xxs'],
  };

  return (
    <>
      <Copy isDark={isDark} data-testid="transmission-title-label">
        {title}
      </Copy>
      <RadioGroup
        defaultValue={defaultKey}
        onChangeCallback={toggleTransmission}
        options={options}
        direction="row"
        radioGroupStyles={radioGroupStyles}
        radioGroupItemStyles={radioGroupItemStyles}
        radioGroupItemLabelStyles={radioGroupItemLabelStyles}
        styling="variant1"
      />
    </>
  );
};

TransmissionsRadioGroup.propTypes = ITransmissions;

export default TransmissionsRadioGroup;
