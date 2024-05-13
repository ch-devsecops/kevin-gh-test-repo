import React, { useContext, useEffect, useState } from 'react';
import { compiler } from 'markdown-to-jsx';
import {
  Box,
  Fade,
  Image,
  Media,
  Optional,
  Scale,
  ScrollPagination,
  TransitionCards,
  useMediaQueries,
  useThemeContext,
} from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import Row from './Row';
import getRows from './getRows';
import { ModelExplorationContext } from '../ModelExplorationContext';

const KeyFeatures = ({ fields, rendering }) => {
  const header = useThemeContext('header');
  const { isMobile, isSmallDesktop, isDesktop } = useMediaQueries();
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let stickyThreshold = 300;
  if (isSmallDesktop) stickyThreshold = 550;
  if (isDesktop) stickyThreshold = 400;

  if (!fields) return null;

  const { anchorId, gtmCategory } = fields;

  const performanceMetrics = fields?.items?.find(field => field?.displayName === 'KeyPerformanceMetrics')?.fields;
  const features = fields?.items?.find(field => field?.displayName === 'KeyFeatures')?.fields;
  const hasWatermark = fields?.watermark?.value?.src && fields?.watermarkOverlay?.value?.src;
  const mobileImagePositionTop = '70px'; // ModelPageNav height
  const desktopImagePositionTop = hasWatermark
    ? header?.desktop?.stickyHeight || header?.desktop?.height
    : header.desktop.stickyHeight - 20 || header.desktop.height - 20;

  const rows = [
    {
      title: compiler(fields?.title?.value || ''),
      bodyText: compiler(fields?.bodyText?.value || ''),
    },
    ...getRows(performanceMetrics?.items, features?.items, stickyThreshold < 550),
  ];

  const desktopRows = [
    {
      title: compiler(fields?.title?.value || ''),
      bodyText: compiler(fields?.bodyText?.value || ''),
    },
    ...getRows(performanceMetrics?.items, features?.items),
  ];

  return (
    <Box
      backgroundColor={isDark && 'black'}
      id={anchorId?.value}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
    >
      <Box
        position="sticky"
        maxWidth="768px"
        mx="auto"
        top={[mobileImagePositionTop, mobileImagePositionTop, desktopImagePositionTop]}
      >
        <InView threshold={1} triggerOnce>
          {({ inView, ref }) => (
            <>
              <Optional when={hasWatermark}>
                <Fade shouldAnimate={inView} initialOpacity={0} height="40px" justifyContent="center" display="flex">
                  <Image
                    {...fields?.watermark?.value}
                    mx="auto"
                    height="auto"
                    position="absolute"
                    top={['3px', '3px', 0]}
                    left={0}
                    maxWidth={['calc(100% - 6px)', 'calc(100% - 9px)', '750px']}
                  />
                </Fade>
                <Fade
                  shouldAnimate={inView}
                  initialOpacity={0}
                  delay="0.4s"
                  height={0}
                  justifyContent="center"
                  display="flex"
                >
                  <Image
                    {...fields?.watermarkOverlay?.value}
                    mx="auto"
                    height="auto"
                    position="absolute"
                    top={['6px', '9px', '6px']}
                    left={['6px', '9px', '6px']}
                    maxWidth={['calc(100% - 6px)', 'calc(100% - 9px)', '750px']}
                  />
                </Fade>
              </Optional>
              <Scale shouldAnimate={inView} ref={ref}>
                <Image
                  {...fields?.image?.value}
                  mb="l"
                  mx="auto"
                  height="auto"
                  width="auto"
                  // eslint-disable-next-line no-nested-ternary
                  style={{ maxWidth: isMobile ? '100%' : hasWatermark ? '75%' : '85%' }}
                />
              </Scale>
            </>
          )}
        </InView>
      </Box>
      <InView triggerOnce>
        {({ inView, ref }) =>
          isMounted ? (
            <div ref={ref}>
              <Media lessThan="smallDesktop">
                <TransitionCards
                  renderCardAs={props => (
                    <Row {...props} stickyThreshold={stickyThreshold} inView={inView} isDark={isDark} />
                  )}
                  cards={rows}
                  renderPaginationAs={props => (
                    <ScrollPagination {...props} triggerAt={stickyThreshold} pageHeight={70} />
                  )}
                  stickyAt={[`${stickyThreshold}px`]}
                  toggleVisibility={false}
                />
              </Media>
              <Media greaterThanOrEqual="smallDesktop">
                <TransitionCards
                  renderCardAs={props => (
                    <Row {...props} stickyThreshold={stickyThreshold} inView={inView} isDark={isDark} />
                  )}
                  cards={desktopRows}
                  renderPaginationAs={props => (
                    <ScrollPagination {...props} triggerAt={stickyThreshold - 150} pageHeight={100} />
                  )}
                  stickyAt={[`${stickyThreshold}px`]}
                  toggleVisibility={false}
                />
              </Media>
            </div>
          ) : null
        }
      </InView>
    </Box>
  );
};

export default KeyFeatures;
