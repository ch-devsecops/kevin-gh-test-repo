import { Box, Icon, Media, heroStyles } from '@honda-canada/design-system-react';

import PropTypes from 'prop-types';
import React from 'react';

const VideoButton = heroStyles.apply('button', 'VideoButton');

const MobileVideoButton = ({ video }) =>
  video ? (
    <Media lessThan="desktop">
      <Box pt={['xl', 'big']} display="flex" justifyContent="center">
        <VideoButton onClick={video.onPlay} aria-label={video.ariaLabel} className="videoButton">
          <Icon name="play" iconSize="large" background="white" />
        </VideoButton>
      </Box>
    </Media>
  ) : null;

MobileVideoButton.propTypes = {
  video: PropTypes.shape({
    ariaLabel: PropTypes.string,
    onPlay: PropTypes.func,
  }),
};

export default MobileVideoButton;
