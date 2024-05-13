import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import PropTypes from 'prop-types';
import { ThreeColumnLayout } from '@honda-canada/design-system-react';
import LayoutProvider from '../LayoutContext';

const columnNames = ['column-one', 'column-two', 'column-three'];

const ThreeColumnLayoutContainer = ({ params = {}, rendering }) => {
  if (!rendering) return null;

  const { placeholders } = rendering;
  const hasPackageCardLink = columnNames.some(name => placeholders?.[name]?.[0]?.componentName === 'LinkPackageCard');
  const horizontalMargin = params?.horizontalMargin;
  const columnGap = horizontalMargin / 2 || 0;
  return (
    <ThreeColumnLayout
      bottomMargin={params?.bottomMargin}
      topMargin={params?.topMargin}
      makeFullWidth={params?.makeFullWidth}
      verticalAlignment={params?.verticalAlignment}
      columnGap={columnGap}
      splitOnTablet={params?.splitOnTablet}
      mobileOnTablet={hasPackageCardLink}
      columnOne={
        placeholders?.['column-one'].length > 0 ? (
          <LayoutProvider layoutName={rendering.componentName} columnName="column-one" params={params}>
            <Placeholder name="column-one" rendering={rendering} />
          </LayoutProvider>
        ) : null
      }
      columnTwo={
        placeholders?.['column-two'].length > 0 ? (
          <LayoutProvider layoutName={rendering.componentName} columnName="column-two" params={params}>
            <Placeholder name="column-two" rendering={rendering} />
          </LayoutProvider>
        ) : null
      }
      columnThree={
        placeholders?.['column-three'].length > 0 ? (
          <LayoutProvider layoutName={rendering.componentName} columnName="column-three" params={params}>
            <Placeholder name="column-three" rendering={rendering} />
          </LayoutProvider>
        ) : null
      }
    />
  );
};

ThreeColumnLayoutContainer.propTypes = {
  params: PropTypes.shape({
    autoId: PropTypes.string,
    bottomMargin: PropTypes.string,
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
    dataSource: PropTypes.string,
    fields: PropTypes.shape({}),
    params: PropTypes.shape({
      autoId: PropTypes.string,
      bottomMargin: PropTypes.string,
      horizontalMargin: PropTypes.string,
      topMargin: PropTypes.string,
    }),
    placeholders: PropTypes.shape({}),
  }),
};

export default ThreeColumnLayoutContainer;
