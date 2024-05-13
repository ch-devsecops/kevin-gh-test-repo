import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, UnorderedList } from '@honda-canada/design-system-react';

import { wrapJSSFields } from '../../../utils/wrapJSSFields';
import getValueByKey from '../../../utils/getValueByKey';

import themeStyles from '../Footer.styles';
import { getFooterGtmTags } from '../utils';

const BottomLinksContainer = themeStyles.apply(Box, 'BottomLinksContainer');
const CopyRight = themeStyles.apply(Box, 'CopyRight');
const BottomLink = themeStyles.apply(Link, 'BottomLink');
const List = themeStyles.apply(UnorderedList, 'LinkList');

const BottomLinks = ({ data }) => {
  const fields = wrapJSSFields(data?.fields);
  const copyRightText = fields?.copyRightText;
  const items = fields?.items;

  return (
    <BottomLinksContainer>
      <CopyRight>{copyRightText?.value}</CopyRight>
      <List>
        {items?.map(item => {
          const label = getValueByKey(item, 'text');
          const url = item?.fields?.url?.value?.url || '';
          const cssClass = item?.fields?.url?.value?.class;
          return (
            <li key={item.id}>
              <BottomLink
                {...(url ? { href: url } : {})}
                className={cssClass}
                tabIndex={0}
                {...getFooterGtmTags(item.displayName)}
              >
                {label}
              </BottomLink>
            </li>
          );
        })}
      </List>
    </BottomLinksContainer>
  );
};

BottomLinks.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      copyRightText: PropTypes.shape({}),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            url: PropTypes.shape({
              value: PropTypes.shape({
                url: PropTypes.string,
              }),
            }),
          }),
        }),
      ),
    }),
  }),
};

export default BottomLinks;
