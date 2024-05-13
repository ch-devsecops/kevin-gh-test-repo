import PropTypes from 'prop-types';
import { ImageValuePropType, SimpleValueObjectPropType, VideoUrlPropType } from '../../utils/propTypes/fields';

const CarouselHeroPropTypes = PropTypes.shape({
  fields: PropTypes.shape({
    title: PropTypes.shape({
      anchorId: PropTypes.shape({}),
      gtmTitle: PropTypes.shape({}),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          displayName: PropTypes.string,
          fields: PropTypes.shape({
            badgeImage: SimpleValueObjectPropType,
            thumbnailImage: SimpleValueObjectPropType,
            contentPosition: SimpleValueObjectPropType,
            thumbnailTitle: SimpleValueObjectPropType,
            ctaUrl: PropTypes.shape({
              value: PropTypes.shape({
                href: PropTypes.string,
                text: PropTypes.string,
                linktype: PropTypes.string,
                title: PropTypes.string,
                querystring: PropTypes.string,
                anchor: PropTypes.string,
                id: PropTypes.string,
                class: PropTypes.string,
              }),
            }),
            videoUrl: VideoUrlPropType,
            anchorId: SimpleValueObjectPropType,
            ctaType: SimpleValueObjectPropType,
            ariaLabel: SimpleValueObjectPropType,
            gtmBodyStyle: SimpleValueObjectPropType,
            gtmInteractionType: SimpleValueObjectPropType,
            gtmModelName: SimpleValueObjectPropType,
            gtmTrimName: SimpleValueObjectPropType,
            gtmTitle: SimpleValueObjectPropType,
            seoH1: SimpleValueObjectPropType,
            title: SimpleValueObjectPropType,
            subtitle: SimpleValueObjectPropType,
            desktopImage: ImageValuePropType,
            mobileImage: ImageValuePropType,
            gtmCategory: PropTypes.shape({
              id: PropTypes.string,
              url: PropTypes.string,
              name: PropTypes.string,
              displayName: PropTypes.string,
              fields: SimpleValueObjectPropType,
            }),
          }),
          id: PropTypes.string,
          name: PropTypes.string,
          url: PropTypes.string,
        }),
      ).isRequired,
    }),
  }),
  rendering: PropTypes.shape({
    params: PropTypes.shape({}),
    uid: PropTypes.string,
    componentName: PropTypes.string,
  }),
});

export default CarouselHeroPropTypes;
