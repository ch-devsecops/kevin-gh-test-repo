const objectToLowerCase = payload => {
  const keys = Object.keys(payload);
  const newPayload = {};
  let key;
  let objSize = keys.length;

  // eslint-disable-next-line no-plusplus
  while (objSize--) {
    key = keys[objSize];
    if (payload[key] && typeof payload[key] === 'string') {
      newPayload[key] = payload[key].toLowerCase();
    } else {
      newPayload[key] = payload[key];
    }
  }
  return newPayload;
};

export const gtmEvent = payload => {
  // eslint-disable-next-line no-param-reassign
  payload = objectToLowerCase(payload);
  if (window.dataLayer && payload) {
    window.dataLayer.push(payload);
    return payload;
  }
  return null;
};

export const gtmSelectYear = year => {
  const gtmPayload = {
    year,
    event: 'model_filter_by_year',
  };
  gtmEvent(gtmPayload);
};

export const gtmCompareDetails = componentName => {
  const gtmPayload = {
    component_type: componentName,
    event: 'comparison_displayed',
  };
  gtmEvent(gtmPayload);
};

export const gtmSelectTrimForAccessories = trim => {
  const gtmPayload = {
    trim,
    search_term: trim,
    list_name: 'model details > search accessories',
    event: 'search',
  };
  gtmEvent(gtmPayload);
};

export const gtmTrimSelector = (listName, modelInfo) => {
  const gtmPayload = {
    ...modelInfo,
    list_name: listName,
    event: 'search',
  };
  gtmEvent(gtmPayload);
};

export const gtmSpecificationsDownload = fileName => {
  const gtmPayload = {
    link_text: 'save as pdf',
    file_name: fileName,
    file_extension: 'pdf',
    event: 'file_download',
  };
  gtmEvent(gtmPayload);
};

export const gtmAccessoryTile = (linkText, component, url) => {
  const gtmPayload = {
    cta_type: 'click',
    link_text: linkText,
    cta_placement: component,
    link_url: url,
  };
  gtmEvent(gtmPayload);
};

/**
 * Pushes find a dealer gtm event
 * @param componentType
 * @param productName
 * @param category
 */
export const gtmFindADealer = (componentType, productName, category) => {
  const gtmPayload = {
    component_type: componentType,
    item_id: productName,
    category,
    event: 'dealer_contact',
  };
  gtmEvent(gtmPayload);
};

export const gtmContactDealer = ({ dealerName, linkUrl, componentType, model, trim, bodyStyle, availabilityFlag }) => {
  const gtmPayload = {
    event: 'dealer_inventory_cta',
    dealer_name: dealerName,
    cta_type: 'contact dealer',
    cta_placement: 'dealer inventory',
    link_text: 'contact dealer',
    link_url: linkUrl,
    component_type: componentType,
    model,
    trim,
    body_style: bodyStyle,
    availability_flag: availabilityFlag,
  };

  // Filter out undefined gtm keys
  const filteredPayload = Object.entries(gtmPayload).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  gtmEvent(filteredPayload);
};

/**
 * Pushes carousel navigation gtm event
 * @param productName
 * @param category
 * @param linkText
 */
export const gtmCarouselNavigation = (productName, category, linkText) => {
  const gtmPayload = {
    menu_type: 'primary model nav',
    item_id: productName,
    link_text: linkText,
    category,
    event: 'nav_link_click',
  };
  gtmEvent(gtmPayload);
};

/**
 * Pushes add to compare gtm event
 * @param category
 * @param productId
 */
export const pushGtmCtaClickAddToCompareEvent = (category, productId) => {
  const gtmPayload = {
    link_text: 'add to compare',
    item_id: productId,
    category,
    event: 'comparison_add',
  };
  gtmEvent(gtmPayload);
};

export const pushGlobalNavGtmEvent = (linkText, linkUrl) => {
  const gtmPayload = {
    menu_type: 'global',
    link_text: linkText,
    link_url: linkUrl,
    event: 'nav_link_click',
  };
  gtmEvent(gtmPayload);
};

export const pushLeadsCtaEvent = payload => {
  gtmEvent(payload);
};

export const getGtmTagValue = value => value || undefined;

/**
 * Fallback fot GTM title
 * @param {gtmTitle} value1
 * @param {gtmBodyStyle} value2
 * @param {displayName} value3
 * @returns
 */
export const getGtmTitleValue = (value1, value2, value3) => value1 || value2 || value3 || undefined;

/**
 * Sends a Google Tag Manager event for a suggested model click.
 *
 * @param {string} dealerName - The name of the dealer associated with the event.
 * @param {string} model - The model name
 * @param {string} trim - The trim name
 * @param {string} bodyStyle - The body style of the clicked model.
 * @param {string} inventoryAvailabilityStatus - The availability status of the clicked model in inventory.
 *  */
export const gtmSuggestedModelClick = (dealerName, model, trim, bodyStyle, inventoryAvailabilityStatus) => {
  const gtmPayload = {
    event: 'suggested_model_click',
    dealer_name: dealerName,
    model,
    trim,
    body_style: bodyStyle,
    availability_flag: inventoryAvailabilityStatus,
  };
  gtmEvent(gtmPayload);
};
