import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import PropTypes from 'prop-types';
import Panel from './Panel';
import getContentMargins from '../../utils/getContentMargins';

const AccordionItem = ({ rendering, gtmTags, activeTabs, setActiveTabs, gtmEventPayload, pageEditing, appName }) => {
  const accordionTitle = rendering?.fields?.title?.value;
  const margins = getContentMargins(rendering?.params);

  return (
    <Panel
      id={rendering?.uid}
      activeTabs={activeTabs}
      setActiveTabs={setActiveTabs}
      title={accordionTitle}
      margins={margins}
      pageEditing={pageEditing}
      appName={appName}
      gtmEventPayload={gtmEventPayload}
      {...gtmTags}
    >
      <Placeholder name="accordion-item-content" rendering={rendering} />
    </Panel>
  );
};

AccordionItem.propTypes = {
  rendering: PropTypes.shape({
    params: PropTypes.shape({
      innerTopMargin: PropTypes.string,
      innerBottomMargin: PropTypes.string,
      innerHorzMargin: PropTypes.string,
      innerTopMarginMob: PropTypes.string,
      innerBottomMarginMob: PropTypes.string,
      innerHorzMarginMob: PropTypes.string,
    }),
    placeholders: PropTypes.shape({ 'accordion-item-content': PropTypes.arrayOf(PropTypes.shape({})) }),
    fields: PropTypes.shape({ title: PropTypes.shape({ value: PropTypes.string }) }),
    uid: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    gtmTitle: PropTypes.string,
    trimName: PropTypes.string,
    bodyStyle: PropTypes.string,
    modelName: PropTypes.string,
    componentName: PropTypes.string,
    interactionType: PropTypes.string,
  }),
  activeTabs: PropTypes.arrayOf(PropTypes.string),
  setActiveTabs: PropTypes.func,
};

export default AccordionItem;
