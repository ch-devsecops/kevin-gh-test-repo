import { useState } from 'react';
import type { Thumbnail } from './interfaces/Model.interfaces';

type Thumbnails = {
  primaryThumbnail: Thumbnail,
  secondaryThumbnail: Thumbnail,
};

/**
 * Control hover UI state, returns styling variants and event handlers
 *
 */
const useHoverState = ({ primaryThumbnail, secondaryThumbnail }: Thumbnails) => {
  const [hover, setHover] = useState(false);

  const backgroundColor = hover ? 'grey.4' : undefined;
  const thumbnail = hover ? secondaryThumbnail : primaryThumbnail;

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setHover(true);
  };
  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setHover(false);
  };

  return { thumbnail, backgroundColor, onMouseEnter, onMouseLeave };
};

export default useHoverState;
