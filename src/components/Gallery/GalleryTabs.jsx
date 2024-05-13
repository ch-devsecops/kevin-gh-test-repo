import React from 'react';
import PropTypes from 'prop-types';
import { Column, Copy, Row } from '@honda-canada/design-system-react';
import themeStyles from './Gallery.styles';
import { getGtmTagValue } from '../../utils/gtmEvents';

const GalleryTab = themeStyles.apply(Column, 'GalleryTab');
const GalleryTabTitle = themeStyles.apply(Copy, 'GalleryTabTitle');

const GalleryTabs = ({ tabs = [], setActiveTab, activeTab, isDark, isFullScreenMobile }) => (
  <Row pl={['m', 'm', 'zero']} backgroundColor={isDark && !isFullScreenMobile ? 'black' : 'white'}>
    {tabs?.map((tab, i) =>
      tab.title ? (
        <GalleryTab
          as="button"
          key={i.toString()}
          isActive={activeTab === i}
          onClick={() => setActiveTab(i)}
          data-gtm-title={getGtmTagValue(tab?.gtmTitle)}
          data-gtm-model={getGtmTagValue(tab?.modelName)}
          data-gtm-body-style={getGtmTagValue(tab?.bodyStyle)}
          data-gtm-interaction-type={getGtmTagValue(tab?.interactionType)}
        >
          <GalleryTabTitle size="small" color={isDark && !isFullScreenMobile ? 'white' : 'black'}>
            {tab.title}
          </GalleryTabTitle>
        </GalleryTab>
      ) : null,
    )}
  </Row>
);

GalleryTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      gtmTitle: PropTypes.string,
      modelName: PropTypes.string,
      bodyStyle: PropTypes.string,
      interactionType: PropTypes.string,
    }),
  ),
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.number,
  isDark: PropTypes.bool,
};

export default GalleryTabs;
