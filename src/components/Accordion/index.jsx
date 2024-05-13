import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Wrapper as DesignSystemWrapper, Box, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import themeStyles from './Accordion.styles';
import AccordionItem from '../AccordionItem';
import { JSSFieldPropType } from '../../utils/propTypes';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import getContentMargins from '../../utils/getContentMargins';
import { getAccordionGtmTagsByProductName, getGtmTags } from './utils';

const Wrapper = themeStyles.apply(DesignSystemWrapper, 'Wrapper');
const Container = themeStyles.apply(Box, 'Container');
const Section = themeStyles.apply(Wrapper, 'Section');
const ExpandButton = themeStyles.apply(Box, 'ExpandButton');
const Title = themeStyles.apply(Box, 'Title');

const Accordion = ({ rendering, fields, params = {} }) => {
  const {
    sitecoreContext: { pageEditing, site: { name: appName } = {} },
  } = useSitecoreContext();
  const [isAllExpanded, setIsAllExpanded] = useState(true);
  const [activeTabs, setActiveTabs] = useState([]);
  const { t } = useTranslation();

  const items = rendering?.placeholders?.['accordion-container-content'];
  const itemIds = items?.map(item => item.uid);
  const expandLabel = isAllExpanded
    ? t('Shared.CompareTrims.collapseAllLabel')
    : t('Shared.CompareTrims.expandAllLabel');

  const margins = getContentMargins(params);

  const gtmTagFields = {
    componentName: rendering?.componentName,
    bodyStyle: fields?.gtmBodyStyle?.value,
    modelName: fields?.gtmModelName?.value,
    trimName: fields?.gtmTrimName?.value,
    category: mapGTMCategory(fields?.gtmCategory),
    interactionType: fields?.gtmInteractionType?.value,
  };

  if (!pageEditing && items?.length === 0) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsAllExpanded(itemIds?.length === activeTabs.length);
  }, [activeTabs?.length]);

  const onExpandAll = () => {
    if (itemIds.length !== activeTabs.length) {
      setActiveTabs(itemIds);
    } else {
      setActiveTabs([]);
    }
  };

  return (
    <Wrapper {...getGtmTags(gtmTagFields?.category, gtmTagFields?.componentName)} data-testid="accordion-wrapper">
      <Container margins={margins} isEditorActive={pageEditing}>
        <Optional when={fields?.showExpandCollapseControl?.value}>
          <Title onClick={onExpandAll} data-testid="expand-all">
            <ExpandButton role="button" aria-expanded={isAllExpanded} aria-label={expandLabel} type="button">
              {expandLabel}
            </ExpandButton>
          </Title>
        </Optional>

        <Section>
          <Placeholder
            name="accordion-container-content"
            rendering={rendering}
            renderEach={(component, index) => {
              const gtmTitle = component?.props?.fields?.gtmTitle?.value;
              const gtmTags = {
                ...getAccordionGtmTagsByProductName({
                  appName,
                  gtmTags: { ...gtmTagFields, gtmTitle },
                }),
              };
              const gtmEventPayload = {
                title: gtmTitle,
                itemId: component.props?.rendering?.uid,
                category: component?.props?.fields?.gtmCategory,
              };
              return (
                <AccordionItem
                  key={index.toString()}
                  rendering={component.props?.rendering}
                  activeTabs={activeTabs}
                  gtmEventPayload={gtmEventPayload}
                  gtmTags={gtmTags}
                  appName={appName}
                  pageEditing={pageEditing}
                  setActiveTabs={setActiveTabs}
                />
              );
            }}
          />
        </Section>
      </Container>
    </Wrapper>
  );
};

Accordion.propTypes = {
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
    placeholders: PropTypes.shape({ 'accordion-container-content': PropTypes.arrayOf(PropTypes.shape({})) }),
  }),
  fields: PropTypes.shape({
    showExpandCollapseControl: PropTypes.shape({ value: PropTypes.bool }),
    gtmCategory: JSSFieldPropType,
    gtmBodyStyle: JSSFieldPropType,
    gtmModelName: JSSFieldPropType,
    gtmTrimName: JSSFieldPropType,
    gtmInteractionType: JSSFieldPropType,
  }),
  params: PropTypes.shape({}),
};

export default Accordion;
