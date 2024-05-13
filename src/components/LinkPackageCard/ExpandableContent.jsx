import React, { useState } from 'react';
import { Accordion, Copy, useAccordion } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import { stripMarkdownHeading } from '../../utils/markdown';

const StyledAccordion = styled(Accordion)({
  'div:last-child': {
    overflow: 'visible', // handles full width table
  },
});

const ExpandableContent = ({ content, expandLabel, collapseLabel, hasBorder }) => {
  const [expanded, setExpanded] = useState(false);
  const label = expanded ? collapseLabel : expandLabel;

  const accordionItem = [
    {
      title: (
        <Copy px={4} fontWeight="bold" size="small" color="red">
          {compiler(stripMarkdownHeading(label))}
        </Copy>
      ),
      content,
    },
  ];

  const accordionBehaviour = useAccordion(accordionItem);
  const behaviour = {
    ...accordionBehaviour,
    toggleItem: key => {
      accordionBehaviour.toggleItem(key);
      setExpanded(prevState => !prevState);
    },
  };

  return (
    <StyledAccordion
      items={accordionItem}
      itemsHaveTopBorder
      behaviour={behaviour}
      isCompact
      activeTitleHasBorder
      titleHasBorder={hasBorder}
      borderColor="grey.2"
    />
  );
};

export default ExpandableContent;
