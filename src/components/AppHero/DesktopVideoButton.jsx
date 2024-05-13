import React from 'react';
import PropTypes from 'prop-types';
import { Box, heroStyles, Icon, Media } from '@honda-canada/design-system-react';

const VideoButton = heroStyles.apply('button', 'VideoButton');

const getPositionLeft = (h, v) => h === 'right' && v === 'bottom' && 0;

const getPositionRight = (h, v) => {
  if (v === 'top' || (v === 'bottom' && h !== 'right')) return 0;
  if (v === 'bottom' && h !== 'right') return 0;

  return undefined;
};

const DesktopVideoButton = ({ video, horizontalAlignment, verticalAlignment }) =>
  video ? (
    <Media greaterThan="smallDesktop">
      <Box
        position="absolute"
        bottom={0}
        zIndex={1}
        px="s"
        left={getPositionLeft(horizontalAlignment, verticalAlignment)}
        right={getPositionRight(horizontalAlignment, verticalAlignment)}
      >
        <VideoButton onClick={video.onPlay} aria-label={video.ariaLabel} className="videoButton">
          <Icon name="play" iconSize="large" background="white" />
        </VideoButton>
      </Box>
    </Media>
  ) : null;

DesktopVideoButton.propTypes = {
  video: PropTypes.shape({
    ariaLabel: PropTypes.string,
    onPlay: PropTypes.func,
  }),
  horizontalAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  verticalAlignment: PropTypes.oneOf(['top', 'bottom']),
};

export default DesktopVideoButton;
