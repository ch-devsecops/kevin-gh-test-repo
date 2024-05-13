import React from 'react';
import PropTypes from 'prop-types';
import { Link, Markdown, Icon, IconWrapper } from '@honda-canada/design-system-react';
import { stripMarkdownHeading } from '../../utils/markdown';
import themeStyles from './TableStyle2.styles';

const CellWrapper = themeStyles.apply(Link, 'CellWrapper');
const StyledMarkdown = themeStyles.apply(Markdown, 'StyledMarkdown');

const CellWithIcon = ({ label, url, iconName, gtmComponentType }) => (
  <CellWrapper
    as="a"
    cursor="pointer"
    download={url}
    href={url}
    disableHover
    data-gtm-title={label}
    data-gtm-component-type={gtmComponentType}
    data-gtm-interaction-type="cta: click"
  >
    <StyledMarkdown>{stripMarkdownHeading(label)}</StyledMarkdown>
    <IconWrapper size="l" mx="xs">
      <Icon name={iconName} iconColor="red" />
    </IconWrapper>
  </CellWrapper>
);

CellWithIcon.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  iconName: PropTypes.string,
  gtmComponentType: PropTypes.string,
};

export default CellWithIcon;
