import React, { useContext } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Media } from '@honda-canada/design-system-react';
import AccordionView from './AccordionView';
import TabbedView from './TabbedView';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { mapGTMCategory } from '../../utils/sitecoreFields';

const TabsContainer = ({ rendering, sitecoreContext, fields }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};

  if (!rendering) return null;
  const { isDark } = modelExplorationContext;
  const { tabsOnMobile } = fields;
  const { placeholders, renderingFields = fields } = rendering;
  const { pageEditing } = sitecoreContext;

  const tabs = placeholders['tabs-content']
    .filter(tab => tab?.fields?.title)
    .map(tab => ({
      title: tab.fields.title.value,
      gtmTitle: tab.fields?.gtmTitle?.value,
    }));

  const gtmTags = {
    type: rendering.componentName,
    category: mapGTMCategory(renderingFields?.gtmCategory),
    interactionType: renderingFields?.gtmInteractionType?.value,
  };

  // Support only Tabbed View for Experience Editor
  if (pageEditing) {
    return (
      <div style={{ minHeight: '100px' }}>
        <TabbedView rendering={rendering} tabs={tabs} pageEditing={pageEditing} isDark={isDark} />
      </div>
    );
  }

  if (tabsOnMobile?.value) {
    return <TabbedView rendering={rendering} tabs={tabs} gtmTags={gtmTags} isDark={isDark} />;
  }

  return (
    <>
      <Media at="mobile">
        <AccordionView rendering={rendering} tabs={tabs} gtmTags={gtmTags} isDark={isDark} />
      </Media>
      <Media greaterThan="mobile">
        <TabbedView rendering={rendering} tabs={tabs} gtmTags={gtmTags} isDark={isDark} />
      </Media>
    </>
  );
};

export default withSitecoreContext()(TabsContainer);
