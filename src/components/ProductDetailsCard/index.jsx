import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Box, Column, Media } from '@honda-canada/design-system-react';
import Card from './Card';
import themeStyles from './ProductDetailsCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const MobileColumn = themeStyles.apply(Column, 'MobileColumn');

const ProductDetailsCardWrapper = ({
  detId,
  title,
  subtitle,
  tagline,
  list,
  images,
  margins,
  gtmTags,
  actionButtonText,
  headingTitle,
  compareIconName,
  PriceComponent,
  prices,
}) => {
  const cardProps = {
    detId,
    title,
    subtitle,
    tagline,
    list,
    images,
    actionButtonText,
    headingTitle,
    compareIconName,
    PriceComponent,
    prices,
  };

  return (
    <Wrapper data-gtm-component-type={gtmTags?.componentName}>
      <Container data-testid="container" margins={margins}>
        <Media greaterThanOrEqual="desktop">
          <Card gtmTags={gtmTags} {...cardProps} />
        </Media>
        <Media lessThan="desktop">
          <MobileColumn>
            <Card gtmTags={gtmTags} {...cardProps} />
          </MobileColumn>
        </Media>
      </Container>
    </Wrapper>
  );
};

ProductDetailsCardWrapper.propTypes = {
  compareIconName: PropTypes.string,
  PriceComponent: PropTypes.func,
  actionButtonText: PropTypes.string,
  headingTitle: PropTypes.string,
  detId: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tagline: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      alt: PropTypes.shape({
        value: PropTypes.string,
      }),
      title: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  ),
  margins: PropTypes.shape({
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
    bottomMargin: PropTypes.string,
    horizontalMarginMob: PropTypes.string,
    topMarginMob: PropTypes.string,
    bottomMarginMob: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    addTitle: PropTypes.string,
    removeTitle: PropTypes.string,
    gtmTrimName: PropTypes.string,
    gtmSeriesName: PropTypes.string,
    gtmCrankshaftName: PropTypes.string,
    componentName: PropTypes.string,
    interactionType: PropTypes.string,
    removeInteractionType: PropTypes.string,
  }),
};

export default ProductDetailsCardWrapper;
