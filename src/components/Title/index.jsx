import React from 'react';
import { Box, H3, Markdown, useMediaQueries } from '@honda-canada/design-system-react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import CTA from '../CTA';
import {
  colourTokenForParam,
  getCtaTypeFromBgColor,
  mapGTMCategory,
  foregroundColourTokenForParam,
} from '../../utils/sitecoreFields';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getTitleComponent, stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import { getComponentFromRoute } from '../../utils/sitecorePlaceholders';
import { getGtmTagValue } from '../../utils/gtmEvents';

const getCTA = (bgColor, ctaUrl, ctaType, ctaIcon, gtmInfo) => {
  const ctaTypeFieldValue = ctaType?.field?.value;
  const type = getCtaTypeFromBgColor(bgColor, ctaTypeFieldValue);
  const ariaLabel = ctaUrl.hasProp('title') ? ctaUrl.getProp('title') : ctaUrl.getProp('text');
  return (
    <CTA
      linkField={ctaUrl}
      typeField={{ value: type }}
      iconField={ctaIcon?.field}
      iconColor={type === 'tertiaryWhite' ? 'white' : undefined}
      gtmTags={{
        'aria-label': ariaLabel,
        'data-gtm-model': getGtmTagValue(gtmInfo?.gtmModelName),
        'data-gtm-trim': getGtmTagValue(gtmInfo?.gtmTrimName),
        'data-gtm-body-style': getGtmTagValue(gtmInfo?.gtmBodyStyle),
        'data-gtm-interaction-type': getGtmTagValue(gtmInfo?.gtmInteractionType),
        'data-gtm-title': getGtmTagValue(gtmInfo?.gtmTitle),
      }}
    >
      {ctaUrl.getProp('description')}
    </CTA>
  );
};

const Title = ({ fields, params, rendering, sitecoreContext }) => {
  const { isMobile } = useMediaQueries();

  if (!fields) {
    return null;
  }

  const {
    seoH1,
    ctaType1,
    ctaUrl1,
    ctaIcon1,
    ctaType2,
    ctaUrl2,
    ctaIcon2,
    ctaGtmInteractionType1,
    ctaGtmModelName1,
    ctaGtmTrimName1,
    ctaGtmBodyStyle1,
    ctaGtmInteractionType2,
    ctaGtmModelName2,
    ctaGtmTrimName2,
    ctaGtmBodyStyle2,
    title,
    description,
    anchorId,
    gtmTitle,
    gtmCategory,
    hideOnMobile,
    bottomPadding,
    topPadding,
  } = wrapJSSFields(fields);

  // If no Markdown heading is provided, the title should be an H3
  const TitleComponent = getTitleComponent(title?.value, H3);

  // FIXME: This ugly little hack makes the title sentence-case instead of all caps
  // if there's a TrimSpecifications component on the page. See https://jira.web.honda.ca:8443/browse/SCC-1561.
  // The proper solution is to not use a Title component on that page, and make the
  // title part of the TrimSpecifications component.
  const tabsContainerComponent = getComponentFromRoute('TabsContainer', sitecoreContext.route);
  const firstTabComponent = tabsContainerComponent?.placeholders['tabs-content'].find(
    component => component.componentName === 'Tab',
  );
  const tabContent = firstTabComponent && firstTabComponent.placeholders['tab-content'];
  const hasTrimSpecificiationsComponent = Boolean(
    tabContent && tabContent.find(c => c.componentName === 'TrimSpecifications'),
  );

  const titleContent = title?.value && (
    <TitleComponent
      color={foregroundColourTokenForParam[params?.bgColour?.toLowerCase()]}
      as={seoH1?.value === 'Title' && 'h1'}
      mb={['xs', 'm']}
      style={{ textTransform: hasTrimSpecificiationsComponent && 'none' }}
    >
      {styledCompiler(stripMarkdownHeading(title?.value))}
    </TitleComponent>
  );

  const bgColour = params?.bgColour?.toLowerCase();
  const CTA1 =
    ctaUrl1.hasProp('href') &&
    ctaUrl1.hasProp('text') &&
    getCTA(bgColour, ctaUrl1, ctaType1, ctaIcon1, {
      gtmTitle: gtmTitle?.value,
      gtmInteractionType: ctaGtmInteractionType1?.value,
      gtmModelName: ctaGtmModelName1?.value,
      gtmTrimName: ctaGtmTrimName1?.value,
      gtmBodyStyle: ctaGtmBodyStyle1?.value,
    });
  const CTA2 =
    ctaUrl2.hasProp('href') &&
    ctaUrl2.hasProp('text') &&
    getCTA(bgColour, ctaUrl2, ctaType2, ctaIcon2, {
      gtmTitle: gtmTitle?.value,
      gtmInteractionType: ctaGtmInteractionType2?.value,
      gtmModelName: ctaGtmModelName2?.value,
      gtmTrimName: ctaGtmTrimName2?.value,
      gtmBodyStyle: ctaGtmBodyStyle2?.value,
    });

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Wrapper = ({ children }) =>
    hideOnMobile?.value && isMobile ? <div style={{ display: 'none' }}>{children}</div> : <div>{children}</div>;

  return (
    <Wrapper>
      <Box
        backgroundColor={colourTokenForParam[params?.bgColour?.toLowerCase()]}
        display="flex"
        justifyContent="center"
        textAlign="center"
        pb={bottomPadding?.value ? `${bottomPadding.value}px` : ['xl', 'big']}
        pt={topPadding?.value ? `${topPadding.value}px` : ['xl', 'big']}
        data-gtm-category={getGtmTagValue(gtmTags?.category)}
        data-gtm-component-type={getGtmTagValue(gtmTags.type)}
        id={anchorId.value}
      >
        <Wrapper>
          <Box>
            {titleContent}
            <Box maxWidth="824px" mx="auto">
              <Markdown
                size="regular"
                color={foregroundColourTokenForParam[params?.bgColour?.toLowerCase()]}
                mb={['xs', 'm']}
                mx={['xs', 's', 'zero']}
                options={
                  (seoH1?.value === 'Description' ? 'h1' : '') && {
                    overrides: {
                      p: {
                        component: ({ children, type, ...props }) => {
                          const Elem = type;
                          return <Elem {...props}>{children}</Elem>;
                        },
                        children: description.value,
                        props: {
                          className: 'override',
                          type: seoH1?.value === 'Description' ? 'h1' : '',
                        },
                      },
                    },
                  }
                }
              >
                {description?.value}
              </Markdown>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection={['column', 'row']}>
              {CTA1 && (
                <Box mt={['xs', 'm']} mx={['zero', 's']}>
                  {CTA1}
                </Box>
              )}
              {CTA2 && (
                <Box mt={['xs', 'm']} mx={['zero', 's']}>
                  {CTA2}
                </Box>
              )}
            </Box>
          </Box>
        </Wrapper>
      </Box>
    </Wrapper>
  );
};

export default withSitecoreContext()(Title);
