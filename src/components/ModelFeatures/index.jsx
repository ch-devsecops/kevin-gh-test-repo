import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import PropTypes from 'prop-types';

import { createObjectFromProps } from '../../utils/object';
import { colourTokenForParam, mapGTMCategory } from '../../utils/sitecoreFields';
import { JSSFieldPropType } from '../../utils/propTypes';

import ModelFeaturesComponent from './ModelFeatures';

const ModelFeatures = ({ fields, params, rendering }) => {
  const { sitecoreContext: { route } = {} } = useSitecoreContext();

  if (!fields) return null;

  const { isDarkMode } = createObjectFromProps(route?.fields || {});
  const { data } = createObjectFromProps(fields);

  if (!data) return null;

  return (
    <ModelFeaturesComponent
      gtmTags={{
        title: data?.gtmTitle,
        category: mapGTMCategory(data?.gtmCategory),
        type: rendering?.componentName,
      }}
      isDarkMode={isDarkMode}
      checklistIconLocation={params?.checklistIconLocation?.toLowerCase()}
      bottomMargin={params?.bottomMargin}
      contentBgColour={colourTokenForParam[params?.contentBgColour?.toLowerCase()]}
      topMargin={params?.topMargin}
      shownInColumns={params?.shownInColumns?.toLowerCase()}
      bodyText={data?.bodyText}
      modelYear={data?.modelYear}
      title={data?.title}
      iconImage={data?.iconImage?.item}
      isAdditionalFeatures={data?.isAdditionalFeatures}
    />
  );
};

ModelFeatures.propTypes = {
  rendering: PropTypes.shape({ componentName: PropTypes.string }),
  params: PropTypes.shape({
    checklistIconLocation: PropTypes.string,
    bottomMargin: PropTypes.string,
    contentBgColour: PropTypes.string,
    topMargin: PropTypes.string,
    shownInColumns: PropTypes.string,
  }),
  fields: PropTypes.shape({
    bodyText: JSSFieldPropType,
    title: JSSFieldPropType,
    isAdditionalFeatures: PropTypes.bool,
    iconImage: JSSFieldPropType,
    modelYear: PropTypes.shape({
      fields: PropTypes.shape({
        standardFeatures: PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              featureName: JSSFieldPropType,
              description: JSSFieldPropType,
            }),
          ),
        }),
        trims: PropTypes.arrayOf(
          PropTypes.shape({
            additionalFeatures: PropTypes.shape({
              items: PropTypes.arrayOf(
                PropTypes.shape({
                  featureName: JSSFieldPropType,
                  description: JSSFieldPropType,
                }),
              ),
            }),
          }),
        ),
      }),
    }),
  }),
};

export default ModelFeatures;
