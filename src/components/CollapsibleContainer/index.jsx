import React, { useState } from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import styled from 'styled-components';
import { compiler } from 'markdown-to-jsx';
import {
  Box,
  H2,
  Markdown,
  Button,
  Icon,
  IconWrapper,
  Media,
  Copy,
  Fade,
  useThemeContext,
} from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { HONDA_THEME_NAME } from '../../utils/constants';

const ToggleButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  '&:hover, &:focus': {
    border: 'none',
  },
});

export const CollapsibleContext = React.createContext({});

/**
 * This component passes an `isCollapsed` prop (true by default),
 * through the CollapsibleContext API,
 * to all components in the collapsible-container-content Placeholder.
 * The toggle button is visible only on small desktop and larger; therefore,
 * at smaller screen resolutions, the `isCollapsed` prop should be ignored.
 */
const CollapsibleContainer = ({ fields, params, rendering }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { borders, colors, name: themeName } = useThemeContext();

  if (!fields || !params) return null;
  const { anchorId, title, bodyText, expandLabel, collapseLabel, gtmTitle, gtmCategory } = wrapJSSFields(fields);
  const maxWidth = '824px'; // magic styling
  let backgroundColour = params?.bgColour?.toLowerCase().replace(' ', '');

  if (backgroundColour === 'grey') {
    backgroundColour = 'grey.5';
  }

  const TitleComponent = getTitleComponent(title?.value, H2);

  return (
    <Box
      py={['xl', 'big']}
      bg={backgroundColour}
      data-gtm-title={gtmTitle?.value}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      id={anchorId?.value}
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <Fade shouldAnimate={inView} ref={ref} initialOpacity={0}>
            <Box textAlign="center" maxWidth={maxWidth} mx={['20px', 'auto']} pb={['l', 'xxl']}>
              {title?.value && (
                <TitleComponent as="h2" mb={['s', 'm']}>
                  {compiler(stripMarkdownHeading(title?.value))}
                </TitleComponent>
              )}
              {bodyText?.value && <Markdown>{bodyText.value}</Markdown>}
            </Box>
          </Fade>
        )}
      </InView>

      <Placeholder
        name="collapsible-container-content"
        rendering={rendering}
        renderEach={(component, i) => (
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          <CollapsibleContext.Provider key={i.toString()} value={{ isCollapsed }}>
            {component}
          </CollapsibleContext.Provider>
        )}
      />
      <Media greaterThan="smallDesktop">
        <Box
          display="flex"
          justifyContent="center"
          py="m"
          mt="m"
          mx="auto"
          borderTop={borders[1]}
          borderTopColor={colors.grey[2]}
          maxWidth={maxWidth}
        >
          <ToggleButton styling="tertiary" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Copy size="regular" fontWeight="bold" color={themeName === HONDA_THEME_NAME ? 'black' : 'red'}>
              {isCollapsed ? expandLabel?.value : collapseLabel?.value}
            </Copy>{' '}
            <IconWrapper data-testid="icon-wrapper">
              <Icon
                name="animatedPlusMinus"
                toggle={!isCollapsed}
                iconColor={themeName === HONDA_THEME_NAME ? 'red' : 'black'}
              />
            </IconWrapper>
          </ToggleButton>
        </Box>
      </Media>
    </Box>
  );
};

export default CollapsibleContainer;
