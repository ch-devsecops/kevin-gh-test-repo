import React, { useContext, useRef } from 'react';
import { Media, Fade } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import MobilePagination, { ArrowControls } from './MobilePagination';
import Context from '../service/Context';

import { SplideSlideBadgeLabel as BadgeLabel } from '../TrimSpecifications.styles';

const MobileSliderHeader = ({ trims, showFooterPagination }) => {
  const mobileHeaderRef = useRef();
  const configurationProvider = useContext(Context);
  const { isDark, currentSlide, styles } = configurationProvider || {};
  const trimsLength = trims?.length;

  return (
    <Media at="mobile">
      {(mediaClassNames, renderChildren) =>
        renderChildren ? (
          <div className={mediaClassNames}>
            <Fade duration="t5" zIndex="modal" position="fixed" top={styles?.badgePosition} width="100%" aria-hidden>
              <ArrowControls
                length={trimsLength}
                backgroundColor={isDark ? 'black' : 'white'}
                borderBottom="solid 1px"
                borderColor="grey.2"
                pb="m"
                containerRef={mobileHeaderRef}
              >
                {() => (
                  <BadgeLabel size="regular" isDark={isDark} data-testid="cy-mobile-product">
                    {compiler(trims?.[currentSlide]?.name)}
                  </BadgeLabel>
                )}
              </ArrowControls>
            </Fade>

            <MobilePagination
              length={trimsLength}
              position="fixed"
              bottom={0}
              backgroundColor={isDark ? 'black' : 'white'}
              height="64px"
              pb="l"
              width="100%"
              boxShadow={styles?.slider?.pagination?.boxShadow}
              zIndex="modal"
              opacity={showFooterPagination ? 1 : 0}
            />
          </div>
        ) : null
      }
    </Media>
  );
};

export default MobileSliderHeader;
