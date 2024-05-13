/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Column,
  Copy,
  Row,
  MediaItem,
  useOptionalVideo,
  Box,
  Markdown,
  H3,
  Wrapper,
} from '@honda-canada/design-system-react';
import { mapFieldToDesignSystemImage } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, getTitleComponent, styledCompiler } from '../../utils/markdown';
import CTA from '../CTA';
import Category from './Category';

const FAQ = ({ fields, rendering, setRef }) => {
  const { t } = useTranslation();

  if (!fields) {
    return null;
  }

  const { items = [], collapseText, expandText } = fields;

  const headings = items.map(item => {
    const title = item.fields?.categoryTitle.value;
    const TitleComponent = getTitleComponent(title, H3);
    return {
      key: item.fields?.categoryAnchor.value,
      title: <TitleComponent pl={['m', 'zero']}>{styledCompiler(stripMarkdownHeading(title))}</TitleComponent>,
      collapseText: collapseText?.value,
      expandText: expandText?.value,
    };
  });

  const strings = {
    playVideoAria: `${t('Shared.Common.playVideoAria')}`,
  };

  const categories = items.map(category => {
    const questions = category.fields?.items || [];

    return questions.map(question => {
      const SubItemTitle = () => (
        <Copy size="accordionLarge" fontWeight="bold" pl={['m', 'default']}>
          {styledCompiler(stripMarkdownHeading(question.fields?.questionText?.value))}
        </Copy>
      );
      const SubItemContent = () => {
        const video = question.fields?.video || { value: '' };
        const { optionalVideo } = useOptionalVideo({
          src: video.value.href,
          ariaLabel: strings.playVideoAria,
          ...video.value,
        });
        const hasMedia = question.fields?.thumbnailImage?.value.src;
        const image = mapFieldToDesignSystemImage(question.fields.thumbnailImage, true);

        const answerCta = question.fields?.ctaLink?.value?.href ? (
          <Box px={['m', 'default']} pt="default">
            <CTA
              aria-label={t(question.fields?.ctaLink?.value?.text)}
              linkField={question.fields?.ctaLink}
              typeField={question.fields?.ctaType}
              iconField={question.fields?.ctaIcon}
            />
          </Box>
        ) : null;

        if (hasMedia) {
          return (
            <Row>
              <Column width={[1, 1 / 3]} pl={['m', 'default']} pr={['m', 'default']}>
                <Box height="auto" objectFit="cover" mb={['s', 'zero']}>
                  <MediaItem video={optionalVideo} image={image} />
                </Box>
              </Column>
              <Column width={[1, 2 / 3]} pl={['m', 'zero']} pr={['m', 'zero']}>
                <Markdown size="regular">{question.fields.answerText?.value}</Markdown>
              </Column>
              {answerCta}
            </Row>
          );
        }
        return (
          <>
            <Markdown size="regular" px={['m', 'default']}>
              {question.fields.answerText?.value}
            </Markdown>
            {answerCta}
          </>
        );
      };

      return {
        key: question.id,
        id: question.fields.questionAnchor.value,
        title: <SubItemTitle />,
        content: <SubItemContent />,
      };
    });
  });

  return (
    <Wrapper px={0} gutters={[false, false]}>
      <Row>
        {categories.map((category, i) => (
          <Category key={i.toString()} items={category} heading={headings[i]} setRef={setRef} rendering={rendering} />
        ))}
      </Row>
    </Wrapper>
  );
};

export default FAQ;
