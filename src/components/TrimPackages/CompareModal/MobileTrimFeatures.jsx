import React from 'react';
import { Box, Image, Button, MarkdownHeading, Copy, Fade } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';
import TrimFeaturesList from './TrimFeaturesList';
import CarouselSlider from '../../CarouselSlider';
import { styledCompiler } from '../../../utils/markdown';

import themeStyles from './CompareModal.styles';

const TrimFeaturesMobileWrapper = themeStyles.apply(Box, 'TrimFeaturesMobileWrapper');
const TrimFeaturesContent = themeStyles.apply(Box, 'TrimFeaturesContent');
const TrimFeaturesLegalText = themeStyles.apply(Copy, 'TrimFeaturesLegalText');
const TrimFeaturesSlideContent = themeStyles.apply(Box, 'TrimFeaturesSlideContent');
const TrimFeaturesSlideImage = themeStyles.apply(Box, 'TrimFeaturesSlideImage');
const TrimFeaturesSlideList = themeStyles.apply(Box, 'TrimFeaturesSlideList');

const MobileTrimFeatures = ({ trims, selectTrim, closeModal, features }) => {
  const { t } = useTranslation();

  return (
    <TrimFeaturesMobileWrapper>
      <CarouselSlider
        length={trims.length}
        paginationIsSticky
        splideOptions={{
          padding: {
            left: '20px',
            right: '20px',
          },
        }}
        content={
          <TrimFeaturesContent>
            <TrimFeaturesLegalText size="legal">
              {styledCompiler(t('Pages.Models.Exploration.legalText'))}
            </TrimFeaturesLegalText>
          </TrimFeaturesContent>
        }
      >
        {({ currentSlide }) =>
          trims.map((trim, i) => (
            <SplideSlide key={trim.transmissionModelCode}>
              <Fade
                as={Box}
                display="flex"
                justifyContent="center"
                key={trim.detIdentifier}
                flexDirection="column"
                my="l"
                duration={currentSlide === i ? 't4' : 't6'}
                direction={currentSlide === i ? 'in' : 'out'}
                initialOpacity={currentSlide === i ? 0 : 1}
              >
                <TrimFeaturesSlideContent>
                  <MarkdownHeading headingOverride="h6" mb="xs">
                    {trim.name}
                  </MarkdownHeading>
                  <TrimFeaturesSlideImage>
                    <Image src={trim.image.src} alt={trim.image.alt} style={{ maxWidth: '294px' }} />
                  </TrimFeaturesSlideImage>
                  {/* button takes you to the relevant trim page */}
                  <Button
                    type="button"
                    styling="secondary"
                    onClick={() => {
                      selectTrim(trim);
                      closeModal();
                    }}
                  >
                    {t('Pages.Models.Exploration.selectButtonLabel')}
                  </Button>
                </TrimFeaturesSlideContent>
                <TrimFeaturesSlideList>
                  {/* lists features for each trim */}
                  <TrimFeaturesList
                    allFeatures={features}
                    trim={trim.detIdentifier}
                    introText={
                      i > 0
                        ? t('Pages.Models.Exploration.trimFeaturesIntroText', { trimName: trims[i - 1].name })
                        : null
                    }
                  />
                </TrimFeaturesSlideList>
              </Fade>
            </SplideSlide>
          ))
        }
      </CarouselSlider>
    </TrimFeaturesMobileWrapper>
  );
};

export default MobileTrimFeatures;
