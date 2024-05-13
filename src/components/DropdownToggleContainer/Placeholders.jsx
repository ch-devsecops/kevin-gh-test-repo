import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import DropdownToggleItem from '../DropdownToggleItem';

export const getComponentUid = component => component?.props?.rendering?.uid;

const Placeholders = ({ rendering, activeItem, sitecoreContext }) => {
  const { pageEditing } = sitecoreContext;

  return (
    <Placeholder
      name="toggle-content"
      rendering={rendering}
      renderEach={component => {
        const items = rendering.placeholders['toggle-content'].filter(c => c.componentName === 'DropdownToggleItem');
        const componentUid = component?.props?.rendering?.uid;
        const itemIndex = items.findIndex(tab => tab.uid === componentUid);

        if (pageEditing) {
          return activeItem === itemIndex ? (
            <DropdownToggleItem key={`toggle-${getComponentUid(component)}`} rendering={component.props.rendering} />
          ) : (
            <DropdownToggleItem
              display="none"
              key={`toggle-${getComponentUid(component)}`}
              rendering={component.props.rendering}
            />
          );
        }

        return activeItem === itemIndex ? (
          <DropdownToggleItem key={`toggle-${getComponentUid(component)}`} rendering={component.props.rendering} />
        ) : null;
      }}
    />
  );
};

export default withSitecoreContext()(Placeholders);
