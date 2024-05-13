import React from 'react';
import ModelFeatures from '../../components/ModelFeatures';
import { darkSitecoreContext, mockData, mockSitecoreContext } from './componentProps';

export default {
  title: 'Standard / Additional Features',
  component: ModelFeatures,
  parameters: {
    layout: 'fullscreen',
  },
};

const iconImage = {
  item: {
    value: {
      src: '/sample-mock-data/media/img/PDF.png',
      alt: 'custom iconImage',
      width: '46',
      height: '45',
    },
  },
};
const customMock = (params, fieldsParams) => ({
  ...{
    params: {
      ...mockData.params,
      ...params,
    },
    fields: {
      data: {
        value: {
          ...mockData.fields.data.value,
          ...fieldsParams,
        },
      },
    },
  },
});

export const Default = ({ storyProps }) => <ModelFeatures {...storyProps} />;

Default.args = { storyProps: mockData, context: mockSitecoreContext };

export const OneColumn = ({ storyProps }) => <ModelFeatures {...storyProps} />;
OneColumn.args = { storyProps: customMock({ shownInColumns: 'one' }), context: mockSitecoreContext };

export const TwoColumns = ({ storyProps }) => <ModelFeatures {...storyProps} />;
TwoColumns.args = { storyProps: customMock({ shownInColumns: 'two' }), context: mockSitecoreContext };

export const ThreeColumns = ({ storyProps }) => <ModelFeatures {...storyProps} />;
ThreeColumns.args = { storyProps: customMock({ shownInColumns: 'three' }), context: mockSitecoreContext };

export const ThreeColumnsAdditionalFeatures = ({ storyProps }) => <ModelFeatures {...storyProps} />;
ThreeColumnsAdditionalFeatures.args = {
  storyProps: customMock({ shownInColumns: 'three' }, { isAdditionalFeatures: { value: true } }),
  context: mockSitecoreContext,
};

export const ThreeColumnsBackgroundAndDarkMode = ({ storyProps }) => <ModelFeatures {...storyProps} />;
ThreeColumnsBackgroundAndDarkMode.args = {
  storyProps: customMock({ shownInColumns: 'three', contentBgColour: 'Honda Black' }),
  context: darkSitecoreContext,
};

export const ThreeColumnsIconAbove = ({ storyProps }) => <ModelFeatures {...storyProps} />;
ThreeColumnsIconAbove.args = {
  storyProps: customMock({
    shownInColumns: 'three',
    checklistIconLocation: 'Above',
  }),
  context: mockSitecoreContext,
};

export const ThreeColumnsCustomIconImage = ({ storyProps }) => <ModelFeatures {...storyProps} />;
ThreeColumnsCustomIconImage.args = {
  storyProps: customMock(
    {
      shownInColumns: 'three',
    },
    { iconImage },
  ),
  context: mockSitecoreContext,
};
