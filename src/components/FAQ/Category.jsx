import React, { useContext } from 'react';
import {
  Column,
  Copy,
  Box,
  useThemeContext,
  Accordion,
  AccordionExpandAll,
  useAccordion,
} from '@honda-canada/design-system-react';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { LayoutContext } from '../LayoutContext';
import { ACURA_THEME_NAME } from '../../utils/constants';

const Category = ({ items, heading, setRef, rendering }) => {
  const header = useThemeContext('header');
  const themeName = useThemeContext('name');
  const { layoutName } = useContext(LayoutContext);
  const isSideNavLayout = layoutName === 'SideNavLayout';
  const leftColumnHeight = isSideNavLayout ? rendering?.leftColumnHeight : 0;
  const mobileAccordionTitleOffset = leftColumnHeight + parseInt(header.mobile.height, 10);
  const behaviour = useAccordion(items);
  const { toggleAllItems, isAllExpanded } = behaviour;

  return (
    <>
      <AccordionExpandAll
        tabIndex={0}
        justifyContent={['flex-end', 'flex-start']}
        alignItems="center"
        flexWrap={['wrap', 'no-wrap']}
        toggleItem={toggleAllItems}
        onKeyDown={keypressCallback(keyCodes.ENTER, toggleAllItems)}
        isActive={isAllExpanded}
        pb={['xs', 'l']}
        setRef={setRef}
        id={heading.key}
        width="100%"
      >
        <Box flexBasis={['100%', 'auto']} mr="auto">
          {heading.title}
        </Box>
        <Copy color={themeName === ACURA_THEME_NAME ? 'primary' : 'black'} fontFamily="bold" lineHeight="16px">
          {isAllExpanded ? heading.collapseText : heading.expandText}
        </Copy>
      </AccordionExpandAll>
      <Column width={[1]} px="zero" pb={['xl', 'big']}>
        <Accordion
          items={items}
          behaviour={behaviour}
          hideBorderOnLast={false}
          isTitleSticky
          titleOffset={[
            mobileAccordionTitleOffset,
            mobileAccordionTitleOffset,
            parseInt(header.desktop.stickyHeight || header.desktop.height, 10),
          ]}
        />
      </Column>
    </>
  );
};

export default Category;
