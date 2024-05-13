export const getSectionNav = (items, pageName) => {
  // filter to remove empty item
  const filteredItems = items?.filter(item => !!item?.fields?.pageTitle);
  const isInitialPage = filteredItems[0].name === pageName;
  const parentPath = filteredItems[0]?.displayName;

  return { filteredItems, isInitialPage, parentPath };
};

export const getRouteItems = (item, index, pageName, isInitialPage, parentPath, lang = 'en') => {
  // handles active nav item
  let isActive = item?.name === pageName;
  if (isInitialPage && index === 0) {
    isActive = true;
  }

  let path = `/${lang}/${parentPath}`;
  if (index !== 0) {
    // append child route
    path = `${path}/${item.displayName}`;
  }

  return { isActive, path };
};
