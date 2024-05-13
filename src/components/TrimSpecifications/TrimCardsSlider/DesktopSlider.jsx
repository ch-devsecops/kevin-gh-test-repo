import React, { useContext } from 'react';
import { Row, Media, Column, Image, Wrapper } from '@honda-canada/design-system-react';
import { SplideSlide, Splide } from '@splidejs/react-splide';
import { compiler } from 'markdown-to-jsx';
import Context from '../service/Context';

import themeStyles, { SplideSlideBadgeLabel as BadgeLabel } from '../TrimSpecifications.styles';

const StyledWrapper = themeStyles.apply(Wrapper, 'DesktopSliderHeaderWrapper');
const StyledRow = themeStyles.apply(Row, 'DesktopSliderRow');
const StyledContent = themeStyles.apply(Wrapper, 'SplideSlideContent');
const StyledBadge = themeStyles.apply(Wrapper, 'SplideSlideBadge');
const DownloadColumn = themeStyles.apply(Column, 'DownloadColumn');
const TrimTitleColumn = themeStyles.apply(Column, 'TrimTitleColumn');

const DesktopSliderHeader = ({ downloadCTA, trimsTitleRef, trims, isPaginationSticky }) => {
  const configurationProvider = useContext(Context);
  const { isDark, splideOptions, setCurrentSlide, selectedTrim, setSelectedTrim } = configurationProvider || {};

  return (
    <Media greaterThan="mobile">
      {(mediaClassNames, renderChildren) =>
        renderChildren && (
          <StyledWrapper className={mediaClassNames} aria-hidden>
            <StyledRow isDark={isDark}>
              <DownloadColumn>{downloadCTA}</DownloadColumn>
              <TrimTitleColumn>
                <Splide
                  options={splideOptions}
                  ref={trimsTitleRef}
                  onActive={(_, slide) => {
                    setCurrentSlide(slide.index);
                  }}
                >
                  {trims?.map(trim => (
                    <SplideSlide key={trim?.name} data-testid="cy-product-wrapper">
                      <StyledContent
                        isPaginationSticky={isPaginationSticky}
                        isSelectedTrim={trim?.detIdentifier === selectedTrim}
                        onClick={() => setSelectedTrim(trim?.detIdentifier)}
                      >
                        {trim?.nameBadge?.src ? (
                          <StyledBadge>
                            <Image {...trim?.nameBadge} />
                          </StyledBadge>
                        ) : (
                          <BadgeLabel size="regular" isDark={isDark} data-testid="cy-product-name">
                            {compiler(trim?.name)}
                          </BadgeLabel>
                        )}
                      </StyledContent>
                    </SplideSlide>
                  ))}
                </Splide>
              </TrimTitleColumn>
            </StyledRow>
          </StyledWrapper>
        )
      }
    </Media>
  );
};

export default DesktopSliderHeader;
