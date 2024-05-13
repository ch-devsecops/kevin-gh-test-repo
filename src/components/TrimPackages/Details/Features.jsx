import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box } from '@honda-canada/design-system-react';
import { useSitecoreLayoutService } from '../../../apiHooks';

const Features = ({ path, sitecoreContext }) => {
  const {
    response: layoutServiceRespone,
    placeholderName,
    isFetching,
    hasError,
  } = useSitecoreLayoutService(path, sitecoreContext);

  if (!layoutServiceRespone || isFetching || hasError) return null;

  return (
    <Box mb="xl">
      <Placeholder name={placeholderName} rendering={layoutServiceRespone.sitecore.route} />
    </Box>
  );
};

export default withSitecoreContext()(Features);
