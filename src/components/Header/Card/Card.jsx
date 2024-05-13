import React from 'react';
import PropTypes from 'prop-types';
import { Box, Optional } from '@honda-canada/design-system-react';

import themeStyles from './Card.styles';

import CoverImage from '../CoverImage';

const StyledCard = themeStyles.apply(Box, 'Card');
const Head = themeStyles.apply(Box, 'Head');
const Body = themeStyles.apply(Box, 'Body');
const BodyCover = themeStyles.apply(Box, 'BodyCover');
const Footer = themeStyles.apply(Box, 'Foot');

const Card = ({ children, cover, title, footer, bordered, ...rest }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { useCover: !!cover });
    }
    return child;
  });

  return (
    <StyledCard className="Card" bordered={bordered} {...rest}>
      <Optional when={title}>
        <Head>{title}</Head>
      </Optional>
      <Body cover={!!cover}>
        <Optional when={cover}>
          <BodyCover>
            <CoverImage image={cover} />
          </BodyCover>
        </Optional>
        {childrenWithProps}
      </Body>
      <Optional when={footer}>
        <Footer>{footer}</Footer>
      </Optional>
    </StyledCard>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  cover: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  bordered: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  footer: PropTypes.node,
  coverStyles: PropTypes.shape({}),
};

export default Card;
