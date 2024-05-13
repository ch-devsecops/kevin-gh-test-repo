/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import forEach from 'lodash/forEach';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Markdown, H2, ContentToggle, Box, Fade, Wrapper, Row, Column } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, getTitleComponent, styledCompiler } from '../../utils/markdown';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { usePageEditing } from '../../utils/sitecoreContext';

const SectionContainer = ({ fields, rendering, params }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const isPageEditing = usePageEditing();

  if (!fields || !params) {
    return null;
  }

  const { isSubSection = false } = params;
  const { seoH1, contentTitle, subtitle, ariaLabel, isCollapsible, expandLabel, collapseLabel, anchorId, gtmCategory } =
    wrapJSSFields(fields);

  forEach(rendering?.placeholders['section-content'], children => {
    if (children.componentName === 'SectionContainer') {
      if (!children.params) {
        children.params = {};
      }

      children.params.isSubSection = true;
    }
  });

  let background = params?.bgColour?.toLowerCase().replace(' ', '');
  if (isDark) {
    background = 'black';
  } else if (background === 'grey') {
    background = 'grey.5';
  }

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };

  const seoTitle = seoH1?.value === 'Title' ? 'h1' : '';
  const seoSubtitle = seoH1?.value === 'Subtitle' ? 'h1' : '';
  const bottomMargin = params?.bottomMargin || 96;
  const topMargin = params?.topMargin || 96;

  let MarkdownTitle;
  if (contentTitle?.value) {
    const TitleComponent = getTitleComponent(contentTitle?.value, H2);
    MarkdownTitle = (
      <TitleComponent as={seoTitle} color={isDark ? 'white' : 'black'}>
        {styledCompiler(stripMarkdownHeading(contentTitle?.value))}
      </TitleComponent>
    );
  }

  const MarkdownSubtitle = subtitle?.value && (
    <Markdown as={seoSubtitle} color={isDark ? 'white' : 'black'}>
      {subtitle.value}
    </Markdown>
  );

  const isContentCollapsible = isCollapsible?.value;

  const Content = (
    <Box pb={['xl', bottomMargin ? `${bottomMargin}px` : '']} pt={['xl', topMargin ? `${topMargin}px` : '']}>
      <Box mb={MarkdownTitle ? ['default', 'l'] : 0} id={anchorId?.value}>
        <InView triggerOnce threshold={0.25}>
          {({ inView, ref }) => (
            <Fade ref={ref} shouldAnimate={inView} initialOpacity={0}>
              <Wrapper>
                <Box textAlign="center">
                  {MarkdownTitle && (
                    <Row justifyContent="center">
                      <Column width={[1, 10 / 12]}>{MarkdownTitle}</Column>
                    </Row>
                  )}

                  {MarkdownSubtitle && (
                    <Row justifyContent="center">
                      <Column width={[1, 8 / 12]} mt={MarkdownTitle ? ['xs', 'm'] : 0}>
                        {MarkdownSubtitle}
                      </Column>
                    </Row>
                  )}
                </Box>
              </Wrapper>
            </Fade>
          )}
        </InView>
      </Box>

      <Placeholder name="section-content" rendering={rendering} />
    </Box>
  );

  return (
    <div>
      {isSubSection ? (
        <ContentToggle
          collapseLabel={collapseLabel?.value}
          expandLabel={expandLabel?.value}
          isAlwaysExpanded={isContentCollapsible ? isPageEditing : false}
        >
          {Content}
        </ContentToggle>
      ) : (
        <Box
          as="section"
          bg={background}
          aria-label={ariaLabel?.value}
          data-gtm-category={gtmTags.category}
          data-gtm-component-type={gtmTags.type}
        >
          {Content}
        </Box>
      )}
    </div>
  );
};

export default SectionContainer;
