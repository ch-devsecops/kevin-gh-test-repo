import React from 'react';
import { UserLocationContext } from '@honda-canada/user-location';
import TrimSpecifications from '../../components/TrimSpecifications';
import trimSpecificationsMockData from './componentProps';
import provinces from '../../sitecoreContextMocks/provinces';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Trim Specifications',
  component: TrimSpecifications,
};

const sitecoreContextMock = {
  ...sitecoreContext.honda,
  provinces,
};

const Template = ({ storyProps }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <UserLocationContext.Provider value={{ provinceCode: 'AB' }}>
    <TrimSpecifications sitecoreContext={sitecoreContextMock} {...storyProps} />
  </UserLocationContext.Provider>
);

export const Honda = Template.bind({});
Honda.args = { storyProps: trimSpecificationsMockData, context: sitecoreContextMock };
