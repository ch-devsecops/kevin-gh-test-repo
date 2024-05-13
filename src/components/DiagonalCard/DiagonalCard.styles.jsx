import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ isFullHeight }) =>
  css({
    display: 'flex',
    flexDirection: ['column-reverse', 'column'],
    justifyContent: ['flex-end', 'flex-start'],
    pt: '50px',
    height: isFullHeight ? 'calc(100vh - 50px)' : '100%',
  }),
);

themeStyles.addBaseStyles('ContentBox')(
  css({
    maxWidth: ['100%', '636px'],
    width: '100%',
    paddingX: [20, 0],
    mt: ['l', 0],
    ml: [0, 'big'],
  }),
);

themeStyles.addBaseStyles('ImageBox')(
  css({
    position: 'relative',
    marginTop: [0, '-5%'],
    paddingTop: '56.25%',
    pointerEvents: 'none',
  }),
);

themeStyles.addBaseStyles('ImageWrapper')(({ isOpen, isReversing }) =>
  css({
    position: 'absolute',
    top: 0,
    height: '100%',
    left: isOpen ? 0 : '50%',
    width: isOpen ? '100%' : 0,
    transition: 'left ease-out, width ease-out',
    transitionDuration: isReversing ? 0 : 't1',
  }),
);

themeStyles.addBaseStyles('TransitionImageWrapper')(({ isReversing, isOpen }) =>
  css({
    position: 'absolute',
    top: 0,
    height: '100%',
    zIndex: isReversing && isOpen ? 1 : 0,
    left: isReversing && isOpen ? '50%' : 0,
    width: isReversing && isOpen ? 0 : '100%',
    transition: 'left ease-out, width ease-out',
    transitionDuration: 't1',
  }),
);

themeStyles.addBaseStyles('FadeUp')(({ isOpen, delay = 0 }) =>
  css({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'none' : 'translateY(50px)',
    transition: 'opacity ease-out, transform ease-out',
    transitionDuration: 't3',
    transitionDelay: delay,
  }),
);

export default themeStyles;
