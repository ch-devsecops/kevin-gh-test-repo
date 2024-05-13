import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import DropdownView from './DropdownView';
import { mapGTMCategory } from '../../utils/sitecoreFields';

const Wrapper = (pageEditing, children) =>
  pageEditing ? <div style={{ minHeight: '100px' }}>{children}</div> : <div>{children}</div>;

const DropdownToggleContainer = ({ rendering, sitecoreContext }) => {
  if (!rendering || !rendering.placeholders) return null;
  const { placeholders, fields } = rendering;
  const { pageEditing } = sitecoreContext;

  const toggleItems = placeholders['toggle-content']
    .filter(item => item?.fields?.toggleValue)
    .map(item => ({
      title: item.fields.toggleValue.value,
      gtmTitle: item.fields?.gtmTitle?.value,
      placeholders: item.placeholders,
    }));

  const gtmTags = {
    type: rendering.componentName,
    category: mapGTMCategory(fields?.gtmCategory),
  };

  return Wrapper(
    pageEditing,
    <DropdownView
      title={fields?.title?.value}
      rendering={rendering}
      toggleItems={toggleItems}
      gtmTags={gtmTags}
      pageEditing={pageEditing}
    />,
  );
};

export default withSitecoreContext()(DropdownToggleContainer);
