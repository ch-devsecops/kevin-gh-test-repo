import React, { useEffect, useReducer } from 'react';
import { Wrapper, Box, Row, Markdown, Copy, Button, useThemeContext } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import {
  colourTokenForParam,
  foregroundColourTokenForParam,
  mapGTMCategory,
  getCtaTypeFromBgColor,
} from '../../utils/sitecoreFields';
import Form from './Form';
import Dropdown from './Dropdown';
import reducer, { initialState } from './reducer';
import { ACURA_THEME_NAME } from '../../utils/constants';

const PreOrderBanner = ({ fields, params, rendering }) => {
  const theme = useThemeContext();
  const bgColour = params?.bgColour?.toLowerCase();
  const textColour = foregroundColourTokenForParam[bgColour];
  const textStyles = { color: textColour, textAlign: 'center' };
  // magic styling
  const componentWidth = '824px';
  const singleDropdownWidth = ['100%', '400px'];

  const labelProps = {
    color: textColour,
    size: 'extraSmall',
    mb: '2px',
    fontFamily: theme.name !== ACURA_THEME_NAME ? 'bold' : 'default',
  };

  const buttonStyling = getCtaTypeFromBgColor(bgColour, 'Primary');

  const { title, bodyText, ctaLink, jsonData, gtmCategory, gtmTitle } = wrapJSSFields(fields);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (jsonData && !state.isInitialized) {
      dispatch({ type: 'parseJson', payload: jsonData.value });
    }
  }, [jsonData]);

  useEffect(() => {
    const { dropdown } = state;

    if (dropdown && dropdown.options) {
      dispatch({ type: 'setSelectedOption', payload: dropdown.options[0] });
    }
  }, [state.dropdown]);

  const handleOptionSelect = optionValue => {
    const { dropdown } = state;
    const selected = dropdown.options.find(o => o.value === optionValue);

    dispatch({ type: 'setSelectedOption', payload: selected });
  };

  const handleAdditionalOptionSelect = (optionValue, i) => {
    const { additionalDropdowns } = state.selectedOption;
    const key = additionalDropdowns[i].paymentGatewayFieldName;
    const selected = additionalDropdowns[i].options.find(o => o.value === optionValue);

    dispatch({
      type: 'updateFormSubmission',
      payload: { [key]: selected?.value },
    });
  };

  if (!fields) return null;

  const { dropdown, selectedOption, additionalSelections = [], formSubmission } = state;
  const additionalDropdowns = selectedOption?.additionalDropdowns || [];

  return dropdown && dropdown.options ? (
    <Box
      bg={colourTokenForParam[bgColour]}
      py={['xl', 'big']}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
    >
      <Wrapper>
        {title && (
          <Box mb="m">
            <Markdown {...textStyles}>{title.value}</Markdown>
          </Box>
        )}
        {bodyText && (
          <Box mb="m" mx="auto" maxWidth={componentWidth}>
            <Markdown {...textStyles}>{bodyText.value}</Markdown>
          </Box>
        )}
      </Wrapper>
      <Form fields={formSubmission} action={ctaLink?.value?.href}>
        <Row
          mt={['default', 'l']}
          mb="l"
          mx="auto"
          justifyContent="center"
          textAlign="left"
          maxWidth={componentWidth}
          px={['10px', 'zero']}
        >
          <>
            <Dropdown
              value={selectedOption && selectedOption.value}
              options={dropdown.options}
              onChange={value => handleOptionSelect(value, 0)}
              label={<Copy {...labelProps}>{dropdown.label}</Copy>}
              columnWidth={additionalDropdowns.length > 0 ? [1, 1 / 3] : singleDropdownWidth}
            />
            {additionalDropdowns.map((d, i) => (
              <Dropdown
                value={additionalSelections[i]?.value}
                options={d.options}
                onChange={value => handleAdditionalOptionSelect(value, i)}
                label={<Copy {...labelProps}>{d.label}</Copy>}
                key={d.paymentGatewayFieldName}
                columnWidth={[1, 1 / 3]}
              />
            ))}
          </>
        </Row>
        <Button type="submit" styling={buttonStyling} data-gtm-title={gtmTitle?.value}>
          {ctaLink?.value?.text}
        </Button>
      </Form>
    </Box>
  ) : null;
};

export default PreOrderBanner;
