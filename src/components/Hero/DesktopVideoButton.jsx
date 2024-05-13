import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, useThemeContext, Media } from '@honda-canada/design-system-react';

const VideoButtonIcon = ({ isHovering }) => {
  const colors = useThemeContext('colors');
  const color = isHovering ? colors.black : colors.white;

  return (
    <svg
      style={{ marginLeft: '8px', position: 'relative', top: '1px' }}
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0V12L8 6L0 0Z" fill={color} />
    </svg>
  );
};

VideoButtonIcon.propTypes = {
  isHovering: PropTypes.bool,
};

const DesktopVideoButton = ({ video, gtmTags }) => {
  const [videoHover, setVideoHover] = useState(false);

  if (!video) return null;

  return (
    <Media greaterThanOrEqual="smallDesktop">
      <Button
        styling="secondaryDark"
        onClick={video.onPlay}
        onMouseEnter={() => setVideoHover(true)}
        onMouseLeave={() => setVideoHover(false)}
        aria-label={video.ariaLabel}
        mt={[2, 4]}
        {...gtmTags}
      >
        {video.buttonLabel}
        <VideoButtonIcon isHovering={videoHover} />
      </Button>
    </Media>
  );
};

DesktopVideoButton.propTypes = {
  video: PropTypes.shape({
    ariaLabel: PropTypes.string,
    onPlay: PropTypes.func,
    buttonLabel: PropTypes.string,
  }),
};

export default DesktopVideoButton;
