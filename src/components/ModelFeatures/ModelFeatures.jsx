import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, H3, Markdown, Optional, Wrapper } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import columnMap from './constants';
import themeStyles from './ModelFeatures.styles';
import IconWithLabel from './IconWithLabel';

const FeaturesWrapper = themeStyles.apply(Wrapper, 'Wrapper');
const FeaturesList = themeStyles.apply(Box, 'List');

const Feature = (item, isDarkMode, checklistIconLocation, iconImage) => {
  const { featureName } = item;
  return (
    <IconWithLabel
      key={featureName}
      isDarkMode={isDarkMode}
      iconPosition={checklistIconLocation}
      iconImage={iconImage}
      {...item}
    />
  );
};

const StandardFeatures = ({
  gtmTags,
  isDarkMode,
  bottomMargin,
  contentBgColour,
  topMargin,
  shownInColumns,
  bodyText,
  modelYear,
  title,
  iconImage,
  checklistIconLocation,
  isAdditionalFeatures,
}) => {
  const { t } = useTranslation();
  const TitleComponent = useMemo(() => getTitleComponent(title, H3), [title]);

  return (
    <FeaturesWrapper
      data-gtm-title={gtmTags?.title}
      data-gtm-category={gtmTags?.category}
      data-gtm-component-type={gtmTags?.type}
      marginBottom={bottomMargin}
      marginTop={topMargin}
      backgroundColor={contentBgColour}
    >
      <TitleComponent mb="m" color={isDarkMode ? 'white' : undefined}>
        {compiler(stripMarkdownHeading(title))}
      </TitleComponent>
      <Markdown mb="l" color={isDarkMode ? 'white' : undefined}>
        {stripMarkdownHeading(bodyText)}
      </Markdown>
      <Button mb="xl" styling={isDarkMode ? 'special' : 'primary'}>
        {t('Pages.Models.Exploration.trimPackagesCompareTrimsLabel').toUpperCase()}
      </Button>
      <FeaturesList columnCount={columnMap[shownInColumns]}>
        <Optional when={!isAdditionalFeatures}>
          {modelYear?.standardFeatures?.item?.map(item => Feature(item, isDarkMode, checklistIconLocation, iconImage))}
        </Optional>
        <Optional when={isAdditionalFeatures}>
          {modelYear?.trims?.map(trim =>
            trim?.additionalFeatures?.item?.map(item => Feature(item, isDarkMode, checklistIconLocation, iconImage)),
          )}
        </Optional>
      </FeaturesList>
    </FeaturesWrapper>
  );
};

StandardFeatures.defaultProps = {
  isAdditionalFeatures: false,
};

StandardFeatures.propTypes = {
  isDarkMode: PropTypes.bool,
  /**
   * Is AdditionalFeatures: Checkbox[Shared] - When this gets checked,
   * the component should render the additional features instead of standard features
   * (Default state: Unchecked)
   */
  isAdditionalFeatures: PropTypes.bool,
  iconImage: PropTypes.shape({}),
  bodyText: PropTypes.string,
  title: PropTypes.string,
  // Model Year - CE selects the model year from the dropdown tree
  modelYear: PropTypes.shape({
    standardFeatures: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          featureName: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }),
    trims: PropTypes.arrayOf(
      PropTypes.shape({
        additionalFeatures: PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              featureName: PropTypes.string,
              description: PropTypes.string,
            }),
          ),
        }),
      }),
    ),
  }),
  checklistIconLocation: PropTypes.string,
  contentBgColour: PropTypes.string,
  bottomMargin: PropTypes.string,
  topMargin: PropTypes.string,
  shownInColumns: PropTypes.string,
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default StandardFeatures;
