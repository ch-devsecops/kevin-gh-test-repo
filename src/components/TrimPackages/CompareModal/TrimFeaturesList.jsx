import React from 'react';
import { UnorderedList, UnorderedListItem, Markdown, Box, Optional } from '@honda-canada/design-system-react';

const Features = ({ allFeatures = [], trim, introText }) => {
  const trimFeatures = allFeatures.filter(feature => feature.trimId.toString() === trim);

  return (
    <Box>
      <Optional when={introText}>
        <Markdown textAlign="left" mb="xs">
          {introText}
        </Markdown>
      </Optional>
      <UnorderedList bulletStyle="bullet">
        {trimFeatures.map(feature => (
          <UnorderedListItem key={feature.id} style={{ marginBottom: '2px' }}>
            <Markdown>{feature.title}</Markdown>
          </UnorderedListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Features;
