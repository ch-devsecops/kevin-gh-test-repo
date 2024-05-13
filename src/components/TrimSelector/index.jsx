import React, { useReducer, useEffect } from 'react';
import { Button } from '@honda-canada/design-system-react';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { reducer, getInitialState, SET_ERRORS, SET_PRESELECTED } from './reducer';
import DropdownSelectors from '../DropdownSelectors';
import { gtmTrimSelector } from '../../utils/gtmEvents';

const TrimSelector = ({ fields, params = {}, rendering }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(fields?.toggleContent?.value));
  const { options, dropdowns, errors, selectedOptions, selectedUrl } = state;

  useEffect(() => {
    // TODO: Unit test for this effect
    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year');
    if (year) {
      const preSelectedOptions = {
        year,
        model: searchParams.get('model'),
        trim: searchParams.get('trim'),
      };

      dispatch({ type: SET_PRESELECTED, payload: preSelectedOptions });
    }
  }, []);

  if (!dropdowns.length) return null;

  const { bgColour } = params;
  const { gtmTitle, gtmCategory, title, bodyText, ctaLabel } = fields;

  // handle error state on cta click when selectedUrl is falsy
  const handleClick = () => {
    dispatch({
      type: SET_ERRORS,
    });
  };

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
  };

  return (
    <DropdownSelectors
      title={title?.value}
      bodyText={bodyText?.value}
      gtmTags={gtmTags}
      dropdowns={dropdowns}
      options={options}
      selectedOptions={selectedOptions}
      errors={errors}
      bgColour={bgColour}
      onChange={(val, key) => {
        if (val === selectedOptions[key]) return;

        dispatch({
          type: `SET_${key.toUpperCase()}`,
          payload: val,
        });
      }}
      cta={
        <Button
          styling="primary"
          as="a"
          data-gtm-title={gtmTitle?.value}
          href={selectedUrl}
          onClick={() => {
            handleClick();
            gtmTrimSelector(gtmTitle?.value, state.selectedOptions);
          }}
        >
          {ctaLabel.value}
        </Button>
      }
    />
  );
};

export default TrimSelector;
