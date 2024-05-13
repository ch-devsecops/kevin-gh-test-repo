import React from 'react';
import PropTypes from 'prop-types';

import { Box, Markdown, Tooltip, Icon, useThemeContext, Media } from '@honda-canada/design-system-react';
import { ACURA_THEME_NAME } from '../../utils/constants';
import themeStyles from './PackageCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const FeaturedText = themeStyles.apply(Box, 'FeaturedText');
const Title = themeStyles.apply(Box, 'Title');
const PricingContainer = themeStyles.apply(Box, 'PricingContainer');
const HighlightText = themeStyles.apply(Box, 'HighlightText');
const BannerText = themeStyles.apply(Box, 'BannerText');
const SpecialOfferContainer = themeStyles.apply(Box, 'SpecialOfferContainer');

const PackageCard = ({
  featuredText,
  title,
  bannerText,
  highlightText,
  subtitle1,
  subtitle2,
  amount,
  tooltip = {},
  specialOfferLabel,
  specialOfferPrice,
  anchorId,
  linked = false,
  gtmTags = {},
  layoutContainer,
  children,
}) => {
  const { name } = useThemeContext();
  const hasPricingBanner = highlightText || specialOfferPrice;
  const copyColor = hasPricingBanner && 'white';
  const copySize = name === ACURA_THEME_NAME ? 'small' : 'regular';
  const copyFamily = name === ACURA_THEME_NAME ? 'default' : 'bold';
  const tooltipStyling = hasPricingBanner ? 'dark' : 'light';
  const tooltipTextColor = tooltipStyling === 'light' && 'white';
  const inBiggerColumn =
    layoutContainer === 'SingleColumnLayout' ||
    layoutContainer === 'TwoColumnLayout' ||
    layoutContainer === 'LayoutContainer'; // for local dev

  return (
    <Container
      id={anchorId}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
      inBiggerColumn={inBiggerColumn}
    >
      {featuredText && (
        <FeaturedText>
          <Markdown color="white">{featuredText}</Markdown>
        </FeaturedText>
      )}

      <Title linked={linked}>{title}</Title>

      {linked && (
        <BannerText hasContent={bannerText}>
          <Box maxWidth="514px">
            {bannerText && (
              <Markdown fontWeight="bold" fontFamily="heading">
                {bannerText}
              </Markdown>
            )}
          </Box>
        </BannerText>
      )}

      <PricingContainer hasBanner={hasPricingBanner} linked={linked}>
        {highlightText && (
          <HighlightText>
            <Markdown color={copyColor}>{highlightText}</Markdown>
          </HighlightText>
        )}

        {specialOfferPrice && (
          <Media lessThan="desktop">
            <Markdown color={copyColor} mb="xxs">
              {specialOfferLabel}
            </Markdown>
          </Media>
        )}

        <Markdown color={copyColor} size={copySize} fontFamily={copyFamily} mb={linked ? ['xxs', 'm'] : undefined}>
          {subtitle1}
        </Markdown>

        <Box position="relative" display="flex">
          {specialOfferPrice && (
            <SpecialOfferContainer>
              <Box
                // handles spacing from center of special offers container
                display="flex"
                justifyContent="flex-end"
                pr={['60px', '90px']}
              >
                <Media greaterThan="smallDesktop">
                  <Markdown pr="default" color={copyColor}>
                    {specialOfferLabel}
                  </Markdown>
                </Media>

                <Box>
                  <Markdown color={copyColor} size="pricing" textDecoration="line-through">
                    {specialOfferPrice}
                  </Markdown>
                </Box>
              </Box>
            </SpecialOfferContainer>
          )}

          <Box width="100%" display="flex" justifyContent="center">
            <Markdown color={copyColor} fontFamily="heading" size="pricingLarge" mb={linked ? ['xxs', 'm'] : undefined}>
              {amount}
            </Markdown>

            {tooltip?.content && (
              <Tooltip
                content={
                  <Markdown size="xSmall" color={tooltipTextColor}>
                    {tooltip.content}
                  </Markdown>
                }
                ariaLabel={tooltip.ariaLabel}
                closeAriaLabel={tooltip.closeAriaLabel}
                styling={tooltipStyling}
                ml="xxs"
                my={['xs', 's']}
                forceHorizontalPosition="left"
              >
                {({ active }) => (
                  <Box
                    width="16px" // iOS mobile / tablet fix
                    height="16px"
                  >
                    <Icon name="information" filled={active} inverted={tooltipStyling === 'dark'} />
                  </Box>
                )}
              </Tooltip>
            )}
          </Box>
        </Box>

        <Markdown color={copyColor} size={copySize} fontFamily={copyFamily}>
          {subtitle2}
        </Markdown>
      </PricingContainer>

      {children}
    </Container>
  );
};

PackageCard.propTypes = {
  /**
   * Top banner text
   */
  featuredText: PropTypes.string,
  /**
   * Text that Handles edge to edge banner
   */
  highlightText: PropTypes.string,
  bannerText: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  amount: PropTypes.string,
  tooltip: PropTypes.string,
  specialOfferLabel: PropTypes.string,
  specialOfferPrice: PropTypes.string,
  anchorId: PropTypes.string,
  /**
   * If true, keeps the banner text container even if banner text is not provided
   */
  linked: PropTypes.bool,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
  }),
  layoutContainer: PropTypes.string,
  children: PropTypes.element,
};

export default PackageCard;
