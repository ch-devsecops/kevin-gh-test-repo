import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Link, Icon } from '@honda-canada/design-system-react';
import camelCase from 'lodash/camelCase';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { wrapJSSFields } from '../../utils/wrapJSSFields';

const CTA = ({ linkField, typeField, iconField, icon, iconColor, parentGtmTags, ...otherProps }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const styling = camelCase(typeField?.value);
  const { fields: wrappedIcon } = wrapJSSFields(iconField);
  const iconName = icon || wrappedIcon?.getProp('value');

  const darkStyling = styling === 'secondary' ? 'specialSecondary' : 'special';

  if (styling === 'tertiary' || styling === 'tertiaryWhite') {
    return (
      <span {...parentGtmTags}>
        <Link
          styling={isDark || styling === 'tertiaryWhite' ? 'white' : 'primary'}
          as={RoutableSitecoreLink}
          field={linkField}
          {...otherProps}
        />
        {iconName && <Icon ml="xs" height="10px" iconColor={isDark ? 'red' : iconColor || 'primary'} name={iconName} />}
      </span>
    );
  }

  return (
    <Button styling={isDark ? darkStyling : styling} as={RoutableSitecoreLink} field={linkField} {...otherProps} />
  );
};

CTA.propTypes = {
  linkField: PropTypes.shape({
    value: PropTypes.shape({
      href: PropTypes.string,
      linktype: PropTypes.oneOf(['internal', 'external', 'media', 'anchor', 'mailto']),
      text: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
  typeField: PropTypes.shape({
    value: PropTypes.oneOf([
      'Primary',
      'primary',
      'PrimaryDark',
      'Secondary',
      'SecondaryDark',
      'NsxPrimary',
      'NsxSecondary',
      'Tertiary',
      'TertiaryWhite',
      'tertiary',
      '',
    ]),
  }),
  iconField: PropTypes.shape({
    fields: PropTypes.shape({
      value: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  }),
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  parentGtmTags: PropTypes.shape({}),
};

export default CTA;
