import React, { useEffect, useState } from 'react';
import { SideNav, Link } from '@honda-canada/design-system-react';
import debounce from 'lodash/debounce';
import { wrapJSSFields } from '../../utils/wrapJSSFields';

const SideNavJss = ({ fields }) => {
  const [activeLink, setActiveLink] = useState(null);
  const wrappedFields = wrapJSSFields(fields);

  useEffect(() => {
    /**
     * Change isActive Flag in items based on hash change
     * Triggered by Scroll
     */
    if (typeof window === 'undefined') {
      return;
    }

    const setActive = debounce(() => {
      const hash = window.decodeURIComponent(window.location.hash);

      if (hash.length) {
        setActiveLink(hash);
      }
    }, 10);

    setActiveLink(wrappedFields.items[0]?.fields?.UrlAnchor.getProp('href'));

    window.addEventListener('scroll', setActive);
    window.addEventListener('touchmove', setActive);

    return () => {
      window.removeEventListener('scroll', setActive);
      window.removeEventListener('touchmove', setActive);
    };
  }, []);

  if (!fields) {
    return null;
  }

  const isActiveLink = href => activeLink && activeLink === href;

  const renderLink = (field, props = {}) => (
    <Link size="regular" color="black" py="10px" pr="21px" width={1} {...props}>
      {field.text}
    </Link>
  );

  const buildSidebarItem = (item, index) => ({
    key: index,
    link: renderLink(item.fields?.UrlAnchor.value, {
      pl: 4,
      href: item.fields?.UrlAnchor.getProp('href'),
    }),
    isActive: isActiveLink(item.fields?.UrlAnchor.getProp('href')),
    childItems: item.fields?.items
      ? item.fields.items?.map(child => ({
          isActive: isActiveLink(child.fields?.UrlAnchor.getProp('href')),
          link: renderLink(child.fields?.UrlAnchor.value, {
            pl: 6,
            href: child.fields?.UrlAnchor.getProp('href'),
            fontFamily: 'default',
          }),
        }))
      : [],
  });

  const items = wrappedFields.items?.map(buildSidebarItem);

  return <SideNav items={items} />;
};

export default SideNavJss;
