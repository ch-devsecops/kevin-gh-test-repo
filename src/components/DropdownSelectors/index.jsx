import React, { useContext } from 'react';
import { Box, Copy, Dropdown, H2, Markdown, Optional, withLabelAndError } from '@honda-canada/design-system-react';

import { useTranslation } from 'react-i18next';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { getTitleComponent, stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import { colourTokenForParam } from '../../utils/sitecoreFields';
import themeStyles from './DropdownSelectors.styles';

const BodyText = themeStyles.apply(Copy, 'BodyText');
const DropdownWithLabel = withLabelAndError(Dropdown);
const DropdownWrapper = themeStyles.apply(Box, 'DropdownWrapper');
const Description = themeStyles.apply(Box, 'Description');
const BottomDisclaimerText = themeStyles.apply(Copy, 'BottomDisclaimerText');

const DropdownSelectors = ({
  title,
  bodyText,
  description,
  descriptionStyles,
  gtmTags = {},
  bgColour,
  textColour = 'default',
  dropdowns,
  options,
  selectedOptions,
  onChange,
  errors = {},
  cta,
  bodyTextPosition = 'top',
  disclaimerMargins,
  inputProps,
}) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const TitleComponent = getTitleComponent(title, H2);
  const topText = bodyTextPosition === 'top';
  const bottomText = bodyTextPosition === 'bottom';
  const { t } = useTranslation();

  return (
    <Box
      pt={['xl', 'big']}
      pb={bottomText ? '20px' : ['xl', 'big']}
      px={['20px', 'xhuge']}
      display="flex"
      alignItems="center"
      flexDirection="column"
      bg={colourTokenForParam[bgColour?.toLowerCase()]}
      data-gtm-category={gtmTags.category}
      data-gtm-component-type={gtmTags.type}
    >
      <TitleComponent
        mb={[bodyText ? 'xs' : 'default', bodyText ? 'm' : 'l']}
        width="100%"
        textAlign="center"
        textTransform="none !important"
        color={textColour}
        data-testid="cy-dropdown-selectors-title"
      >
        {styledCompiler(stripMarkdownHeading(title))}
      </TitleComponent>
      {topText && bodyText && (
        <BodyText color={textColour} data-testid="cy-dropdown-selectors-bodytext">
          {styledCompiler(stripMarkdownHeading(bodyText))}
        </BodyText>
      )}
      <Optional when={description}>
        <Description data-testid="cy-dropdown-selectors-description" {...descriptionStyles}>
          <Markdown>{description}</Markdown>
        </Description>
      </Optional>

      <DropdownWrapper>
        {dropdowns.map(dropdown => {
          if (!dropdown) return null;
          const enabledColor = isDark ? 'white' : 'black';

          const { key, name } = dropdown;
          const disabled = !options?.[key]?.length;
          const DropdownLabel = (
            <Copy
              color={disabled ? 'grey.0' : enabledColor}
              fontFamily="bold"
              data-testid={`cy-dropdown-selectors-${dropdown.label}`}
            >
              {dropdown.label}
            </Copy>
          );

          const dropdownOptions = options[key]?.map(option => ({
            ...option,
            text: stripMarkdownHeading(option?.text),
          }));

          return (
            <Box width={['100%', '230px']} mb={['38px', '38px', '40px']} key={dropdown.key}>
              <DropdownWithLabel
                name={`dropdown-${name || key}`}
                value={selectedOptions[key]}
                label={DropdownLabel}
                options={dropdownOptions}
                styling={bgColour === 'Grey' ? 'secondary' : 'primary'}
                onChange={val => onChange(val, key)}
                ariaLabel={t('Shared.Common.selectTrimDropdownMenuAria')}
                placeholderText={dropdown.placeholder}
                error={errors[key] && dropdown.error}
                hasError={errors[key]}
                inputProps={{
                  ...inputProps,
                  ...(errors[key] && { 'aria-invalid': true }),
                  'aria-label': `dropdown-${name || key}`,
                }}
                disabled={disabled}
              />
            </Box>
          );
        })}
      </DropdownWrapper>
      {cta}
      {bottomText && bodyText && (
        <BottomDisclaimerText
          color={textColour}
          data-testid="cy-dropdown-price-disclaimer"
          disclaimerMargins={disclaimerMargins}
        >
          {styledCompiler(bodyText)}
        </BottomDisclaimerText>
      )}
    </Box>
  );
};

export default DropdownSelectors;
