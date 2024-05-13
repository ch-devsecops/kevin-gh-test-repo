import React from 'react';
import { Box, MediaItem, Wrapper, useOptionalVideo, Media, H5 } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { mapFieldToDesignSystemImage, getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';

const gradientStyles = {
  position: 'absolute',
  left: '0px',
  width: '100%',
  height: '45%',
  opacity: '0.6',
  bottom: '0',
  top: 'auto',
  verticalAlignment: 'bottom',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 9.59%, #000000 100%)',
};

const VideoComponent = ({ fields, rendering }) => {
  if (!fields) return null;

  const { title, thumbnail, videoUrl, gtmCategory, gtmTitle } = wrapJSSFields(fields);

  const video = getVideoProps(
    videoUrl?.value?.href,
    videoUrl?.value?.title,
    'close video modal',
    videoUrl?.value?.text,
  );

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { optionalVideo } = useOptionalVideo(video);
  const image = mapFieldToDesignSystemImage(thumbnail);

  const TitleComponent = getTitleComponent(title?.value, H5);

  return (
    <Box
      maxWidth="1248px"
      margin="0 auto"
      data-gtm-title={gtmTags.title}
      data-gtm-category={gtmTags.category}
      data-gtm-component-type={gtmTags.type}
    >
      <Wrapper height="100%" position="relative">
        <Box position="relative" width="100%" height="100%" objectFit="cover">
          <Box height={['179px', '703px']}>
            <MediaItem video={optionalVideo} image={image} />
          </Box>
          <Media greaterThan="mobile">
            <Box {...gradientStyles} />
          </Media>
          {title?.value && (
            <>
              <Media greaterThan="mobile">
                {(mediaClassNames, renderChildren) => (
                  <Box className={mediaClassNames} position="absolute" bottom={0}>
                    {renderChildren ? (
                      <TitleComponent color="white" padding="m">
                        {compiler(stripMarkdownHeading(title?.value))}
                      </TitleComponent>
                    ) : null}
                  </Box>
                )}
              </Media>
              <Media at="mobile">
                <TitleComponent pt="default" pl="20px">
                  {compiler(stripMarkdownHeading(title?.value))}
                </TitleComponent>
              </Media>
            </>
          )}
        </Box>
      </Wrapper>
    </Box>
  );
};

export default VideoComponent;
