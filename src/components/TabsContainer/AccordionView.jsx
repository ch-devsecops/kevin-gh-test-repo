import React, { useState } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Accordion, useAccordion, Copy } from '@honda-canada/design-system-react';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import Placeholders from './Placeholders';

const AccordionView = ({ rendering, tabs = [], gtmTags, isDark }) => {
  const [activeItems, setActiveItems] = useState([0]);

  const accordionItems = tabs.map((item, index) => {
    const Title = getTitleComponent(item.title, Copy);

    return {
      key: index,
      title: (
        <Title pl={5} fontWeight="bold" size="small" color={isDark ? 'white' : undefined}>
          {compiler(stripMarkdownHeading(item.title))}
        </Title>
      ),
      content: <Placeholders rendering={rendering} activeTabs={[index]} />,
      gtmTitle: item.gtmTitle,
    };
  });

  const accordionBehaviour = {
    ...useAccordion(accordionItems),
    defaultActiveItems: activeItems,
    isActive: key => activeItems.includes(key),
    toggleItem: key =>
      activeItems.includes(key)
        ? setActiveItems(activeItems.filter(index => index !== key))
        : setActiveItems(activeItems.concat(key)),
  };

  return (
    <Accordion
      items={accordionItems}
      behaviour={accordionBehaviour}
      isCompact
      gtmTags={gtmTags}
      colorStyling={isDark ? 'dark' : 'default'}
    />
  );
};

export default AccordionView;
