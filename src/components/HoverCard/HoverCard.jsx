import React from 'react';
import PropTypes from 'prop-types';
import { Box, Media } from '@honda-canada/design-system-react';
import MobileHoverCard from './MobileHoverCard';
import DesktopHoverCard from './DesktopHoverCard';

const HoverCard = props => {
  const { anchorId, desktopImage, mobileImage, title, bodyText, ctas, gtmTags = {} } = props;

  const containerStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <>
      <Media greaterThan="mobile">
        {(mediaClassNames, renderChildren) => (
          <Box className={mediaClassNames} {...containerStyle}>
            {renderChildren ? (
              <DesktopHoverCard
                image={desktopImage}
                title={title}
                bodyText={bodyText}
                ctas={ctas}
                anchorId={anchorId}
                gtmTags={gtmTags}
              />
            ) : null}
          </Box>
        )}
      </Media>
      <Media at="mobile">
        {(mediaClassNames, renderChildren) => (
          <Box className={mediaClassNames} {...containerStyle}>
            {renderChildren ? (
              <MobileHoverCard
                image={mobileImage}
                title={title}
                bodyText={bodyText}
                ctas={ctas}
                anchorId={anchorId}
                gtmTags={gtmTags}
              />
            ) : null}
          </Box>
        )}
      </Media>
    </>
  );
};

HoverCard.propTypes = {
  mobileImage: PropTypes.element,
  desktopImage: PropTypes.element,
  /**
   * Markdown enabled text
   */
  title: PropTypes.string,
  /**
   * Markdown enabled text
   */
  bodyText: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.element),
  anchorId: PropTypes.string,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default HoverCard;
