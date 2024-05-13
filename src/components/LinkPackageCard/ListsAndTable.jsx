import React, { Fragment, useContext } from 'react';
import { UnorderedList, UnorderedListItem, Box, H6, Icon, Table, Media } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { stripMarkdownHeading } from '../../utils/markdown';
import { contentWidth } from './constants';
import { LayoutContext } from '../LayoutContext';
import { CollapsibleContext } from '../CollapsibleContainer';

const ListsAndTable = ({ lists = [], table }) => {
  const { layoutName } = useContext(LayoutContext);
  const { isCollapsed } = useContext(CollapsibleContext);

  const inCollapsibleContainer = typeof isCollapsed === 'boolean';
  const hasMultipleList = lists?.length > 1;
  const hasTable = table?.rows?.length;
  const inBiggerColumn =
    layoutName === 'SingleColumnLayout' || layoutName === 'TwoColumnLayout' || layoutName === 'LayoutContainer'; // for local dev

  let listContainerStyles = {};
  if (!inBiggerColumn) {
    listContainerStyles = {
      display: ['block', 'block', 'block'],
      justifyContent: ['initial', 'space-between', 'initial'],
    };
  } else if (inBiggerColumn) {
    listContainerStyles = {
      display: ['block', 'block', 'flex'],
      justifyContent: ['initial', 'space-between', 'center'],
    };
  }

  const containerPb = hasMultipleList ? 'xl' : 'xxl';
  const containerPt = hasMultipleList ? 'default' : 'zero';
  const desktopContainerMb = hasMultipleList ? containerPb : 'l';

  const desktopBorderMb = inBiggerColumn ? 'xxl' : containerPt;
  const desktopContainerPx = inBiggerColumn ? 'big' : 'xl';
  const desktopMaxWidth = inBiggerColumn ? '100%' : contentWidth;
  const desktopIconMx = inBiggerColumn ? 'xbig' : 'zero';
  const desktopListWidth = inBiggerColumn ? '300px' : 'initial';

  return (
    <>
      {lists?.length && (
        <Box
          width="100%"
          mb={['m', desktopContainerMb]}
          pt={['l', 'default', containerPt]}
          maxWidth={['100%', '100%', desktopMaxWidth]}
          px={['zero', 'default', desktopContainerPx]}
        >
          {/* red border */}
          {inCollapsibleContainer && hasMultipleList && (
            <Media greaterThan="smallDesktop">
              <Box borderTop={['none', 'solid 1px']} borderColor={['none', 'red']} mb={['l', 'l', desktopBorderMb]} />
            </Media>
          )}

          {/* one list */}
          {!hasMultipleList && (
            <UnorderedList columns={1} bulletStyle="checkmark">
              {lists[0]?.data?.map((item, i) => (
                <UnorderedListItem key={i.toString()}>{compiler(item)}</UnorderedListItem>
              ))}
            </UnorderedList>
          )}

          {hasMultipleList && (
            <Box {...listContainerStyles}>
              {lists.map((list, listIdx) => (
                <Fragment key={listIdx.toString()}>
                  <Box width={['initial', 'initial', desktopListWidth]}>
                    {list.header && <H6 mb="default">{compiler(stripMarkdownHeading(list.header))}</H6>}
                    <UnorderedList columns={1} bulletStyle="checkmark">
                      {list?.data?.map((item, itemIndex) => (
                        <UnorderedListItem key={itemIndex.toString()}>{compiler(item)}</UnorderedListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                  {listIdx < lists.length - 1 && (
                    <Box
                      mt="s"
                      mb="default"
                      display="flex"
                      justifyContent="center"
                      height="30px"
                      mx={['zero', 'm', desktopIconMx]}
                    >
                      {/* TODO: get asset for large size in figma */}
                      <Icon name="plus" width="30px" />
                    </Box>
                  )}
                </Fragment>
              ))}
            </Box>
          )}
        </Box>
      )}

      {hasTable && (
        <Box
          width={['auto', 'auto', '100%']}
          mx={[-4, -4, 'zero']} // handles full width table on mobile and tablet
        >
          <Table
            columnCount={table.columns.length}
            isFirstColBold={table.columns.length > 2}
            columns={table.columns}
            rows={table.rows}
            caption={table.caption}
          />
        </Box>
      )}
    </>
  );
};

export default ListsAndTable;
