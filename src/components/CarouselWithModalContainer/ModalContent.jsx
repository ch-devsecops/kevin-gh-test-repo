import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Box, Fade, Modal, useMediaQueries } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';
import themeStyles from './ModalContent.styles';
import ModalCard from './ModalCard';
import CarouselSlider from '../CarouselSlider';
import { JSSFieldPropType } from '../../utils/propTypes';

const ModalWrapper = themeStyles.apply(Modal, 'ModalWrapper');
const CardContainer = themeStyles.apply(Box, 'CardContainer');

const ModalContent = ({ index, items, onClose }) => {
  const { isMobile, isSmallDesktop } = useMediaQueries();

  if (!items?.length) return null;

  return (
    <ModalWrapper
      isOpen={items?.[index]}
      closeModal={onClose}
      styling="fullWidth"
      allowClose
      closeBtnStyling="default"
      iconSize="default"
      backgroundColor="white"
      mx={[0, 'm']}
    >
      {() => (
        <Fade shouldAnimate initialOpacity={0}>
          <CarouselSlider
            index={index}
            arrowColor="black"
            setAbsoluteLeft={isMobile && !isSmallDesktop ? 0 : undefined}
            length={items.length}
            paginationBgColor={['white', 'inherit']}
            paginationControlWithShadow={isMobile && !isSmallDesktop}
            paginationIsSticky={isMobile && !isSmallDesktop}
            splideOptions={{
              padding: undefined,
              perPage: 1,
              perMove: 1,
              start: index,
            }}
            data-testid="carousel-page"
            width="100vw"
          >
            {() =>
              items.map(item => {
                const { fields: modalFields } = item || {};
                const { title, mediaImage, bodyText, modalTitle, modalBodyText, modalMediaImage } = modalFields;
                const mediaImg = modalMediaImage?.value ? modalMediaImage?.value : mediaImage?.value;

                return (
                  <SplideSlide key={item.id}>
                    <CardContainer>
                      <ModalCard
                        title={modalTitle?.value ? modalTitle?.value : title?.value}
                        bodyText={modalBodyText?.value ? modalBodyText?.value : bodyText?.value}
                        image={mediaImg}
                      />
                    </CardContainer>
                  </SplideSlide>
                );
              })
            }
          </CarouselSlider>
        </Fade>
      )}
    </ModalWrapper>
  );
};

ModalContent.defaultProps = {
  items: [],
};

ModalContent.propTypes = {
  index: PropTypes.number,
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      name: PropTypes.string,
      displayName: PropTypes.string,
      fields: PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        name: PropTypes.string,
        displayName: PropTypes.string,
        fields: PropTypes.shape({
          mediaImage: PropTypes.shape({
            value: oneOfType([
              PropTypes.string,
              PropTypes.shape({
                alt: PropTypes.string,
                height: PropTypes.string,
                src: PropTypes.string,
                width: PropTypes.string,
              }),
            ]),
          }),
          title: JSSFieldPropType,
          modalTitle: JSSFieldPropType,
          bodyText: JSSFieldPropType,
          modalBodyText: JSSFieldPropType,
          videoUrl: PropTypes.shape({
            src: PropTypes.string,
            ariaLabel: PropTypes.string,
            closeAriaLabel: PropTypes.string,
            onPlay: PropTypes.func,
          }),
          modalVideoUrl: PropTypes.shape({
            src: PropTypes.string,
            ariaLabel: PropTypes.string,
            closeAriaLabel: PropTypes.string,
            onPlay: PropTypes.func,
          }),
          gtmTitle: JSSFieldPropType,
          gtmCategory: JSSFieldPropType,
        }),
      }),
    }),
  ),
};

export default ModalContent;
