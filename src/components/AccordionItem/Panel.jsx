import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Copy } from '@honda-canada/design-system-react';
import themeStyles from './Panel.styles';
import loadLazyLoadedImages from '../../utils/loadLazyLoadedImages';
import { outerHeight } from '../../utils/DOM';

const Container = themeStyles.apply(Box, 'Container');
const Item = themeStyles.apply(Box, 'Item');
const Content = themeStyles.apply(Box, 'Content');
const Title = themeStyles.apply(Copy, 'Title');

const Panel = ({ title, id, activeTabs, setActiveTabs, margins, pageEditing, children, ...rest }) => {
  const [height, setHeight] = useState('0');
  const headerRef = useRef();
  const isActive = activeTabs?.includes(id) || pageEditing;
  const activateTab = () =>
    setActiveTabs(prevIds => (!prevIds?.includes(id) ? [...prevIds, id] : prevIds?.filter(index => index !== id)));
  const accordionPanelClassName = 'accordion-item';
  useEffect(() => {
    loadLazyLoadedImages(`.${accordionPanelClassName}`);
  }, []);

  useLayoutEffect(() => {
    if (headerRef?.current) {
      if (isActive) {
        setHeight(outerHeight(headerRef?.current));
        const timer = setTimeout(() => setHeight('none'), 200);
        return () => clearTimeout(timer);
      }
      setHeight(outerHeight(headerRef?.current));
      const timer = setTimeout(() => setHeight(0), 200);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <Container
      margins={margins}
      className={rest?.className ? `${rest.className} ${accordionPanelClassName}` : `${accordionPanelClassName}`}
      {...rest}
    >
      <Item
        data-testid="accordion"
        onClick={activateTab}
        role="button"
        aria-expanded={isActive}
        isEditorActive={pageEditing}
      >
        <Title>{title}</Title>
      </Item>
      <Content
        data-testid="accordion-content"
        ref={headerRef}
        height={height}
        aria-hidden={!isActive}
        isActive={isActive}
      >
        {children}
      </Content>
    </Container>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  margins: PropTypes.shape({
    autoId: PropTypes.string,
    innerBottomMargin: PropTypes.string,
    innerBottomMarginMob: PropTypes.string,
    innerHorzMargin: PropTypes.string,
    innerHorzMarginMob: PropTypes.string,
    innerTopMargin: PropTypes.string,
    innerTopMarginMob: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  setActiveTabs: PropTypes.func.isRequired,
  activeTabs: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};

export default Panel;
