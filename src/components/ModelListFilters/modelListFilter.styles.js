import { ThemeStyles, Box } from '@honda-canada/design-system-react';
import css from '@styled-system/css';
import variant from '@styled-system/variant';
import styled from 'styled-components';
import ToggleContainer from './FilterToggleContainer';

const themeStyles = new ThemeStyles();

export const FilterToggleContainer = styled(ToggleContainer)(({ withSectionDivider, theme }) =>
  css({
    marginBottom: 0,
    borderBottom: withSectionDivider ? theme.borders?.[1] : 'none',
    borderBottomColor: withSectionDivider ? 'grey.2' : 'none',
  }),
);

themeStyles.addBaseStyles('Container')(({ filterContainerWidth }) =>
  css({
    paddingLeft: [0, '20px', 'm'],
    paddingRight: [0, '20px', 0],
    width: filterContainerWidth,
  }),
);

themeStyles.addBaseStyles('Header')(
  ({ headerWidth }) =>
    css({
      minHeight: '45px',
      width: headerWidth,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bg: 'grey.5',
      mb: 'xs',
      px: ['20px', '20px', 'm'],
    }),
  variant({
    prop: 'type',
    variants: {
      vehicle: {
        mb: 'm',
      },
    },
  }),
);

themeStyles.addBaseStyles('ResetLabel')(
  css({
    fontFamily: 'bold',
  }),
);

themeStyles.addBaseStyles('AvailableCount')(
  css({
    fontFamily: 'bold',
    mt: 'xs',
    mb: 'm',
    mx: 'default',
  }),
);

themeStyles.addBaseStyles('FilterSubmitButton')(
  css({
    width: '100%',
    marginTop: 'default',
  }),
);

themeStyles.addBaseStyles('FormFieldWithLabelWrapper')(
  css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 'xs',
  }),
);

themeStyles.addBaseStyles('MinMaxContainer')(
  css({
    marginRight: 'l',
    width: '27px',
    fontSize: '14px',
  }),
);

themeStyles.addBaseStyles('FilterPriceHeader')(
  css({
    fontFamily: 'default',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: 'm',
    marginTop: 'default',
  }),
);

themeStyles.addBaseStyles('FilterLabel')(
  css({
    fontFamily: 'bold',
    my: 'xs',
    ml: ['zero', 's'],
  }),
);

const FilterItemButtonStyles = [
  {
    background: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    minHeight: '40px',
  },
  ({ isSelected }) =>
    css({
      border: '1px solid',
      py: 'xxs',
      px: 'zero',
      borderColor: isSelected ? 'success' : 'black',
      marginBottom: 'xs',
      transition: 'color 0.3s ease, background-color 0.3s ease',
      backgroundColor: isSelected ? 'success' : 'white',
      '& > p': {
        color: isSelected ? 'white' : 'black',
      },
      '&:hover': {
        backgroundColor: [null, null, 'tertiary'],
        borderColor: [null, null, 'tertiary'],
        '& > p': {
          color: [null, null, 'white'],
        },
      },
      // disabled styling
      '&:disabled': {
        borderColor: 'grey.0',
        '& > p': {
          color: 'grey.0',
        },
        '&:hover, &:focus': {
          borderColor: 'grey.0',
          backgroundColor: 'white',
          cursor: 'default',
        },
      },
    }),
  ({ theme, isSelected }) =>
    css({
      '&:focus-visible': {
        outline: `solid 8px ${isSelected ? 'black' : theme.colors.aodaFocused}`,
        outlineOffset: '-8px',
      },
      '&:focus': {
        borderColor: isSelected ? 'success' : 'black',
      },
    }),
];

export const FilterItemButton = styled.button(...FilterItemButtonStyles, ({ expanded }) =>
  css({
    visibility: expanded ? 'visible' : 'hidden',
  }),
);

themeStyles.addBaseStyles('NavLink')(
  ...FilterItemButtonStyles,
  css({
    textDecoration: 'none',
    '&:hover': {
      '& svg path': {
        fill: 'tertiary',
      },
    },
  }),
);

themeStyles.addBaseStyles('NavLabel')(
  css({
    fontFamily: 'bold',
    ml: 'm',
    maxWidth: '85%',
    textAlign: 'left',
  }),
);

