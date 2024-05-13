import React, { useState, useEffect } from 'react';
import { Box, Dropdown, H5 } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import Placeholders from './Placeholders';

const Title = styled(H5)({
  paddingLeft: '20px',
  paddingRight: '20px',
});
const StyledDropdown = styled(Dropdown)({
  marginBottom: '48px',
});

const getDropdownOptions = items => {
  if (!items || items.length === 0) return [];
  return items.map(item => ({
    text: item.title,
    value: item.title,
  }));
};

const DropdownView = ({ rendering, title, toggleItems = [], pageEditing, gtmTags = {} }) => {
  const [selected, updateSelected] = useState(null);
  useEffect(() => {
    if (toggleItems && toggleItems.length > 0) {
      updateSelected(toggleItems[0].title);
    }
  }, [toggleItems]);

  const dropdownItems = toggleItems && getDropdownOptions(toggleItems);
  const anchorId = rendering?.fields?.anchorId?.value;
  return (
    <Box id={anchorId} data-gtm-component-type={gtmTags.type} data-gtm-category={gtmTags.category}>
      <Title textAlign="center">{title}</Title>
      <Box px={['20px', 'zero']}>
        <StyledDropdown
          width={['100%', '400px']}
          mx="auto"
          mt="default"
          placeholderText=""
          styling="secondary"
          inputProps={{ style: { textAlign: 'left' } }}
          value={selected}
          options={dropdownItems}
          onChange={value => updateSelected(value)}
        />
      </Box>
      <Placeholders
        rendering={rendering}
        activeItem={dropdownItems.findIndex(item => item.text === selected)}
        pageEditing={pageEditing}
      />
    </Box>
  );
};

export default DropdownView;
