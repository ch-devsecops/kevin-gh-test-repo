import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as JssLink } from '@sitecore-jss/sitecore-jss-react';

const RoutableSitecoreLink = forwardRef(
  (
    {
      field,
      className,
      children,
      gtmTags = {},
      'data-gtm-title': dataGtmTitle,
      'data-gtm-interaction-type': gtmInteractionType,
      'data-testid': dataTestid,
      'data-gtm-component-type': dataGtmComponentType,
      'data-gtm-nav-type': dataGtmNavType,
      'data-tracking-label': dataTrackingLabel,
      ariaLabel,
      onClick,
      selectedMenuItem,
    },
    ref,
  ) => {
    if (!field) return null;

    const { value, editable } = field;
    // Use a RouterLink for internal links, except in Experience Editor
    const useRouterLink = value?.linktype === 'internal' && !editable;

    const updatedGtmTags = {
      ...gtmTags,
      ...(dataGtmTitle && { 'data-gtm-title': dataGtmTitle }),
      ...(gtmInteractionType && { 'data-gtm-interaction-type': gtmInteractionType }),
      ...(dataGtmComponentType && { 'data-gtm-component-type': dataGtmComponentType }),
      ...(dataGtmNavType && { 'data-gtm-nav-type': dataGtmNavType }),
      ...(dataTrackingLabel && { 'data-tracking-label': dataTrackingLabel }),
    };
    const url = value?.href || value?.url || '';
    const [rawPathname, search] = url.split('?');
    const pathname = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`;

    return useRouterLink ? (
      <RouterLink
        ref={ref}
        to={{
          pathname,
          search: search ? `?${search}` : '',
          state: selectedMenuItem ? { selectedMenuItem } : undefined,
        }}
        title={value.title}
        target={value.target}
        className={className}
        aria-label={ariaLabel}
        data-testid={dataTestid}
        onClick={onClick}
        {...updatedGtmTags}
      >
        {children || value.text || value.href}
      </RouterLink>
    ) : (
      <JssLink
        ref={ref}
        field={field}
        className={className}
        aria-label={ariaLabel}
        data-testid={dataTestid}
        onClick={onClick}
        {...updatedGtmTags}
      >
        {children}
      </JssLink>
    );
  },
);

RoutableSitecoreLink.displayName = 'RoutableSitecoreLink';
export default RoutableSitecoreLink;
