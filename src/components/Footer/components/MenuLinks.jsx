import React from 'react';
import PropTypes from 'prop-types';
import { Box, UnorderedList, Optional } from '@honda-canada/design-system-react';

import LinkItem from './LinkItem';
import { mapFooterItems } from '../utils';

import themeStyles from '../Footer.styles';

const ListHeader = themeStyles.apply(Box, 'ListHeader');
const List = themeStyles.apply(UnorderedList, 'LinkList');

const MenuLinks = ({ data, showHeader = true }) => {
  const fields = mapFooterItems(data);

  return (
    <>
      <Optional when={showHeader}>
        <ListHeader>{data?.fields?.categoryTitle?.value}</ListHeader>
      </Optional>
      <List>
        {fields?.items?.map(item => (
          <li key={`li-${item?.name}`}>
            <LinkItem item={item} />
          </li>
        ))}
      </List>
    </>
  );
};

MenuLinks.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      categoryTitle: PropTypes.shape({
        value: PropTypes.string,
      }),
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  showHeader: PropTypes.bool,
};

export default MenuLinks;
