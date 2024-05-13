import { useState } from 'react';
import { useThemeContext } from '@honda-canada/design-system-react';
import Sticky from 'react-stickynode';
import type { Status } from 'react-stickynode';
import stickyOffset from './utils/constants';

const useDetectSticky = () => {
  const headerHeight = useThemeContext('header');

  const [isSticky, setIsSticky] = useState(false);

  // Sticky position = Header height + height of other components.
  // If the "other components" requirement goes away, we can update this
  const stickyPosition = {
    desktop: parseInt(headerHeight?.desktop?.height, 10) + stickyOffset.desktop,
    mobile: stickyOffset.mobile + parseInt(headerHeight?.mobile?.height, 10),
  };

  const handleStateChange = (status: Status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    }
    if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };

  return { stickyPosition, isSticky, handleStateChange };
};

export default useDetectSticky;
