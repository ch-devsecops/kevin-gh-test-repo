import React from 'react';
import {
  Box,
  Row,
  Column,
  Image,
  Button,
  H3,
  MarkdownHeading,
  Media,
  Copy,
  Wrapper,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { compiler } from 'markdown-to-jsx';
import TrimFeaturesList from './TrimFeaturesList';
import { useAcuraHeadingFontFamily } from '../utils';
import { styledCompiler } from '../../../utils/markdown';

import themeStyles from './CompareModal.styles';

const TrimFeaturesWrapper = themeStyles.apply(Box, 'TrimFeaturesWrapper');
const TrimFeaturesImageWrapper = themeStyles.apply(Box, 'TrimFeaturesImageWrapper');
const TrimFeaturesDisclaimerWrapper = themeStyles.apply(Box, 'TrimFeaturesDisclaimerWrapper');
const TrimFeaturesColumn = themeStyles.apply(Box, 'TrimFeaturesColumn');

const DesktopTrimFeatures = ({ trims, selectTrim, closeModal, features }) => {
  const { t } = useTranslation();
  const featuresTitleFontFamily = useAcuraHeadingFontFamily();
  return (
    <Wrapper>
      {trims.map((trim, i) => (
        <TrimFeaturesWrapper key={trim.detIdentifier}>
          <TrimFeaturesColumn width={[1, 1 / 3]}>
            <H3>{compiler(trim.name)}</H3>
            <TrimFeaturesImageWrapper>
              <Image src={trim.image.src} alt={trim.image.alt} style={{ maxWidth: '294px' }} />
            </TrimFeaturesImageWrapper>
            {/* button takes you to the relevant trim page */}
            <Button
              my={['m', 0]}
              type="button"
              styling="secondary"
              onClick={() => {
                selectTrim(trim);
                closeModal();
              }}
            >
              {t('Pages.Models.Exploration.selectButtonLabel')}
            </Button>
          </TrimFeaturesColumn>
          <Column width={[1, 1 / 3]}>
            <Media greaterThan="mobile">
              <MarkdownHeading fontFamily={featuresTitleFontFamily} mb="xxs">
                {t('Pages.Models.Exploration.trimFeaturesHeading', { trimName: trim.name })}
              </MarkdownHeading>
            </Media>
            {/* lists features for each trim */}
            <Row>
              <TrimFeaturesList
                allFeatures={features}
                trim={trim.detIdentifier}
                introText={
                  i > 0 ? t('Pages.Models.Exploration.trimFeaturesIntroText', { trimName: trims[i - 1].name }) : null
                }
              />
            </Row>
          </Column>
        </TrimFeaturesWrapper>
      ))}
      <TrimFeaturesDisclaimerWrapper>
        <Copy size="legal">{styledCompiler(t('Pages.Models.Exploration.legalText'))}</Copy>
      </TrimFeaturesDisclaimerWrapper>
    </Wrapper>
  );
};

export default DesktopTrimFeatures;
