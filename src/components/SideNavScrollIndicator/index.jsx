import React, { useContext } from 'react';
import { useThemeContext, Link } from '@honda-canada/design-system-react';
import { Link as JSSLink } from '@sitecore-jss/sitecore-jss-react';
import { compiler } from 'markdown-to-jsx';
import Menu from './Menu';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { HONDA_THEME_NAME } from '../../utils/constants';
import { mapGTMCategory } from '../../utils/sitecoreFields';

const SideNavScrollIndicator = ({ fields, onProgressSidenavClick, scrollCompletionCallback, rendering }) => {
  const themeName = useThemeContext('name');
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const markdownLabels = fields?.items?.map(item => compiler(item.fields.UrlAnchor.value.text));
  if (!fields || !fields.items) return null;

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(fields.gtmCategory),
  };

  const itemData = fields.items.map((item, i) => ({
    id: item.id,
    href: item.fields?.UrlAnchor?.value,
    link: (
      <Link
        size="regular"
        color={isDark ? 'white' : 'black'}
        fontWeight="bold"
        fontFamily={themeName === HONDA_THEME_NAME && 'default'}
        py="13px"
        onClick={() => onProgressSidenavClick(i)}
        lineHeight="24px"
        width={1}
        as={JSSLink}
        field={{
          ...item.fields?.UrlAnchor?.value,
          text: markdownLabels[i],
        }}
        {...{
          'data-gtm-title': item.fields?.gtmTitle?.value?.toLowerCase(),
          'data-gtm-model': item.fields?.gtmModelName?.value?.toLowerCase(),
          'data-gtm-trim': item.fields?.gtmTrimName?.value?.toLowerCase(),
          'data-gtm-body-style': item.fields?.gtmBodyStyle?.value?.toLowerCase(),
          'data-gtm-interaction-type': item.fields?.gtmInteractionType?.value?.toLowerCase() || 'click to scroll',
        }}
      />
    ),
  }));

  return (
    <Menu items={itemData} scrollCompletionCallback={scrollCompletionCallback} isDark={isDark} gtmTags={gtmTags} />
  );
};

export default SideNavScrollIndicator;
