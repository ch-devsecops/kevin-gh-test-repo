import React, { useContext } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Box, Button, Copy, Media, Expand } from '@honda-canada/design-system-react';
import ListsAndTable from './ListsAndTable';
import ExpandableContent from './ExpandableContent';
import { contentWidth } from './constants';
import { LayoutContext } from '../LayoutContext';

const Content = ({ lists = [], table, cta, footnote, gtmTitle, expandLabel, collapseLabel, isCollapsed }) => {
  const { layoutName } = useContext(LayoutContext);
  const inBiggerColumn =
    layoutName === 'SingleColumnLayout' || layoutName === 'TwoColumnLayout' || layoutName === 'LayoutContainer'; // for local dev

  const copyMaxWidth = inBiggerColumn ? '100%' : contentWidth;
  const desktopFootnotePx = inBiggerColumn ? 'big' : 'm';
  const desktopContainerPb = lists.length > 1 ? 'xl' : 'xxl';
  const desktopContainerMt = lists.length > 1 ? 'zero' : '38px';
  const hasTable = table?.rows?.length;
  const hasCtaFootnote = cta?.label || footnote;

  const listsAndTable = <ListsAndTable lists={lists} table={table} />;

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column" mt={['xs', desktopContainerMt]}>
      <Media lessThan="desktop">
        <Box px="m">
          <ExpandableContent
            content={listsAndTable}
            expandLabel={expandLabel}
            collapseLabel={collapseLabel}
            hasBorder={hasCtaFootnote}
          />
        </Box>
      </Media>

      <Media greaterThan="smallDesktop">
        {(mediaClassNames, renderChildren) => (
          <Expand
            className={mediaClassNames}
            height="100%"
            expandedHeight="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            shouldAnimate={!isCollapsed}
          >
            {renderChildren ? listsAndTable : null}
          </Expand>
        )}
      </Media>

      {hasCtaFootnote && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={['l', desktopContainerPb]}
          mt={['m', hasTable ? 'xl' : 'm', 'zero']}
          px={['m', 'm', desktopFootnotePx]}
        >
          {cta?.label && (
            <Box>
              <Button
                styling="primary"
                as="a"
                href={cta.href}
                target={cta.newTab ? '_blank' : '_self'}
                mb="l"
                data-gtm-title={gtmTitle}
                data-gtm-interaction-type="cta click"
                {...cta.gtmTags}
              >
                {cta.label}
              </Button>
            </Box>
          )}
          {footnote && (
            <Box width="100%">
              <Copy size="legal" maxWidth={['initial', 'initial', copyMaxWidth]}>
                {compiler(footnote)}
              </Copy>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Content;
