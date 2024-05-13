import React from 'react';
import EmbeddedGoogleMap from '../../components/EmbeddedGoogleMap';

export default {
  title: 'Embedded GoogleMap',
  component: EmbeddedGoogleMap,
};

const Template = () => (
  <EmbeddedGoogleMap
    options={{
      lat: 43.65107,
      lng: -79.347015,
      zoom: 10,
    }}
  />
);

export const Default = Template.bind({});
