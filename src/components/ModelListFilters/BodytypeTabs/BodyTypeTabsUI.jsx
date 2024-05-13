import React, { useContext, useRef, useState, useEffect } from 'react';
import { Tab, Copy, Media, Optional, Icon, IconWrapper } from '@honda-canada/design-system-react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { SplideSlide, Splide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';
import themeStyles, { StyledBox } from '../modelListFilter.styles';
import { ModelFiltersContext } from '../../ModelFiltersContext';

const ArrowWrapper = themeStyles.apply(IconWrapper, 'ArrowWrapper');
const StyledSplide = themeStyles.apply(SplideSlide, 'StyledSplide');
const AllModelsTab = themeStyles.apply(StyledSplide, 'AllModelsTab');

const GtmInteractionType = 'filter by vehicle type';

const BodyTypeTabsUI = ({
  sitecoreContext,
  bodyTypes: allBodyTypes,
  showFutureVehicle,
  dispatchType,
  hasReducedSpacing,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const splideRef = useRef(null);
  const { dispatchFilter, filter } = useContext(ModelFiltersContext) || {};
  const { language } = sitecoreContext;
  // we expect French labels to be longer than English, enough to warrant a different layout
  const hasLongLabels = language === 'fr' && hasReducedSpacing;
  const activeBodyType = filter?.values?.[dispatchType][0];
  const { t } = useTranslation();
  const options = {
    perPage: 6,
    perMove: 6,
    arrows: false,
    pagination: false,
    width: hasLongLabels ? '760px' : '700px',
    breakpoints: {
      1160: {
        width: hasLongLabels ? '660px' : '600px',
      },
      1040: {
        width: hasLongLabels ? '640px' : '600px',
      },
    },
  };

  useEffect(() => {
    const selectedIndex = allBodyTypes.findIndex(bodyType => bodyType.key === activeBodyType);
    if (selectedIndex >= 5) {
      splideRef?.current?.go('+6');
    } else if (selectedIndex < 5) {
      splideRef?.current?.go('-6');
    }
  }, [activeBodyType]);

  const isFirstPage = currentSlide === 0;
  const hasArrows = allBodyTypes.length >= 6;

  return (
    <Media greaterThan="smallDesktop">
      <Optional when={dispatchType === 'model' && hasArrows}>
        <StyledBox
          hasLongLabels={hasLongLabels}
          data-gtm-gategory="vehicle list"
          data-gtm-component-type="tab nav"
          data-testid="cy-top-nav-categories"
          hasArrows={hasArrows}
        >
          <ArrowWrapper
            data-testid="cy-top-nav-left-button"
            onClick={() => splideRef.current.go('-6')}
            isVisible={!isFirstPage}
          >
            <Icon iconColor="black" name="arrowLeft" />
          </ArrowWrapper>
          <Splide
            options={options}
            ref={splideRef}
            onMove={(_, slideIndex) => {
              setCurrentSlide(slideIndex);
            }}
          >
            <AllModelsTab isVisible={isFirstPage} hasLongLabels={hasLongLabels}>
              <Tab
                isActive={
                  (filter?.values?.[dispatchType].length === 0 && !filter?.onlyFutureVehicles) ||
                  activeBodyType === undefined
                }
                onClick={() => {
                  if (filter?.onlyFutureVehicles) {
                    dispatchFilter({ type: 'RESET' });
                  } else if (activeBodyType) {
                    dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: dispatchType, value: activeBodyType } });
                  }
                }}
                minHeight={hasLongLabels ? '48px' : 'auto'}
                data-gtm-title={t('Pages.Models.Exploration.filterAllModelsLabel', 'en')?.toLowerCase()}
                data-gtm-interaction-type={GtmInteractionType}
                data-testid="cy-top-nav-all"
              >
                <Copy fontWeight="bold" size="small">
                  {t('Pages.Models.Exploration.filterAllModelsLabel')}
                </Copy>
              </Tab>
            </AllModelsTab>
            {allBodyTypes?.map((bodyType, i) => (
              <StyledSplide key={bodyType} tabNumber={i} isFirstPage={isFirstPage}>
                <Tab
                  isActive={
                    filter?.values?.[dispatchType].length === 1 && filter?.values?.[dispatchType][0] === bodyType.key
                  }
                  onClick={() => {
                    if (activeBodyType) {
                      dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: dispatchType, value: activeBodyType } });
                    }
                    dispatchFilter({ type: 'ADD_ITEM', payload: { item: dispatchType, value: bodyType.key } });
                  }}
                  minHeight={hasLongLabels ? '48px' : 'auto'}
                  key={bodyType.key}
                  data-gtm-title={bodyType.key?.toLowerCase()}
                  data-gtm-interaction-type={GtmInteractionType}
                  data-testid="cy-top-nav-category"
                >
                  <Copy fontWeight="bold" size="small">
                    {bodyType.value}
                  </Copy>
                </Tab>
              </StyledSplide>
            ))}
          </Splide>
          <ArrowWrapper
            data-testid="cy-top-nav-right-button"
            onClick={() => splideRef.current.go('+6')}
            isVisible={isFirstPage}
          >
            <Icon iconColor="black" name="arrowRight" />
          </ArrowWrapper>
          <Optional when={showFutureVehicle}>
            <Tab
              isActive={filter?.onlyFutureVehicles}
              onClick={() => {
                dispatchFilter({ type: 'SET_ONLY_FUTURE_VEHICLES', payload: !filter?.onlyFutureVehicles });
              }}
              minHeight={hasLongLabels ? '48px' : 'auto'}
              data-gtm-title={t('Pages.Models.Exploration.filterFutureVehiclesLabel', 'en')?.toLowerCase()}
              data-gtm-interaction-type={GtmInteractionType}
            >
              <Copy fontWeight="bold" size="small">
                {t('Pages.Models.Exploration.filterFutureVehiclesLabel')}
              </Copy>
            </Tab>
          </Optional>
        </StyledBox>
      </Optional>
      <Optional when={!hasArrows}>
        <StyledBox
          hasLongLabels={hasLongLabels}
          data-gtm-gategory="vehicle list"
          data-gtm-component-type="tab nav"
          data-testid="cy-top-nav-categories"
        >
          <Tab
            isActive={filter?.values?.[dispatchType].length === 0 && !filter?.onlyFutureVehicles}
            onClick={() => {
              if (filter?.onlyFutureVehicles) {
                dispatchFilter({ type: 'RESET' });
              } else if (activeBodyType) {
                dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: dispatchType, value: activeBodyType } });
              }
            }}
            minHeight={hasLongLabels ? '48px' : 'auto'}
            data-gtm-title={t('Pages.Models.Exploration.filterAllModelsLabel', 'en')?.toLowerCase()}
            data-gtm-interaction-type={GtmInteractionType}
            data-testid="cy-top-nav-all"
          >
            <Copy fontWeight="bold" size="small">
              {t('Pages.Models.Exploration.filterAllModelsLabel')}
            </Copy>
          </Tab>
          {allBodyTypes?.map(bodyType => (
            <Tab
              isActive={
                filter?.values?.[dispatchType].length === 1 && filter?.values?.[dispatchType][0] === bodyType.key
              }
              onClick={() => {
                if (activeBodyType) {
                  dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: dispatchType, value: activeBodyType } });
                }
                dispatchFilter({ type: 'ADD_ITEM', payload: { item: dispatchType, value: bodyType.key } });
              }}
              minHeight={hasLongLabels ? '48px' : 'auto'}
              key={bodyType.key}
              data-gtm-title={bodyType.key?.toLowerCase()}
              data-gtm-interaction-type={GtmInteractionType}
              data-testid="cy-top-nav-category"
            >
              <Copy fontWeight="bold" size="small">
                {bodyType.value}
              </Copy>
            </Tab>
          ))}
          <Optional when={showFutureVehicle}>
            <Tab
              isActive={filter?.onlyFutureVehicles}
              onClick={() => {
                dispatchFilter({ type: 'SET_ONLY_FUTURE_VEHICLES', payload: !filter?.onlyFutureVehicles });
              }}
              minHeight={hasLongLabels ? '48px' : 'auto'}
              data-gtm-title={t('Pages.Models.Exploration.filterFutureVehiclesLabel', 'en')?.toLowerCase()}
              data-gtm-interaction-type={GtmInteractionType}
            >
              <Copy fontWeight="bold" size="small">
                {t('Pages.Models.Exploration.filterFutureVehiclesLabel')}
              </Copy>
            </Tab>
          </Optional>
        </StyledBox>
      </Optional>
    </Media>
  );
};

export default withSitecoreContext()(BodyTypeTabsUI);
