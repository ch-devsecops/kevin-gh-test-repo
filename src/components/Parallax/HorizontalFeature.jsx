import React, { useState } from 'react';
import { Fade, Slide, Box, H3, Copy } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { InView } from 'react-intersection-observer';
import ModalButton from './ModalButton';
import Modal from './Modal';
import { stripMarkdownHeading } from '../../utils/markdown';

const threshold = [0.33, 0.5];

const getFadeProps = (inView, intersectionRatio) => {
  if (intersectionRatio < threshold[1]) {
    return {
      initialOpacity: 1,
      direction: 'out',
    };
  }

  return {
    shouldAnimate: inView,
    initialOpacity: inView ? 0 : 1,
    direction: inView ? 'in' : 'out',
  };
};

const Feature = ({
  name,
  description,
  cta,
  ctaIcon,
  gtmTitle,
  isFirst,
  overlayCopy,
  overlayImage,
  featureCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bodyText = description && (
    <Copy fontSize={['14px', '16px']} lineHeight={['22px', '26px']} mb="m">
      {compiler(stripMarkdownHeading(description))}
    </Copy>
  );
  const button = cta && (
    <ModalButton
      icon={ctaIcon}
      data-gtm-title={gtmTitle?.value}
      onClick={() => {
        setIsModalOpen(true);
      }}
      clickHandler={setIsModalOpen}
    >
      {cta?.text}
    </ModalButton>
  );

  return (
    <InView threshold={threshold}>
      {({ inView, ref, entry }) => {
        const fadeProps = getFadeProps(inView, entry?.intersectionRatio);

        return (
          <Fade duration="0.5s" height="100vh" mb="500px" ref={ref} {...fadeProps}>
            <Box
              position="sticky"
              top="280px"
              px={['20px', 0]}
              minHeight={['auto', 'auto', '337px']}
              maxWidth="1250px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              overflow="hidden"
            >
              {isFirst && entry?.intersectionRatio === 1 ? (
                <>
                  <Slide direction="left" as={H3} mb="s">
                    {compiler(stripMarkdownHeading(name))}
                  </Slide>
                  <Slide direction="left" delay="0.25s">
                    {bodyText}
                    {button}
                  </Slide>
                </>
              ) : (
                <>
                  <H3 mb="s">{compiler(stripMarkdownHeading(name))}</H3>
                  {bodyText}
                  {button}
                </>
              )}
              {cta && (
                <Modal
                  image={overlayImage}
                  featureCategory={compiler(stripMarkdownHeading(featureCategory))}
                  title={compiler(stripMarkdownHeading(name))}
                  copy={overlayCopy}
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                />
              )}
            </Box>
          </Fade>
        );
      }}
    </InView>
  );
};

export default Feature;
