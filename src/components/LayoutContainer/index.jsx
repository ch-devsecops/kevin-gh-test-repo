import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Column, Wrapper } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import LayoutProvider from '../LayoutContext';

const columnNames = ['column-one', 'column-two'];

const getReduceWidthRoute = fields => fields?.reduceWidth?.value || false;

const LayoutContainer = ({ fields, params, rendering }) => {
  if (!rendering) return null;
  const { anchorId } = wrapJSSFields(fields);
  const isReduceWidth = getReduceWidthRoute(fields);
  const { makeFullWidth, horizontalMargin, verticalAlignment, fullWidthOnMobile, columnsOnMobile, bottomMargin } =
    params;
  const placeholders = Object.keys(rendering.placeholders);
  const areTwoColumnsOnMobile = params?.columnsOnMobile === 'Two' && placeholders.length === 2;
  const flexDirection = areTwoColumnsOnMobile ? 'row' : ['column', 'row'];
  const height = areTwoColumnsOnMobile ? ['100%', 'auto'] : 'auto';
  const Container = makeFullWidth ? React.Fragment : Wrapper;
  const desktopPadding = horizontalMargin && `${horizontalMargin / 2}px`;
  const fullWidthPadding = makeFullWidth && 'zero';
  const isTwoColumn = Object.keys(rendering.placeholders).length === 2;
  const enableFullWidthOnMobile = (columnsOnMobile === 'One' || !columnsOnMobile) && fullWidthOnMobile && isTwoColumn;
  const mobileOnTablet = columnNames.some(
    name => rendering.placeholders[name]?.[0]?.componentName === 'LinkPackageCard',
  );

  let containerPL;
  let containerPR;
  if (enableFullWidthOnMobile) {
    const containerPadding = ['0px !important', '4px !important']; // adding !important to override default padding of wrapper

    containerPL = (fullWidthOnMobile === 'Left' || fullWidthOnMobile === 'Both') && containerPadding;
    containerPR = (fullWidthOnMobile === 'Right' || fullWidthOnMobile === 'Both') && containerPadding;
  }

  let mobileFullWidthPL;
  let mobileFullWidthPR;
  if (enableFullWidthOnMobile) {
    mobileFullWidthPL = (fullWidthOnMobile === 'Left' || fullWidthOnMobile === 'Both') && 'zero';
    mobileFullWidthPR = (fullWidthOnMobile === 'Right' || fullWidthOnMobile === 'Both') && 'zero';
  }

  const columnMobilePL = mobileFullWidthPL || fullWidthPadding || 'columnGap.0';
  const columnMobilePR = mobileFullWidthPR || fullWidthPadding || 'columnGap.0';

  const getVerticalAlignmentStyle = isVerticallyAligned =>
    isVerticallyAligned && {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    };

  const getLayoutItems = () =>
    placeholders.map((item, i, items) => {
      let width = [1, 1 / items.length];

      if (areTwoColumnsOnMobile) {
        width = [1 / 2, 1 / items.length];
      }

      if (mobileOnTablet) {
        width = [1, 1, 1 / items.length];
      }

      if (isReduceWidth) {
        width = [1, 0.333333];
      }

      if (rendering.placeholders[item].length === 0) {
        return null;
      }

      /**
       * Return padding based on fullWidthPadding and desktopPadding
       */
      const getPadding = () => {
        // first column
        if (i === 0) {
          return {
            pl: [
              columnMobilePL,
              mobileOnTablet ? columnMobilePL : fullWidthPadding || 'columnGap.1',
              fullWidthPadding || 'columnGap.1',
            ],
            pr: [columnMobilePR, mobileOnTablet ? columnMobilePR : desktopPadding, desktopPadding],
          };
        }

        // last column
        if (i === items.length - 1) {
          return {
            pl: [columnMobilePL, mobileOnTablet ? columnMobilePL : desktopPadding, desktopPadding],
            pr: [
              columnMobilePR,
              mobileOnTablet ? columnMobilePR : fullWidthPadding || 'columnGap.1',
              fullWidthPadding || 'columnGap.1',
            ],
          };
        }

        return {
          px: ['columnGap.0', desktopPadding],
        };
      };

      return (
        <Column
          key={i.toString()}
          width={width}
          height={height}
          mb={[
            bottomMargin && `${bottomMargin}px`, // on mobile, the bottom margin is applied to each column
            mobileOnTablet ? `${bottomMargin}px` : 0,
            0,
          ]}
          {...getPadding()}
        >
          <LayoutProvider layoutName={rendering.componentName} columnName={item} params={params}>
            <Placeholder name={item} rendering={rendering} />
          </LayoutProvider>
        </Column>
      );
    });

  return (
    <Container pl={containerPL} pr={containerPR}>
      <Row
        id={anchorId?.value}
        mb={params && params.bottomMargin && `${params.bottomMargin}px`}
        mt={params && params.topMargin && `${params.topMargin}px`}
        flexDirection={flexDirection}
        alignContent="center"
        justifyContent="center"
        {...getVerticalAlignmentStyle(!!verticalAlignment)}
      >
        {getLayoutItems()}
      </Row>
    </Container>
  );
};

LayoutContainer.propTypes = {
  fields: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
    dataSource: PropTypes.string,
    fields: PropTypes.shape({}),
    params: PropTypes.shape({
      bottomMargin: PropTypes.string,
      columnsOnMobile: PropTypes.string,
      horizontalMargin: PropTypes.string,
      topMargin: PropTypes.string,
    }),
    placeholders: PropTypes.shape({}),
    uid: PropTypes.string,
  }),
  params: PropTypes.shape({
    bottomMargin: PropTypes.string,
    columnsOnMobile: PropTypes.string,
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
  }),
};

export default LayoutContainer;
