/* eslint-disable no-param-reassign */
const addUnOrderedListPadding = (component, type) => {
  if (component?.componentName === 'UnOrderedList') {
    if (!component.params) component.params = {};

    component.params.px = type !== 'nested' ? ['20px', 'zero'] : 'zero';
    component.params.pb = 'zero';
  }
};

const addFreeFormTextMargin = component => {
  if (component?.componentName === 'FreeFormText') {
    if (!component.params) component.params = {};

    component.params.mb = 'zero';
  }
};

/**
 * PackageCard utility helper that handles spacing of
 * UnorderedLists and FreeFormText in a components array
 */
export const handleComponentSpacing = components =>
  components.map(component => {
    if (component.props && component.props.type === 'text/sitecore') {
      return component;
    }

    const rendering = component?.props?.rendering;

    addUnOrderedListPadding(rendering);
    addFreeFormTextMargin(rendering);

    // handles placeholder components
    const placeholderNames = rendering?.placeholders ? Object.keys(rendering.placeholders) : [];

    if (placeholderNames.length) {
      placeholderNames.forEach(name => {
        rendering.placeholders[name].forEach(c => {
          addUnOrderedListPadding(c, 'nested');
          addFreeFormTextMargin(c);
        });
      });
    }

    return component;
  });

export default { handleComponentSpacing };
