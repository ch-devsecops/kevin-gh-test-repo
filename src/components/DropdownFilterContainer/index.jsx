import React, { useReducer } from 'react';
import { isEditorActive, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import cloneDeep from 'lodash/cloneDeep';
import { Box, Button } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import themeStyles from './DropdownFilterContainer.styles';
import {
  getInitialState,
  reducer,
  SET_CONTENT_FILTER,
  SET_ERRORS,
  SET_SECTION_FILTER,
  SET_SELECTED_CONTENT,
} from './reducer';
import DropdownSelectors from '../DropdownSelectors';
import { pushGtmDropdownFilterEvent, getSelelectionValue } from './utils';

const StyledButton = themeStyles.apply(Button, 'StyledButton');

const DropdownFilterContainer = ({ fields, params = {}, rendering }) => {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialState(fields?.items, rendering?.placeholders?.['dropdown-filter-content']),
  );

  const { options, errors, selectedOptions, dropdowns, selectedContent } = state;

  if (!fields && !fields.items) {
    return null;
  }

  const { bgColour } = params;
  const selectedValue = getSelelectionValue(options, selectedOptions);

  const handleCtaClick = () => {
    dispatch({ type: SET_SELECTED_CONTENT });
    dispatch({ type: SET_ERRORS });
    pushGtmDropdownFilterEvent(selectedValue);
  };

  const { contentTitle, description, gtmCategory, gtmTitle } = wrapJSSFields(fields);

  return (
    <>
      <section data-gtm-category={mapGTMCategory(gtmCategory)} data-gtm-component-type={rendering?.componentName}>
        <DropdownSelectors
          title={contentTitle?.value}
          description={description?.value}
          dropdowns={dropdowns}
          options={options}
          selectedOptions={selectedOptions}
          errors={errors}
          bgColour={bgColour}
          onChange={(val, key) => {
            if (val === selectedOptions[key]) return;

            const type = key === 'section' ? SET_SECTION_FILTER : SET_CONTENT_FILTER;
            dispatch({
              type,
              payload: val,
            });
          }}
          cta={
            <StyledButton
              data-gtm-title={gtmTitle?.value}
              styling={fields.ctaType?.value?.toLowerCase()}
              onClick={handleCtaClick}
            >
              {fields.ctaLink.value.text}
            </StyledButton>
          }
        />

        <Placeholder
          name="dropdown-filter-content"
          rendering={rendering}
          render={components => {
            if (!selectedContent?.section) {
              return components;
            }

            const selectedSection = cloneDeep(components[selectedContent?.section]);

            if (selectedContent.content) {
              const content = selectedSection?.props?.rendering?.placeholders['section-content'] || [];
              selectedSection.props.rendering.placeholders['section-content'] = [content[selectedContent?.content]];
            }

            return selectedSection;
          }}
        />
      </section>
      {/* workaround so content `Add here` doesn't overlap the main `Add here` button in EE  */}
      {isEditorActive() && <Box height="24px" width="100%" />}
    </>
  );
};

export default DropdownFilterContainer;
