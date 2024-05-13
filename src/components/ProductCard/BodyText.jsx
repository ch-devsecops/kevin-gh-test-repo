import React, { useContext, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Markdown, Box } from '@honda-canada/design-system-react';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import isSSR from '../../utils/isSSR';
import SimilarRecentlyViewedContext from '../SimilarRecentlyViewedProducts/SimilarRecentlyViewedContext';
import SimpleStyle from '../../utils/propTypes/simple';

const BodyText = ({ text, py, mt, size }) => {
  const { minBodyTextHeight, setMinBodyTextHeight } = useContext(SimilarRecentlyViewedContext);

  const bodyTextRef = useRef();

  useLayoutEffect(() => {
    if (isEditorActive() || isSSR()) return;
    // dynamically adjust bodyText height to maintain cards alignment
    const measuredHeight = parseInt(
      getComputedStyle(bodyTextRef.current).getPropertyValue('height').replace('px', ''),
      10,
    );

    if (measuredHeight > minBodyTextHeight) {
      setMinBodyTextHeight(measuredHeight);
    }
  }, [minBodyTextHeight]);

  return (
    <Box
      ref={bodyTextRef}
      flexGrow="1 !important"
      minHeight={['default', 'default', minBodyTextHeight]}
      py={py}
      mt={mt}
    >
      <Markdown size={size}>{text}</Markdown>
    </Box>
  );
};

BodyText.defaultProps = {
  size: ['xSmall', 'small'],
};

BodyText.propTypes = {
  text: PropTypes.string,
  size: SimpleStyle,
};

export default BodyText;
