export const SET_SELECTED_CONTENT = 'SET_SELECTED_CONTENT';
export const SET_OPTION = 'SET_OPTION';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_SECTION_FILTER = 'SET_SECTION_FILTER';
export const SET_CONTENT_FILTER = 'SET_CONTENT_FILTER';

export const getInitialState = (dropdownData = [], optionsData = []) => {
  const dropdowns = dropdownData.map((dropdown, i) => {
    const { contentTitle, placeholderText, errorText } = dropdown.fields;

    return {
      key: i === 0 ? 'section' : 'content',
      name: contentTitle?.value?.toLowerCase(),
      label: contentTitle?.value,
      placeholder: placeholderText?.value,
      error: errorText?.value,
    };
  });

  const options = {
    section: optionsData.map((item, optionIndex) => ({
      text: item?.fields?.contentTitle?.value,
      value: optionIndex.toString(),
    })),
    content: [],
  };

  const contentData = optionsData.map(section => {
    const sectionContent = section?.placeholders?.['section-content'] || [];
    return sectionContent.map((option, optionIndex) => {
      const value = option?.fields?.contentTitle?.value || option?.fields?.title?.value;

      return {
        text: value,
        value: optionIndex.toString(),
      };
    });
  });

  return {
    contentData,
    dropdowns,
    options,
    selectedOptions: {},
    errors: {},
    selectedContent: {}, // same as selectedOptions but only updated when cta is clicked
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SECTION_FILTER: {
      const { payload } = action;
      const content = state.contentData[payload];

      return {
        ...state,
        selectedOptions: {
          section: payload,
        },
        options: {
          ...state.options,
          content,
        },
        errors: {
          ...state.errors,
          section: false,
        },
      };
    }

    case SET_CONTENT_FILTER: {
      const { payload } = action;

      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          content: payload,
        },
        errors: {
          ...state.errors,
          content: false,
        },
      };
    }

    case SET_SELECTED_CONTENT: {
      return {
        ...state,
        selectedContent: { ...state.selectedOptions },
      };
    }

    case SET_ERRORS: {
      const errors = {
        section: !state.selectedOptions.section,
        content: !state.selectedOptions.content,
      };

      return {
        ...state,
        errors,
      };
    }

    default: {
      return state;
    }
  }
};