themeStyles.addBaseStyles('VehicleTypeWrapper')(
  css({
    mb: [0, 0, 'l'],
  }),
);

themeStyles.addBaseStyles('ColorSwatchContainer')(({ backgroundColor, backgroundGradientColor }) =>
  css({
    backgroundColor,
    transition: 'background .1s ease-in',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '86%',
    height: '90px',
    background: `linear-gradient(171.06deg, ${backgroundColor} 5.46%, rgba(${backgroundGradientColor}, 0.5) 55.9%)`,
  }),
);

themeStyles.addBaseStyles('StyledSVG')(({ backgroundColor }) =>
  css({
    fill: backgroundColor,
    width: '100%',
    height: '100%',
  }),
);

themeStyles.addBaseStyles('SelectedColorBox')(
  css({
    position: 'absolute',
    bottom: '0px',
    left: '0',
    width: '100%',
    height: '80%',
    overflow: 'hidden',
  }),
);

themeStyles.addBaseStyles('SelectedColorCopy')(
  css({
    fontFamily: 'bold',
    my: 'xs',
    pl: [0, 'm'],
  }),
);

themeStyles.addBaseStyles('SelectedColorWrapper')(({ colorFilterHeight }) =>
  css({
    display: ['none', 'block'],
    height: colorFilterHeight,
    ml: ['zero', 's', 'zero'],
  }),
);

themeStyles.addBaseStyles('ColorPreviewContainer')(
  css({
    display: 'flex',
    alignItems: 'center',
    height: '90px',
    width: '86%',
    px: 'xs',
    border: '1px solid #2C2C2C',
  }),
);

themeStyles.addBaseStyles('ColorPreviewCopy')(
  css({
    fontFamily: 'bold',
    pl: 'm',
  }),
);

themeStyles.addBaseStyles('ExteriorColorsWrapper')(
  css({
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    ml: ['zero', 's', 'zero'],
  }),
);

themeStyles.addBaseStyles('ExteriorColorContainer')(
  css({
    display: 'flex',
    mr: ['zero', 'xs', 'xs'],
    mb: ['s', 's', 'xs'],
    width: ['50%', '25%', '62px'],
  }),
);

themeStyles.addBaseStyles('ExteriorColor')(
  css({
    display: ['flex', 'flex', 'block'],
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('ColorNameContainer')(
  css({
    display: ['block', 'block', 'none'],
    maxWidth: ['50%', '50%', 'none'],
    ml: ['s', 's', 'zero'],
  }),
);

themeStyles.addBaseStyles('ColorName')(
  css({
    fontFamily: 'bold',
  }),
);

export const StyledBox = styled(Box)(({ hasLongLabels, hasArrows }) => {
  const arrowGap = hasArrows ? 'zero' : 'default';
  return css({
    minHeight: '45px',
    px: hasLongLabels ? 'm' : 'l',
    mb: 'default',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: hasLongLabels ? 'flex-center' : 'flex-start',
    alignItems: 'center',
    columnGap: hasLongLabels || hasArrows ? arrowGap : 'xl',
  });
});

themeStyles.addBaseStyles('ArrowWrapper')(({ isVisible }) =>
  css({
    display: isVisible ? 'flex' : 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
);

themeStyles.addBaseStyles('CategoryContainer')(({ isOneCategory }) => {
  const marginBottom = isOneCategory ? 'default' : '0';
  return css({
    mb: ['0', marginBottom, marginBottom],
  });
});

themeStyles.addBaseStyles('StyledSplide')(({ tabNumber, isFirstPage }) =>
  css({
    visibility: isFirstPage && tabNumber >= 5 && 'hidden',
    width: 'auto !important',
    marginRight: '55px !important',
    '@media screen and (max-width: 1160px)': {
      marginRight: '35px !important',
    },
  }),
);

themeStyles.addBaseStyles('AllModelsTab')(({ isVisible, hasLongLabels }) =>
  css({
    visibility: !isVisible && hasLongLabels && 'hidden',
    marginRight: !isVisible && hasLongLabels && '0px !important',
    '@media screen and (max-width: 1160px)': {
      marginRight: !isVisible && hasLongLabels && '0px !important',
    },
  }),
);

export default themeStyles;
