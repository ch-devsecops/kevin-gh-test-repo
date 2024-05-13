/**
 * Mock styled-components theme, if you want to test how your component
 * implements theme styles. Import as-is, or spread in any
 * additional values you need.
 *
 * Example usage:

  it('should apply the bgColor param', () => {
    const { colors } = MockTheme;
    const { container } = render(
      <MyComponent
        fields={mockFields}
        params={{ bgColor: 'Gray' }}
      />,
    );
    const wrapper = container.querySelector('section');

    expect(wrapper).toHaveStyleRule('background-color', colors.grey[5]);
  });
 */

import { HONDA_THEME_NAME } from '../utils/constants';

const mockTheme = {
  letterSpacings: {
    sm: '0.5px',
    md: '1px',
  },
  lineHeights: {
    sm: '22px',
    md: '26px',
  },
  colors: {
    white: '#fff',
    transparent: 'transparent',
    grey: ['#707070', '#C7C7C7', '#D5D5D5', '#EAEAEA', '#F8F8F8', '#F5F5F5'],
    black: '#2C2C2C',
    red: '#DA2C2E',
    redShades: ['rgba(200, 16, 46, 0.1)'],
    aodaRed: '#D92629',
    lightRed: '#EC9597',
    darkRed: '#A21C1D',
    blue: '#334C96',
    darkBlue: '#002D62',
    lightBlue: '#00447826',
    yellow: ['#F9CA52', '#EDAB00', '#8D763F'],
    fadedBlue: '#ADB7D5',
    primary: '#DA2C2E',
    primaryAoda: '#D92629',
    primaryDark: '#A21C1D',
    primaryLight: '#EC9597',
    secondary: '#2C2C2C',
    secondaryLight: '#C7C7C7',
    tertiary: '#002D62',
    tertiaryLight: '#334C96',
    tertiaryDisabled: '#ADB7D5',
    danger: '#DA2C2E',
    warning: '#2C2C2C',
    warningLight: '#EAEAEA',
    success: '#334C96',
    successLight: '#d9e0e7',
    disabled: '#C7C7C7',
    typographyDefault: '#2C2C2C',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 144, 192, 256],
  borders: [0, '1px solid', '2px solid', '3px solid'],
  breakpoints: ['768px', '992px', '1200px'],
  fontWeights: {
    regular: 'normal',
    bold: 700,
  },
  fontSizes: {
    sm: '12px',
  },
  shadows: {
    smooth: {
      md: '0.1px 0.3px 0.3px rgba(0, 0, 0, 0.02),0.3px 0.7px 0.9px rgba(0, 0, 0, 0.028),0.7px 1.4px 1.8px rgba(0, 0, 0, 0.035),1.5px 2.9px 3.7px rgba(0, 0, 0, 0.047),4px 8px 10px rgba(0, 0, 0, 0.07)',
    },
    box: {
      subNav: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
  zIndices: {
    accordionItemTitle: 200,
    modal: 13001,
    sectionNav: 13000,
  },
  transitionDuration: {
    t1: '1s',
  },
  transitionTimingFunction: {
    default: 'ease-in-out',
    out: 'ease-out',
    in: 'ease-in',
  },
  name: HONDA_THEME_NAME,
  fonts: {
    default: 'Helvetica',
    bold: 'Cooper Black',
    heading: 'Roboto',
  },
  header: {
    desktop: {},
    mobile: {},
  },
  icons: {},
  logIconWarnings: false,
};

export default mockTheme;
